import { type Component, createSignal } from "solid-js";
import SearchResult from "../components/search-result";
import SortSelect from "../components/sort-select";
import Sort from "../enums/sort";
import { t } from "../i18n";

const IndexPage: Component = () => {
  const [sort, setSort] = createSignal(Sort.Relevance);

  return (
    <>
      <div class="d-flex justify-content-between">
        <h4>{t.recentAdditions()}</h4>
        <SortSelect value={sort()} onChange={setSort} />
      </div>

      <SearchResult q="keyword:new" sort={sort()} />
    </>
  );
};

export default IndexPage;
