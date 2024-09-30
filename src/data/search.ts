import {
  type DefinedInitialDataOptions,
  type QueryKey,
  createQuery,
} from "@tanstack/solid-query";
import { createSignal } from "solid-js";
import {
  type InferOutput,
  array,
  number,
  object,
  optional,
  parse,
  string,
} from "valibot";

const OEISEntrySchema = object({
  author: string(),
  comment: optional(array(string())),
  created: string(),
  data: string(),
  example: optional(array(string())),
  formula: optional(array(string())),
  id: optional(string()),
  keyword: string(),
  link: array(string()),
  maple: optional(array(string())),
  mathematica: optional(array(string())),
  name: string(),
  number: number(),
  offset: string(),
  program: optional(array(string())),
  reference: optional(array(string())),
  references: number(),
  revision: number(),
  time: string(),
  xref: optional(array(string())),
});
type OEISEntry = InferOutput<typeof OEISEntrySchema>;

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
