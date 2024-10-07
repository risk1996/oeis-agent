import clsx from "clsx";
import { type Component, For, Match, Show, Switch } from "solid-js";

import { Icon } from "@iconify-icon/solid";
import { createSearchQuery } from "../../data/search";
import type Sort from "../../enums/sort";
import { t } from "../../i18n";
import EntryCard from "../entry-card";
import LoadingSection from "../loading-section";
import SearchErrorSection from "../search-error-section";

export interface SearchResultProps {
  q: string;
  sort: Sort | null;
}

const SearchResult: Component<SearchResultProps> = (props) => {
  const searchQuery = createSearchQuery(() => props, {});

  return (
    <Switch>
      <Match when={searchQuery.isPending}>
        <LoadingSection class="py-4" />
      </Match>

      <Match when={searchQuery.isError}>
        <SearchErrorSection error={searchQuery.error} />
      </Match>

      <Match when={searchQuery.isSuccess}>
        <div class="row">
          <For
            each={searchQuery.data}
            fallback={
              <div class="d-flex flex-column align-items-center py-4">
                <Icon icon="tabler:circle-off" width="6rem" />
                <p class="fs-5">{t.search.noResults()}</p>
              </div>
            }
          >
            {(entry) => (
              <div class="col-12 col-md-6 p-2 d-flex align-items-stretch">
                <EntryCard class="w-100" data={entry} />
              </div>
            )}
          </For>

          <Show when={searchQuery.hasNextPage}>
            <div class="d-flex justify-content-center my-4">
              <button
                type="button"
                class={clsx("btn btn-primary d-block", {
                  disabled: searchQuery.isFetching,
                })}
                onClick={() => searchQuery.fetchNextPage()}
                disabled={searchQuery.isFetching}
              >
                <Show when={searchQuery.isFetching}>
                  <span
                    class="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  />
                </Show>
                {t.search.loadMore()}
              </button>
            </div>
          </Show>
        </div>
      </Match>
    </Switch>
  );
};

export default SearchResult;
