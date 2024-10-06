import type { Component, JSX } from "solid-js";

import type Keyword from "../../enums/keyword";
import { tooltip } from "../../helpers/popper";
import { t } from "../../i18n";

export interface KeywordBadgeProps extends JSX.HTMLAttributes<HTMLSpanElement> {
  value: Keyword;
}

const KeywordBadge: Component<KeywordBadgeProps> = ({ value, ...props }) => (
  <span
    class="badge rounded-pill text-bg-light text-uppercase font-monospace"
    {...tooltip({ title: t.keyword[value]() })}
    {...props}
  >
    <small>{value}</small>
  </span>
);

export default KeywordBadge;
