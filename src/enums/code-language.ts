enum CodeLanguage {
  Mathematica = "mathematica",
  Maple = "maple",
  Python = "python",
  Haskell = "haskell",
}

export function getCodeLanguageIcon(language: CodeLanguage): string | null {
  switch (language) {
    case CodeLanguage.Mathematica:
      return "simple-icons:wolframmathematica";
    case CodeLanguage.Maple:
      return "mdi:leaf-maple";
    case CodeLanguage.Python:
      return "simple-icons:python";
    case CodeLanguage.Haskell:
      return "simple-icons:haskell";
    default:
      throw null;
  }
}

export default CodeLanguage;
