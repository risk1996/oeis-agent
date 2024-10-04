import { A } from "@solidjs/router";
import type { Component } from "solid-js";
import { t } from "../i18n";

const NotFoundPage: Component = () => {
  return (
    <div class="d-flex justify-content-center align-items-center specific-h-400">
      <div class="col-md-12 text-center">
        <h1>{t.notFound.code()}</h1>
        <h2>{t.notFound.title()}</h2>
        <p>{t.notFound.message()}</p>

        <A href="/" class="link-primary">
          {t.notFound.cta()}
        </A>
      </div>
    </div>
  );
};

export default NotFoundPage;
