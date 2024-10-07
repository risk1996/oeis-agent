import { type BundledLanguage, createHighlighter } from "shiki";
import { type Component, type JSX, Suspense, createResource } from "solid-js";

import { getColorScheme } from "../../helpers/color-scheme";

import "./index.css";

export interface CodeblockProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
  children: string;
  language: BundledLanguage | "text";
}

const [highlighter] = createResource(() =>
  createHighlighter({
    themes: ["dark-plus", "light-plus"],
    langs: ["wolfram", "python", "haskell"],
  }),
);

const Codeblock: Component<CodeblockProps> = ({
  class: cls,
  children,
  language: lang,
  ...props
}) => (
  <Suspense>
    <div
      class={cls}
      {...props}
      innerHTML={highlighter()?.codeToHtml(children, {
        lang,
        theme: getColorScheme() === "dark" ? "dark-plus" : "light-plus",
      })}
    />
  </Suspense>
);

export default Codeblock;
