import {
  type InferOutput,
  array,
  isoTimestamp,
  number,
  object,
  optional,
  pipe,
  string,
  transform,
} from "valibot";

import { parseAuthors } from "../helpers/author";
import { type Program, parseProgram } from "../helpers/code";

export const EntrySchema = pipe(
  object({
    author: pipe(optional(string(), ""), transform(parseAuthors)),
    comment: optional(array(string()), []),
    created: pipe(
      string(),
      isoTimestamp(),
      transform((v) => new Date(v)),
    ),
    data: pipe(
      string(),
      transform((v) => v.split(",").map(BigInt)),
    ),
    example: optional(array(string()), []),
    formula: optional(array(string()), []),
    id: optional(string(), ""),
    keyword: pipe(
      string(),
      transform((v) => v.split(",")),
    ),
    link: optional(array(string()), []),
    maple: optional(array(string()), []),
    mathematica: optional(array(string()), []),
    name: string(),
    number: pipe(
      number(),
      transform((v) => `A${v.toString().padStart(6, "0")}`),
    ),
    offset: pipe(
      string(),
      transform((v) => v.split(",").map(Number)),
    ),
    program: pipe(optional(array(string()), []), transform(parseProgram)),
    reference: optional(array(string()), []),
    references: number(),
    revision: number(),
    time: pipe(
      string(),
      isoTimestamp(),
      transform((v) => new Date(v)),
    ),
    xref: optional(array(string()), []),
  }),
  transform((entry) => ({
    authors: entry.author,
    comments: entry.comment,
    created: entry.created,
    crossReferences: entry.xref,
    examples: entry.example,
    formulas: entry.formula,
    id: entry.id,
    keywords: entry.keyword,
    links: entry.link,
    modified: entry.time,
    name: entry.name,
    number: entry.number,
    offset: entry.offset,
    programs: ([] as Program[])
      .concat(
        entry.mathematica.length > 0
          ? [{ code: entry.mathematica, language: "Mathematica" }]
          : [],
      )
      .concat(
        entry.maple.length > 0
          ? [{ code: entry.maple, language: "Maple" }]
          : [],
      )
      .concat(entry.program),
    references: entry.reference,
    referencesCount: entry.references,
    revisionsCount: entry.revision,
    sequence: entry.data,
  })),
);
export type Entry = InferOutput<typeof EntrySchema>;
