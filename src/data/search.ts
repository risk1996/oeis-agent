import {
  type DefinedInitialDataOptions,
  type QueryKey,
  createQuery,
} from "@tanstack/solid-query";
import { array, parse } from "valibot";

import { type Entry, EntrySchema } from "../model/entry";

// TODO: Pagination
export async function searchOEIS(q: string): Promise<Entry[]> {
  const params = new URLSearchParams({ q, fmt: "json" });
  const response = await fetch(`https://oeis.org/search?${params}`);
  const data = await response.json();

  return parse(array(EntrySchema), data);
}

export function getSearchOEISQueryKey(q: string): QueryKey {
  return ["oeis", "search", q];
}

export function createSearchOEISQuery(
  getQ: () => string,
  options: Omit<
    DefinedInitialDataOptions<Entry[], Error, Entry[], QueryKey>,
    "queryKey" | "queryFn"
  >,
) {
  return createQuery<Entry[], Error, Entry[], QueryKey>(() => ({
    queryKey: getSearchOEISQueryKey(getQ()),
    queryFn: async () => await searchOEIS(getQ()),
    ...options,
    enabled: getQ() !== "",
  }));
}
