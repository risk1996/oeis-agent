import type { BundledLanguage } from "shiki/langs";
import type { Entry } from "../model/entry";

export interface Program {
  language: string;
  code: string[];
}

export function parseProgram(lines: string[]): Program[] {
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

export const REGISTERED_PROGRAMMING_LANGUAGES = [
  "Mathematica",
  "Python",
  "Haskell",
] as const;
export type RegisteredProgrammingLanguage =
  (typeof REGISTERED_PROGRAMMING_LANGUAGES)[number];

export function getAllEntryProgramLanguages(entry: Entry): string[] {
  return [...new Set(entry.programs.map((p) => p.language))].sort((a, b) => {
    for (const lang of REGISTERED_PROGRAMMING_LANGUAGES) {
      if (a === lang) return -1;
      if (b === lang) return 1;
    }

    return a.localeCompare(b);
  });
}

export interface ProgramDisplay {
  language: {
    name: string | null;
    highlight: BundledLanguage | "text";
  };
  code: string[][];
  icon: string;
}

export function getEntryProgramDisplay(
  entry: Entry,
  language: string | null,
): ProgramDisplay {
  const code = entry.programs
    .filter((p) => p.language === language)
    .map((p) => p.code);

  switch (language) {
    case "Mathematica":
      return {
        language: { name: language, highlight: "wolfram" },
        code,
        icon: "simple-icons:wolframmathematica",
      };
    case "Python":
      return {
        language: { name: language, highlight: "python" },
        code,
        icon: "simple-icons:python",
      };
    case "Haskell":
      return {
        language: { name: language, highlight: "haskell" },
        code,
        icon: "simple-icons:haskell",
      };
    default:
      return {
        language: { name: language, highlight: "text" },
        code,
        icon: "tabler:file",
      };
  }
}
