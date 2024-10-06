import { Icon } from "@iconify-icon/solid";
import { type Component, createSignal } from "solid-js";

import { useNavigate, useSearchParams } from "@solidjs/router";
import Logo from "../../assets/logo.svg";
import { tooltip } from "../../helpers/popper";
import { t } from "../../i18n";
import type { SearchPageParams } from "../../pages/search";

export type HeaderProps = Record<never, never>;

const Header: Component<HeaderProps> = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams<SearchPageParams>();
  const [getQ, setQ] = createSignal(searchParams.q ?? "");

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
          <a class="navbar-brand" href="/">
            <img src={Logo} alt="logo" width={20} height={20} />
            <span class="ms-2">{t.title()}</span>
          </a>

          <form class="ms-auto d-flex" onSubmit={handleSearch}>
            <div class="input-group">
              <input
                class="form-control"
                type="search"
                placeholder={t.searchPlaceholder()}
                aria-label={t.search()}
                value={getQ()}
                onInput={(e) => setQ(e.currentTarget.value)}
              />

              <button
                class="btn btn-primary"
                type="submit"
                {...tooltip({ title: t.search(), placement: "bottom" })}
              >
                <Icon icon="tabler:search" class="align-middle" width="1rem" />
              </button>
            </div>
          </form>
        </div>
      </nav>
    </header>
  );
};

export default Header;
