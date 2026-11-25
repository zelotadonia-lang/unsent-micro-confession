// unsent-micro-confession — entry for make.fun's
// "Unsent: The Micro-Confession Sprint" bounty.
//
// The entry is one two-part micro-confession: a "To:" line naming who the
// unsent message was meant for, and the unsent line itself, written exactly
// as it was typed. The confession works because the two parts need each
// other: the message only makes sense addressed to Dad, and the reason it
// stayed unsent is felt in the words rather than stated — the writer buried
// the dog on the morning Dad went into hospital and still tells him the dog
// ran away, so the lie is still being told now. One specific morning, one
// concrete animal, and the last words are the lie itself, still repeated.
// It reads as typed and never sent, not as written to be sent: a plain,
// specific admission about a dog, a hospital morning, and a story the
// writer keeps telling. This program writes that text, byte for byte, to
// entry.txt. (rev2: new concept after v1 scored 0.495 in round 2; the v1
// soup text explained its own reason, this one lets the lie carry it.)

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "To: Dad\n" +
  "I buried your dog the morning you went into hospital. I still tell you he ran away.";

const MAX_TOTAL = 260;
const MAX_MESSAGE = 200;

function main(): void {
  const lines = ENTRY.split("\n");
  if (lines.length !== 2) {
    throw new Error("entry must be exactly two lines");
  }
  const message = lines[1] as string;
  if (ENTRY.length < 1 || ENTRY.length > MAX_TOTAL) {
    throw new Error(`entry length ${ENTRY.length} outside 1-${MAX_TOTAL}`);
  }
  if (message.length < 1 || message.length > MAX_MESSAGE) {
    throw new Error(`message length ${message.length} outside 1-${MAX_MESSAGE}`);
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
}

main();
