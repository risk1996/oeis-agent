import CodeLanguage from "../../enums/code-language";
import Keyword from "../../enums/keyword";
import Sort from "../../enums/sort";

const en = {
  title: "OEIS Agent",
  creator: "William Darian",

  search: {
    label: "Search",
    placeholder: "Search OEIS",
    noQuery: "No search query",
    startMessage: "Start searching to view OEIS entries...",
    resultMessage: (q: string) => `Search result for "${q}"`,
    noResults: "No results",
    loadingData: "Loading data...",
    loadMore: "Load more",
  },

  error: "Error",

  author: {
    etAl: "et al.",
    by: "By",
  },

  dates: {
    created: "Created date",
    modified: "Modified date",
  },

  description: {
    label: "Description",
  },

  sequence: {
    label: "Sequence",
  },

  formula: {
    label: "Formula",
  },

  code: {
    label: "Code",
    [CodeLanguage.Mathematica]: "Mathematica",
    [CodeLanguage.Maple]: "Maple",
    [CodeLanguage.Python]: "Python",
    [CodeLanguage.Haskell]: "Haskell",
  },

  sort: {
    label: "Sort by",
    [Sort.Relevance]: "Relevance",
    [Sort.References]: "References",
    [Sort.Number]: "Number",
    [Sort.Modified]: "Modified date",
    [Sort.Created]: "Created date",
  },

  keyword: {
    label: "Keyword",
    [Keyword.BaseDependent]: "Sequence is dependent on base used",
    [Keyword.Brief]: "Sequence is too short to do any analysis with",
    [Keyword.Changed]:
      "A sequence that was changed in the last two or three weeks",
    [Keyword.ContinuedFraction]: "A continued fraction expansion of a number",
    [Keyword.DecimalExpansion]: "A decimal expansion of a number",
    [Keyword.Core]: "An important sequence",
    [Keyword.Dead]: "An erroneous or duplicated sequence",
    [Keyword.Unimportant]: "An unimportant sequence",
    [Keyword.Duplicate]: "Duplicate of another sequence",
    [Keyword.Easy]: "It is easy to produce terms of this sequence",
    [Keyword.EigenSequence]: "An eigensequence",
    [Keyword.Finite]: "A finite sequence",
    [Keyword.Fraction]:
      "Numerators or denominators of sequence of rational numbers",
    [Keyword.Full]: "The full sequence is given",
    [Keyword.Hard]: "Next term is not known and may be hard to find",
    [Keyword.Audible]: "A sequence worth listening to",
    [Keyword.LessInteresting]: "This is a less interesting sequence",
    [Keyword.VisualInterest]: "A sequence with an interesting graph",
    [Keyword.MoreTermsNeeded]: "More terms are needed",
    [Keyword.Multiplicative]: "Multiplicative",
    [Keyword.New]: "New",
    [Keyword.Nice]: "An exceptionally nice sequence",
    [Keyword.Nonnegative]: "A sequence of nonnegative numbers",
    [Keyword.Obscure]: "Obscure, better description needed",
    [Keyword.Probationary]: "Included on a provisional basis",
    [Keyword.Signed]: "Sequence contains negative numbers",
    [Keyword.IrregularTriangle]:
      "An irregular or funny-shaped triangle of numbers",
    [Keyword.RegularTriangle]: "A regular triangle of numbers",
    [Keyword.Unedited]: "Not edited",
    [Keyword.Unknown]: "Little is known; an unsolved problem",
    [Keyword.WalkCounting]: "Counts walks (or self-avoiding paths)",
    [Keyword.WordBased]: "Depends on words for the sequence in some language",
    unregistered: "Unregistered keyword",
  },

  footer: {
    madeBy: "Made with ❤️ by",
  },

  home: {
    title: "Recent additions to OEIS",
  },

  notFound: {
    code: "404",
    title: "Page Not Found",
    message: "Sorry, the page you are looking for does not exist.",
    cta: "Go back to the homepage",
  },
};

export default en;
