import clsx from "clsx";
import hljs from "highlight.js/lib/core";
import hljsHaskell from "highlight.js/lib/languages/haskell";
import hljsMathematica from "highlight.js/lib/languages/mathematica";
import hljsPython from "highlight.js/lib/languages/python";
import { type Component, type JSX, Show } from "solid-js";

import "highlightjs-line-numbers.js";

import "./index.css";

export interface CodeblockProps extends JSX.HTMLAttributes<HTMLPreElement> {
  class?: string;
  children: string;
  highlightClass: string | null;
}

hljs.configure({ ignoreUnescapedHTML: true });
hljs.registerLanguage("mathematica", hljsMathematica);
hljs.registerLanguage("python", hljsPython);
hljs.registerLanguage("haskell", hljsHaskell);

const Codeblock: Component<CodeblockProps> = ({
  class: cls,
  children,
  highlightClass,
  ...props
}) => (
  <Show when={children} keyed>
    <pre
      class={clsx("hljs p-2 m-0", cls)}
      {...props}
      ref={(ref) => {
        if (highlightClass)
          requestAnimationFrame(() => hljs.highlightBlock(ref));
      }}
    >
      <code class={highlightClass ?? undefined}>{children}</code>
    </pre>
  </Show>
);

export default Codeblock;
