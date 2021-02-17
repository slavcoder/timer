<script>
  import Modal from './Modal.svelte'
  import Link from './Link.svelte'
  import Heading from './Heading.svelte'
</script>

<Modal name="about">
  <Heading>About</Heading>

  <div class="container">
    <h3>Author</h3>
    <p>
      Hi, the author is me - <Link href="https://github.com/slavcoder"
        >slavcoder</Link
      >
    </p>
    <p>
      Check out <Link href="https://github.com/slavcoder/timer">repository</Link
      > of this project
    </p>

    <h3>Storage</h3>
    <p>
      This website is using your browser's <Link
        href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage"
        >local storage</Link
      > to keep informations like settings, counters or history.
    </p>

    <h3>Sources</h3>
    <p>
      Alarm sounds - <Link href="https://soundbible.com/">soundbible.com</Link>
    </p>
    <p>
      Icons - <Link href="https://feathericons.com/">feathericons.com</Link><br
      />
    </p>

    <h3>Tips from the author</h3>
    <p>
      In main form you can use special letters (d,h,m,s) to add new counter (or
      save it to have quick access), but you can also do some basic
      calculations.
    </p>
    <p>
      If you write "5d 3d 5h" the result will be 8 days and 5 hours, so you can
      add time.
    </p>
    <p>
      You can also use negative numbers (but the result can't be lower than 1
      second). For instance "1d -10h" gives 14 hours.
    </p>
    <p>
      I know what will you ask now:<br />
      - can I use "0.5d"?<br />
      The answer is yes! "0.5d" or even ".5" will be calculated as 12 hours. If you
      want 1/3 of a day, you can simply write "0.33333d".<br />
    </p>
    <p>
      Dates. You can calculate time up to any valid date with a choosen format
      (check out settings - default format is "dd/mm/yyyy"). For instance:
      "20/02/2030" will be calculated as time up to that date. You can use just
      "2030" if you want to calculate time up to a year or "02/2030" if you want
      to calculate up to a month.
    </p>
    <p>
      Combine time and date.<br />
      "-2d 03/08/2032 20d -5h 333m 5000s" will be valid (if you use default date
      format). The limit is less than 9999 days but more than 1second.
    </p>
    <p>
      Don't forget to star <Link href="https://github.com/slavcoder/timer"
        >this</Link
      > project if you enjoy it. Have a nice day.
    </p>
  </div>
</Modal>

<style>
  .container {
    margin: 50px auto;
    width: 100%;
    max-width: 700px;
  }
</style>
