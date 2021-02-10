<script>
  import Modal from './Modal.svelte'
  import Link from './Link.svelte'
</script>

<Modal name="about">
  <h2 class="heading">About</h2>
  <div class="content">
    <h3>Author</h3>
    <p>
      Hi, the author is me - <Link href="https://github.com/slavcoder"
        >slavcoder</Link
      >
    </p>
    <p>
      Check out <Link href="https://github.com/slavcoder/timer">repository</Link> of this
      project
    </p>
    <h3>Storage</h3>
    <p>
      This website is using your browser's <Link
        href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage"
        >local storage</Link
      > to keep informations like settings, counters or history.
    </p>
  </div>
</Modal>

<style>
  .heading {
    text-align: center;
  }

  .content {
    margin: 50px auto;
    width: 100%;
    max-width: 700px;
  }
</style>
