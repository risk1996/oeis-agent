import { type Component, For, Match, Show, Switch } from "solid-js";
import { ValiError } from "valibot";

import clsx from "clsx";
import { createSearchQuery } from "../../data/search";
import { t } from "../../i18n";
import EntryCard from "../entry-card";

export interface SearchResultProps {
  q: string;
}

const SearchResult: Component<SearchResultProps> = (props) => {
  const searchQuery = createSearchQuery(() => ({ q: props.q, sort: null }), {});

  return (
    <Switch>
      <Match when={searchQuery.isPending}>
        <div class="text-center mt-2">
          <div
            class="spinner-border text-primary mt-3 mb-2"
            role="status"
            aria-hidden="true"
          />
          <p>{t.loadingData()}</p>
        </div>
      </Match>

      <Match when={searchQuery.isError}>
        <p>{t.error()}:</p>
        <pre>{searchQuery.error?.message}</pre>
        {searchQuery.error instanceof ValiError ? (
          <pre>{JSON.stringify(searchQuery.error.issues)}</pre>
        ) : null}
      </Match>

      <Match when={searchQuery.isSuccess}>
        <div class="row">
          <For each={searchQuery.data} fallback={t.noResults()}>
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
                {t.loadMore()}
              </button>
            </div>
          </Show>
        </div>
      </Match>
    </Switch>
  );
};

export default SearchResult;
