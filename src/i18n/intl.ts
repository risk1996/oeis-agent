import { createMemo } from "solid-js";
import { getLocale } from ".";

const intl = createMemo(() => ({
  date: Intl.DateTimeFormat(getLocale(), { dateStyle: "medium" }),
}));

export default intl;
