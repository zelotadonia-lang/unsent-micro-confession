// unsent-micro-confession — entry for make.fun's
// "Unsent: The Micro-Confession Sprint" bounty.
//
// The entry is one two-part micro-confession: a "To:" line naming who the
// unsent message was meant for, and the unsent line itself, written exactly
// as it was typed. The confession works because the two parts need each
// other: the message only makes sense addressed to Mum, and the reason it
// stayed unsent is felt in the words rather than stated — learning the soup
// would end the reason to come home, so the not-knowing is kept on purpose.
// It reads as typed and never sent, not as written to be sent: a small,
// specific admission about a mother's soup, where pretending not to know is
// the way the writer keeps a reason to return. This program writes that
// text, byte for byte, to entry.txt.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "To: Mum\n" +
  "I still pretend I don't know how to cook your soup. If I learn it, there's nothing left to come home for.";

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
