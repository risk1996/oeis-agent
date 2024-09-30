export interface Author {
  name: string;
  date: string | null;
}

export function parseAuthors(input: string): Author[] {
  const authors: Author[] = [];

  for (const str of input.split(",").map((v) => v.trim())) {
    if (str.startsWith("_") && str.endsWith("_"))
      authors.push({ name: str.slice(1, -1), date: null });
    else {
      const lastAuthor = authors.at(-1);
      if (lastAuthor) lastAuthor.date = str;
    }
  }

  return authors;
}
