export interface Author {
  name: string;
  hasLink: boolean;
  date: string | null;
}

export function parseAuthors(input: string): Author[] {
  const authors: Author[] = [];

  for (const str of input.split(",").map((v) => v.trim())) {
    if (
      str
        .slice(-4)
        .split("")
        .every((v) => v >= "0" && v <= "9")
    ) {
      const lastAuthor = authors.at(-1);
      if (lastAuthor) lastAuthor.date = str;
    } else {
      const hasLink = str.startsWith("_") && str.endsWith("_");
      const name = hasLink ? str.slice(1, -1) : str;
      authors.push({ name, hasLink, date: null });
    }
  }

  return authors;
}
