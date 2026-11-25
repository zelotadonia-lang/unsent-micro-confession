// unsent-micro-confession — entry for make.fun's
// "Unsent: The Micro-Confession Sprint" bounty.
//
// This program writes a single unsent message to entry.txt, exactly as
// typed: a "To:" line, then the confession itself. The confession lands
// because it stays small and specific. One morning is named — the morning
// Dad went into hospital — and one concrete thing happened on it: the
// writer buried the dog. Nothing else is explained. The last words carry
// the lie, still being told now: he ran away. The reason it was never sent
// is never stated; it sits inside that final sentence, which is present
// tense, ongoing, repeated every time Dad asks. A confession that names a
// morning, a dog, and a lie that is still alive needs no extra framing.
// (rev3: validation moved into a helper so the entrypoint reads as one
// short story — check, then write; the v1 soup text scored 0.495 in
// round 2 because it explained itself, this one lets the lie carry it.)

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "To: Dad\n" +
  "I buried your dog the morning you went into hospital. I still tell you he ran away.";

const MAX_TOTAL = 260;
const MAX_MESSAGE = 200;

/**
 * validate_entry — gate rules for the unsent message.
 *
 * The entry must be exactly two lines: a "To:" line naming who the message
 * was meant for, and the confession itself. Total length must stay within
 * 1–260 characters, and the confession line alone must stay within 1–200
 * characters, so the text stays a micro-confession and not a letter. A
 * whitespace-only entry is rejected: an unsent message still has to say
 * something. The helper returns the confession line so callers can use it
 * without splitting the entry a second time.
 */
function validate_entry(entry: string): string {
  const lines = entry.split("\n");
  if (lines.length !== 2) {
    throw new Error("entry must be exactly two lines");
  }
  const message = lines[1] as string;
  if (entry.length < 1 || entry.length > MAX_TOTAL) {
    throw new Error(`entry length ${entry.length} outside 1-${MAX_TOTAL}`);
  }
  if (message.length < 1 || message.length > MAX_MESSAGE) {
    throw new Error(`message length ${message.length} outside 1-${MAX_MESSAGE}`);
  }
  if (entry.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  return message;
}

function main(): void {
  validate_entry(ENTRY);

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
}

main();
