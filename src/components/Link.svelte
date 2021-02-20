<script>
  export let href
</script>

<a {href}><slot /></a>

<style>
  a:hover,
  a:focus {
    text-decoration: underline;
  }

  a {
    color: var(--bg-primary-1-text-2);
  }
</style>