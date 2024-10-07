import { A, type AnchorProps } from "@solidjs/router";
import type { Component } from "solid-js";
import type { LiteralUnion } from "type-fest";

import { useDirective } from "../../directives";
import { tooltip } from "../../directives/popper";
import Keyword from "../../enums/keyword";
import { isEnumMember } from "../../helpers/enum";
import { t } from "../../i18n";

useDirective(tooltip);

export interface KeywordBadgeProps extends Omit<AnchorProps, "href"> {
  value: LiteralUnion<Keyword, string>;
}

const KeywordBadge: Component<KeywordBadgeProps> = ({ value, ...props }) => (
  <A href={`/search?q=keyword:${value}`} {...props}>
    <span
      class="badge rounded-pill text-bg-light text-uppercase font-monospace"
      use:tooltip={{
        title: isEnumMember(Keyword, value)
          ? t.keyword[value]()
          : t.keyword.unregistered(),
        placement: "top",
      }}
    >
      <small>{value}</small>
    </span>
  </A>
);

export default KeywordBadge;
