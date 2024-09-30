import {
  type DefinedInitialDataOptions,
  type QueryKey,
  createQuery,
} from "@tanstack/solid-query";
import { createSignal } from "solid-js";
import {
  type InferOutput,
  array,
  isoTimestamp,
  number,
  object,
  optional,
  parse,
  pipe,
  string,
  transform,
} from "valibot";
import { parseAuthors } from "../helpers/author";

const OEISEntrySchema = object({
  author: pipe(string(), transform(parseAuthors)),
  comment: optional(array(string()), []),
  created: pipe(
    string(),
    isoTimestamp(),
    transform((v) => new Date(v)),
  ),
  data: pipe(
    string(),
    transform((v) => v.split(",").map(Number)),
  ),
  example: optional(array(string()), []),
  formula: optional(array(string()), []),
  id: optional(string(), ""),
  keyword: pipe(
    string(),
    transform((v) => v.split(",")),
  ),
  link: array(string()),
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
  program: optional(array(string()), []),
  reference: optional(array(string()), []),
  references: number(),
  revision: number(),
  time: pipe(
    string(),
    isoTimestamp(),
    transform((v) => new Date(v)),
  ),
  xref: optional(array(string()), []),
});
export type OEISEntry = InferOutput<typeof OEISEntrySchema>;

export async function searchOEIS(q: string): Promise<OEISEntry[]> {
  const params = new URLSearchParams({ q, fmt: "json" });
  const response = await fetch(`https://oeis.org/search?${params}`);
  const data = await response.json();

  return parse(array(OEISEntrySchema), data);
}

export const [getQ, setQ] = createSignal("id:A001011");

export function getSearchOEISQueryKey(q: string): QueryKey {
  return ["oeis", "search", q];
}

export function createSearchOEISQuery(
  getQ: () => string,
  options: Omit<
    DefinedInitialDataOptions<OEISEntry[], Error, OEISEntry[], QueryKey>,
    "queryKey" | "queryFn"
  >,
) {
  return createQuery<OEISEntry[], Error, OEISEntry[], QueryKey>(() => ({
    queryKey: getSearchOEISQueryKey(getQ()),
    queryFn: async () => await searchOEIS(getQ()),
    ...options,
    enabled: getQ() !== "",
  }));
}
