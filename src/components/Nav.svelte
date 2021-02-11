<script>
  import { modal } from '../stores/modal.js'
</script>

<nav class="nav">
  <ul class="menu">
    <li class="menu_item">
      <a
        class="menu_link"
        on:click|preventDefault={() => ($modal.settings = true)}
        href="/">settings</a
      >
    </li>
    <li class="menu_item">
      <a
        class="menu_link"
        on:click|preventDefault={() => ($modal.history = true)}
        href="/">history</a
      >
    </li>
    <li class="menu_item">
      <a
        class="menu_link"
        on:click|preventDefault={() => ($modal.about = true)}
        href="/">about</a
      >
    </li>
  </ul>
</nav>

<style>
  .nav {
    width: 100%;
    height: 50px;
    font-size: 1.1em;
  }

  .menu {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    list-style: none;
    display: flex;
    justify-content: center;
  }

  .menu_item {
    margin: 20px;
  }

  .menu_link {
    color: var(--color-primary-7);
    opacity: 0.9;
  }

  .menu_link:hover,
  .menu_link:focus {
    text-decoration: underline;
    opacity: 1;
  }
</style>
