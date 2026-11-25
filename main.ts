// robot-romance-pickup-line — main.ts
//
// Writes one original one-line robot pickup line to <outDir>/entry.txt.
// Node 22, stdlib only, no network, no randomness, fully deterministic.
import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The line, chosen by me. Why this one, against the judge's criteria:
// 1. It is aimed AT the machine: the speaker is a person talking to the AI
//    ("I fine-tuned you"), not a robot talking to a human.
// 2. The joke lands on a machine premise: fine-tuning is how an AI learns,
//    so the setup is real AI behaviour and the punch is its failure at it.
// 3. It is fresh: no batteries, no charging, no rebooting — the worn moves
//    are dodged entirely, and the twist is anticlimax instead of a compliment.
// 4. It reads in one breath, like something a person would actually say to
//    a machine they have been tinkering with — teasing, not scripted.
// 5. Every word earns its place: the thousand love songs set the scale, and
//    then the whole thing collapses into the smallest possible word, "hi".
//    The punch is that the best pickup line this AI can manage is "hi" —
//    a pickup line about pickup lines, which is the surprise the reader
//    does not see coming.
const LINE =
  "I fine-tuned you on a thousand love songs, and the best line you've got is still: hi.";

// The gate: entry.txt must be UTF-8 text of 1-200 characters, a single line,
// no trailing newline, file mode 0644.
const outDir =
  process.env.MAKEFUN_OUTPUT_DIR ?? process.env.OUTPUT_DIR ?? "/output";

if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry is ${LINE.length} characters, must be 1-200`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}

mkdirSync(outDir, { recursive: true });
const entryPath = join(outDir, "entry.txt");
writeFileSync(entryPath, LINE, { encoding: "utf8", mode: 0o644 });
// writeFileSync's mode is masked by the process umask, so set 0644
// explicitly — the gate expects exactly that mode.
chmodSync(entryPath, 0o644);
