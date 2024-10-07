import { Icon } from "@iconify-icon/solid";
import { writeClipboard } from "@solid-primitives/clipboard";
import { createTimer } from "@solid-primitives/timer";
import clsx from "clsx";
import {
  type Component,
  type JSX,
  Show,
  createEffect,
  createSignal,
} from "solid-js";

import { tooltip } from "../../helpers/popper";
import { t } from "../../i18n";

export interface CopyIconButtonProps
  extends Omit<JSX.HTMLAttributes<HTMLButtonElement>, "onClick" | "type"> {
  class?: string;
  content: string | ClipboardItem[];
  withText?: boolean;
}

const CopyIconButton: Component<CopyIconButtonProps> = ({
  class: cls,
  content,
  withText,
  ...props
}) => {
  const [getIsCopied, setIsCopied] = createSignal(false);
  createEffect(() => {
    if (getIsCopied()) createTimer(() => setIsCopied(false), 1_000, setTimeout);
  });

  function handleCopy() {
    writeClipboard(content);
    setIsCopied(true);
  }

  return (
    <button
      type="button"
      class={clsx("btn", getIsCopied() ? "btn-success" : "btn-dark", cls)}
      {...tooltip({ title: t.actions.copy(), placement: "left" })}
      aria-label={t.actions.copy()}
      onClick={handleCopy}
      {...props}
    >
      <Icon
        icon={getIsCopied() ? "tabler:check" : "tabler:copy"}
        class="align-middle"
      />

      <Show when={withText}>
        <span class="ms-2">{t.actions.copy()}</span>
      </Show>
    </button>
  );
};

export default CopyIconButton;
