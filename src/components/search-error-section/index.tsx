import type { Component, JSX } from "solid-js";
import { ValiError } from "valibot";

import { t } from "../../i18n";

export interface SearchErrorProps extends JSX.HTMLAttributes<HTMLDivElement> {
  error: Error | null;
}

const SearchErrorSection: Component<SearchErrorProps> = ({
  error: err,
  ...props
}) => (
  <div {...props}>
    <p>{t.error()}:</p>
    <pre>{err?.message}</pre>
    {err instanceof ValiError ? <pre>{JSON.stringify(err.issues)}</pre> : null}
  </div>
);

export default SearchErrorSection;
