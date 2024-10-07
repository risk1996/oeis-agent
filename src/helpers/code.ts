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
  language: string | null;
  code: string[][];
  icon: string;
  highlightClass: string | null;
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
        language,
        code,
        icon: "simple-icons:wolframmathematica",
        highlightClass: "language-mathematica",
      };
    case "Python":
      return {
        language,
        code,
        icon: "simple-icons:python",
        highlightClass: "language-python",
      };
    case "Haskell":
      return {
        language,
        code,
        icon: "simple-icons:haskell",
        highlightClass: "language-haskell",
      };
    default:
      return {
        language,
        code,
        icon: "tabler:file",
        highlightClass: null,
      };
  }
}
