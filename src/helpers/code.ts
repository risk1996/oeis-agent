import type { LiteralUnion } from "type-fest";

import CodeLanguage from "../enums/code-language";
import type { Entry } from "../model/entry";
import { allEnumMembers } from "./enum";

export interface Program {
  language: string;
  code: string[];
}

export function parseProgram(lines: string[]): Program[] {
  console.log(lines);
  if (lines.length === 0) return [];

  const programs: Program[] = [];

  for (const line of lines) {
    if (line.startsWith("(")) {
      const [lang, ...rest] = line.split(" ");
      if (!lang) continue;
      const language = lang.replace("(", "").replace(")", "");
      const firstLine = rest.join(" ").trim();

      programs.push({
        language,
        code:
          typeof firstLine === "string" && firstLine !== "" ? [firstLine] : [],
      });
    } else {
      const lastProgram = programs[programs.length - 1];
      if (!lastProgram) continue;
      lastProgram.code.push(line);
    }
  }

  return programs;
}

export function getEntryCode(
  entry: Entry,
  language: LiteralUnion<CodeLanguage, string>,
): string[][] {
  switch (language) {
    case CodeLanguage.Mathematica:
      return entry.mathematica.map((row) => [row]);
    case CodeLanguage.Python:
      return entry.program
        .filter((p) => p.language === "Python")
        .map((p) => p.code);
    case CodeLanguage.Haskell:
      return entry.program
        .filter((p) => p.language === "Haskell")
        .map((p) => p.code);
    default:
      return entry.program
        .filter((p) => p.language === language)
        .map((p) => p.code);
  }
}

export function isEntryCodeExists(
  entry: Entry,
  language: CodeLanguage,
): boolean {
  return getEntryCode(entry, language).length > 0;
}

export function isEntryHasCode(entry: Entry): boolean {
  return allEnumMembers(CodeLanguage).some((l) => isEntryCodeExists(entry, l));
}
