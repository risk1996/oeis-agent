import type { Component } from "solid-js";

import styles from "./App.module.css";
import Header from "./components/header";
import Logo from "./logo.svg";

import "halfmoon/css/halfmoon.min.css";
import "solid-devtools";

const App: Component = () => {
  return (
    // <div class={styles.App}>
    <>
      <Header />
      <header class={styles.header}>
        <img src={Logo} class={styles.logo} alt="logo" />
        {/* <Logo class={styles.logo} /> */}
        <p>
          Edit <code>src/App.jsx</code> and save to reload.
        </p>
        <a
          class="text-4xl text-blue-600"
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Solid, Tailwind CSS and Flowbite
        </a>
      </header>
    </>
    // </div>
  );
};

export default App;
