import type { Component, JSX } from "solid-js";
import type { LiteralUnion } from "type-fest";

import Keyword from "../../enums/keyword";
import { isEnumMember } from "../../helpers/enum";
import { tooltip } from "../../helpers/popper";
import { t } from "../../i18n";

export interface KeywordBadgeProps extends JSX.HTMLAttributes<HTMLSpanElement> {
  value: LiteralUnion<Keyword, string>;
}

const KeywordBadge: Component<KeywordBadgeProps> = ({ value, ...props }) => (
  <span
    class="badge rounded-pill text-bg-light text-uppercase font-monospace"
    {...tooltip({
      title: isEnumMember(Keyword, value)
        ? t.keyword[value]()
        : t.keyword.unregistered(),
    })}
    {...props}
  >
    <small>{value}</small>
  </span>
);

export default KeywordBadge;
