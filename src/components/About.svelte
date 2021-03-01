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

    <h3>Usage and tips</h3>
    <p>
      In main form you can use special letters <mark>d,h,m,s</mark> to add new counter
      (or save it to have quick access). The value can't be lower than 1 second and
      higher than 9,999 days.
    </p>
    <p>
      As a simple example <mark>5d 3h 20m 50s</mark> will create a counter with 5
      days, 3 hours, 20 minutes and 50 seconds.
    </p>
    <h4>Time calculations</h4>
    <p>You can do some basic calculations. For instance:</p>
    <ul>
      <li><mark>200s</mark> equals 3 minutes and 20 seconds</li>
      <li><mark>33333s</mark> equals 9 hours, 15 minutes and 44 seconds</li>
      <li><mark>1m 1m 1m 10s 10s 10s</mark> equals 3 minutes and 30 seconds</li>
      <li><mark>5d 3d 5h</mark> equals 8 days and 5 hours</li>
    </ul>
    <p>
      You can use negative numbers too, but the result can't be lower than 1
      second. The order doesn't matter. For instance:
    </p>
    <ul>
      <li><mark>50s -10m</mark> is invalid (it gives less than one second)</li>
      <li><mark>1d -10h</mark> equals 14 hours</li>
      <li><mark>-9d 10d 10m</mark> equals 1 day and 10 minutes</li>
    </ul>
    <p>
      Fractions are also possible. They are rounded to 1 second though. For
      instance:
    </p>
    <ul>
      <li><mark>0.5d</mark> or <mark>.5d</mark> equals 12 hours</li>
      <li><mark>0.3d</mark> or <mark>.3d</mark> equals 7 hours 12 minutes</li>
      <li><mark>0.33333d</mark> or <mark>.33333d</mark> equals 8 hours</li>
      <li>
        <mark>0.31h</mark> or <mark>.31h</mark> equals 18 minutes and 36 seconds
      </li>
      <li>
        <mark>0.2s</mark> or <mark>.2s</mark> is invalid (it can't be less than one
        second)
      </li>
      <li><mark>1.2s</mark> equals 1 seconds</li>
      <li><mark>1.6s</mark> equals 2 seconds</li>
    </ul>
    <p>
      To calculate time up to given date you need write it in choosen format
      (check out settings - default format is "dd/mm/yyyy"). For instance:
    </p>
    <ul>
      <li>
        <mark>20/02/2030</mark> equals time from now up to February 20, 2030 00:00
      </li>
      <li>
        <mark>02/2030</mark> equals time from now up to February 1, 2030 00:00
      </li>
      <li>
        <mark>2030</mark> equals time from now up to January 1, 2030 00:00
      </li>
      <li>
        <mark>2010</mark> is invalid, because it gives negative number (2010 is in
        past)
      </li>
      <li>
        <mark>20/02/2030 13/05/2025</mark> is valid, it will calculate time up to
        both dates and sum it up (remember about the limit 9,999 days)
      </li>
    </ul>
    <p>
      You can combine all those elements to build more complex counter. For
      instance:
    </p>
    <ul>
      <li>
        <mark>-2d 03/08/2032 20d -5h 333m 5000s .3d</mark> is valid time (try it
        out if you don't believe me)
      </li>
      <li>
        <mark>08/2010 10000d</mark> even though the limit is 9,999 days and
        there is <mark>10000d</mark> the result is less than 9,999 days because of
        given past date which makes it a valid value.
      </li>
      <li>
        <mark>10.5d 22222s 3333m -1000s</mark> equals 13 days, 1 hour, 26 minutes
        and 42 seconds
      </li>
    </ul>
    <p>
      Don't forget to start <Link href="https://github.com/slavcoder/timer"
        >this</Link
      > repository if you enjoy it. Have a nice day.
    </p>
  </div>
</Modal>

<style>
  .container {
    margin: 50px auto;
    width: 100%;
    max-width: 700px;
  }

  mark {
    background-color: var(--bg-primary-5);
    color: var(--bg-primary-5-text-1);
  }

  p {
    line-height: 1.5em;
  }

  ul {
    padding: 0 0 0 1em;
    line-height: 1.5em;
  }
</style>
