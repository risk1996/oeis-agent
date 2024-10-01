import { type Component, createSignal } from "solid-js";

import { Icon } from "@iconify-icon/solid";
import Logo from "../../assets/icon.svg";
import { getQ, setQ } from "../../data/search";
import { t } from "../../i18n";

export type HeaderProps = Record<never, never>;

const Header: Component<HeaderProps> = () => {
  const [getTempQ, setTempQ] = createSignal(getQ());

  return (
    <header>
      <nav
        class="navbar navbar-expand-lg"
        style="background-color: var(--bs-content-bg); border-bottom: var(--bs-border-width) solid var(--bs-content-border-color);"
      >
        <div class="container-lg">
          <a class="navbar-brand" href="/">
            <img src={Logo} alt="logo" width={20} height={20} />
            <span class="ms-2">{t.title()}</span>
          </a>

          <form
            class="ms-auto d-flex"
            onSubmit={(e) => {
              e.preventDefault();
              setQ(getTempQ());
            }}
          >
            <div class="input-group">
              <input
                class="form-control"
                type="search"
                placeholder={t.searchPlaceholder()}
                aria-label={t.search()}
                value={getTempQ()}
                onInput={(e) => setTempQ(e.currentTarget.value)}
              />

              <button
                class="btn btn-primary"
                type="submit"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                data-bs-title={t.search()}
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
