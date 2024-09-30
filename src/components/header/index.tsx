import { type Component, createSignal } from "solid-js";

import Icon from "../../assets/icon.svg";
import { getQ, setQ } from "../../data/search";

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
            <img src={Icon} alt="logo" width={20} height={20} />
            <span class="ms-2">OEIS Agent</span>
          </a>

          <form
            class="ms-auto d-flex"
            onSubmit={(e) => {
              e.preventDefault();
              setQ(getTempQ());
            }}
          >
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search OEIS"
              aria-label="Search"
              value={getTempQ()}
              onInput={(e) => setTempQ(e.currentTarget.value)}
            />

            <button class="btn btn-primary" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
    </header>
  );
};

export default Header;
