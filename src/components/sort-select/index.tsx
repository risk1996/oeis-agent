import clsx from "clsx";
import { type Component, For, type JSX } from "solid-js";

import Sort from "../../enums/sort";
import { allEnumMembers, isEnumMember } from "../../helpers/enum";
import { t } from "../../i18n";

export interface SortSelectProps
  extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "onChange"> {
  class?: string;
  value: Sort;
  onChange: (value: Sort) => void;
}

const SortSelect: Component<SortSelectProps> = ({
  class: cls,
  value,
  onChange,
  ...props
}) => (
  <div class={clsx("d-flex align-items-baseline", cls)} {...props}>
    <label for="sort-select" class="form-label flex-shrink-0 me-2">
      {t.sort.label()}
    </label>

    <select
      class="form-select"
      id="sort-select"
      onInput={(e) => {
        if (isEnumMember(Sort, e.target.value)) onChange(e.target.value);
      }}
    >
      <For each={allEnumMembers(Sort)}>
        {(sort) => (
          <option value={sort} selected={value === sort}>
            {t.sort[sort]()}
          </option>
        )}
      </For>
    </select>
  </div>
);

export default SortSelect;
