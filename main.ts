// The Comment Above the Code
// make.fun competition: u-mfnakmal-the-comment-above-the-code-35e38026
//
// One line, at most 200 characters: a funny, painfully honest comment a
// developer might leave above fragile production code. The program writes
// that line to /output/entry.txt, where the sealed scorer gates it (UTF-8,
// 1..200 chars, not whitespace) and a house judge compares it pairwise
// against other comments on the brief: on subject, honesty that stings,
// economical with a punchline at the end, fresh angle, reads like a real
// comment left in a codebase.
//
// The joke, in a working developer's voice: the line above a load-bearing
// piece of legacy code warns that removing it breaks payroll on the 31st —
// a specific, recognisable failure — and confesses the author already
// tested removing it once and refuses to ever test it again. The fear is
// the punchline: the code is not understood, only feared.
// Pass 2: cut the closing vow to two words — "Never again." lands harder
// than repeating "test", and the shorter line is more economical: every
// word earns its place, the turn lands on the last two words.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "// DO NOT DELETE: removing this line breaks payroll on the 31st. I tested it once. Never again.";

const MAX_CHARS = 200;

// Gate check, mirroring the sealed scorer: 1..200 characters, not only
// whitespace, a single line. Code-point count: the entry is plain ASCII,
// so code points and bytes agree.
const chars = [...ENTRY];
if (chars.length < 1 || chars.length > MAX_CHARS) {
  throw new Error(`entry is ${chars.length} chars, must be 1..${MAX_CHARS}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry is only whitespace");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Read-back check: the file on disk must be byte-identical to ENTRY, so
// two runs of this program always produce the same output.
const written = readFileSync(outPath, "utf8");
if (written !== ENTRY) {
  throw new Error("entry.txt on disk differs from ENTRY");
}
console.log(`wrote ${chars.length} chars to ${outPath}`);
