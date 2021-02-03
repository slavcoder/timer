<svelte:head>
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Russo+One&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<style>
  :global(:root) {
    --color-dark: #222;
    --color-light: #ccc;
    --color-light-darker: #999;
    --color-success: #7fe0aa;
  }

  :global(body) {
    font-family: 'Russo One', sans-serif;
    background-color: var(--color-dark);
    color: var(--color-light);
    padding: 0;
    height: auto;
  }

  :global(*) {
    box-sizing: border-box;
  }
</style>
