import clsx from "clsx";
import hljs from "highlight.js/lib/core";
import hljsHaskell from "highlight.js/lib/languages/haskell";
import hljsMathematica from "highlight.js/lib/languages/mathematica";
import hljsPython from "highlight.js/lib/languages/python";
import { type Component, type JSX, Show, createEffect } from "solid-js";
import type { LiteralUnion } from "type-fest";

import CodeLanguage from "../../enums/code-language";
import { isEnumMember } from "../../helpers/enum";

import "./index.css";

export interface CodeblockProps extends JSX.HTMLAttributes<HTMLPreElement> {
  class?: string;
  children: string;
  language: LiteralUnion<CodeLanguage, string>;
}

hljs.registerLanguage(CodeLanguage.Mathematica, hljsMathematica);
// TODO: Add Maple language support once it's available in highlight.js
hljs.registerLanguage(CodeLanguage.Python, hljsPython);
hljs.registerLanguage(CodeLanguage.Haskell, hljsHaskell);

const Codeblock: Component<CodeblockProps> = ({
  class: cls,
  children,
  language,
  ...props
}) => {
  let el!: HTMLElement;

  createEffect(() => {
    if (!isEnumMember(CodeLanguage, language)) return;
    if (el instanceof HTMLElement) hljs.highlightBlock(el);
  });

  return (
    <Show when={language} keyed={true}>
      <pre
        class={clsx("p-2", cls)}
        {...props}
        ref={(ref) => {
          el = ref;
        }}
      >
        <code
          class={clsx({
            "language-mathematica": language === CodeLanguage.Mathematica,
            "language-maple": language === CodeLanguage.Maple,
            "language-python": language === CodeLanguage.Python,
          })}
        >
          {children}
        </code>
      </pre>
    </Show>
  );
};

export default Codeblock;
