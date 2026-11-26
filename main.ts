// Two Days of Excuses — R1 entry program.
// Reads entry.txt, validates it against the competition gate
// (UTF-8 text, 1 to 200 characters, not only whitespace, single line),
// and writes it to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Node standard library only.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const raw = readFileSync(join(here, "entry.txt"), "utf8");
const line = raw.replace(/\r\n?/g, "\n").replace(/\n$/, "");

if (line.length < 1 || line.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${line.length}`);
}
if (!line.trim()) {
  throw new Error("entry must not be only whitespace");
}
if (line.includes("\n")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}
mkdirSync(outDir, { recursive: true });
const outText = line + "\n";
writeFileSync(join(outDir, "entry.txt"), outText, "utf8");
console.log(`Entry delivered: ${line.length} characters, one line, no excuses left over.`);
