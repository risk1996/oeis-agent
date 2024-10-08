import { Icon } from "@iconify-icon/solid";
import { type Component, createEffect, createSignal } from "solid-js";

import { A, useNavigate, useSearchParams } from "@solidjs/router";
import Logo from "../../assets/logo.svg";
import { useDirective } from "../../directives";
import { tooltip } from "../../directives/popper";
import { t } from "../../i18n";
import type { SearchPageParams } from "../../pages/search";
import ColorSchemeToggle from "../color-scheme-toggle";

useDirective(tooltip);

export type HeaderProps = Record<never, never>;

const Header: Component<HeaderProps> = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams<SearchPageParams>();
  const [getQ, setQ] = createSignal(searchParams.q ?? "");

  createEffect(() => {
    setQ(searchParams.q ?? "");
  });

  const handleSearch = (e: SubmitEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({ q: getQ() });
    navigate(`/search?${params}`);
  };

  return (
    <header class="position-sticky top-0 z-1">
      <nav
        class="navbar navbar-expand-lg"
        style="background-color: var(--bs-content-bg); border-bottom: var(--bs-border-width) solid var(--bs-content-border-color);"
      >
        <div class="container-lg">
          <A href="/" class="navbar-brand">
            <img src={Logo} alt="logo" width={20} height={20} />
            <span class="ms-2">{t.title()}</span>
          </A>

          <div class="ms-auto d-flex">
            <ColorSchemeToggle class="me-1" />

            <form class="d-flex" onSubmit={handleSearch}>
              <div class="input-group">
                <input
                  class="form-control"
                  type="search"
                  placeholder={t.search.placeholder()}
                  aria-label={t.search.label()}
                  value={getQ()}
                  onInput={(e) => setQ(e.currentTarget.value)}
                />

                <button
                  type="submit"
                  class="btn btn-primary"
                  aria-label={t.search.label()}
                  use:tooltip={{ title: t.search.label(), placement: "bottom" }}
                >
                  <Icon
                    icon="tabler:search"
                    class="align-middle"
                    width="1rem"
                  />
                </button>
              </div>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
