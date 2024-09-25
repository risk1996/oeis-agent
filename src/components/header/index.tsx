import type { Component } from "solid-js";

import Icon from "../../assets/icon.svg";

export type HeaderProps = Record<never, never>;

const Header: Component<HeaderProps> = () => {
  return (
    <nav
      class="navbar navbar-expand-lg"
      style="background-color: var(--bs-content-bg); border-bottom: var(--bs-border-width) solid var(--bs-content-border-color);"
    >
      <div class="container-fluid">
        <a class="navbar-brand" href="/">
          <img src={Icon} alt="logo" />
          OEIS Agent
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar-collapse-7"
          aria-controls="navbar-collapse-7"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" />
        </button>
        <div class="collapse navbar-collapse" id="navbar-collapse-7">
          <form class="ms-auto d-flex">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search docs"
              aria-label="Search"
            />
            <button class="btn btn-primary" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Header;
