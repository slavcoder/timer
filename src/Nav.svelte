<nav class="nav">
  <ul class="menu">
    <li class="menu_item"><a class="menu_link menu_logo" href="/">timer</a></li>
    <li class="menu_item"><a class="menu_link" href="/">settings</a></li>
    <li class="menu_item"><a class="menu_link" href="/">history</a></li>
    <li class="menu_item">
      <a class="menu_link" href="https://github.com/slavcoder">author</a>
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
    color: var(--color-primary-9);
    opacity: 0.9;
  }

  .menu_link:hover,
  .menu_link:focus {
    text-decoration: underline;
    opacity: 1;
  }

  .menu_logo {
    color: var(--color-success);
  }
</style>
