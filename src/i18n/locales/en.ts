import Sort from "../../enums/sort";

const en = {
  title: "OEIS Agent",

  search: "Search",
  searchPlaceholder: "Search OEIS",
  noSearchQuery: "No search query",
  startSearching: "Start searching to view OEIS entries...",
  searchResultFor: (q: string) => `Search result for "${q}"`,
  recentAdditions: "Recent additions to OEIS",
  loadingData: "Loading data...",
  noResults: "No results",
  loadMore: "Load more",
  error: "Error",
  etAl: "et al.",

  createdDate: "Created date",
  modifiedDate: "Modified date",

  sort: {
    label: "Sort by",
    [Sort.Relevance]: "Relevance",
    [Sort.References]: "References",
    [Sort.Number]: "Number",
    [Sort.Modified]: "Modified date",
    [Sort.Created]: "Created date",
  },

  notFound: {
    code: "404",
    title: "Page Not Found",
    message: "Sorry, the page you are looking for does not exist.",
    cta: "Go back to the homepage",
  },
};

export default en;
