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
      > of this project (consider to star it if you enjoy it)
    </p>

    <h3>Usage</h3>
    <p>
      In main form you can use special letters <mark>d,h,m,s</mark> to add new counter
      (or save it to have quick access). The value can't be lower than 1 second and
      higher than 9,999 days.
    </p>
    <p>
      As a simple example <mark>5d 3h 20m 50s</mark> will create a counter with 5
      days, 3 hours, 20 minutes and 50 seconds.
    </p>

    <h4>Basic calculations</h4>
    <ul>
      <li><mark>200s</mark> equals 3 minutes and 20 seconds</li>
      <li><mark>33333s</mark> equals 9 hours, 15 minutes and 44 seconds</li>
      <li><mark>1m 1m 1m 10s 10s 10s</mark> equals 3 minutes and 30 seconds</li>
      <li><mark>5d 3d 5h</mark> equals 8 days and 5 hours</li>
    </ul>

    <h4>Negative numbers</h4>
    <p>
      You can use negative numbers too, but the result can't be lower than 1
      second. The order doesn't matter.
    </p>
    <ul>
      <li><mark>50s -10m</mark> is invalid (it gives less than one second)</li>
      <li><mark>1d -10h</mark> equals 14 hours</li>
      <li><mark>-9d 10d 10m</mark> equals 1 day and 10 minutes</li>
    </ul>

    <h4>Fractions</h4>
    <p>Fractions are rounded to 1 second.</p>
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

    <h4>Dates</h4>
    <p>
      To calculate time up to given date you need write it in choosen format
      (check out settings - default format is "dd/mm/yyyy").
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

    <h4>Specific hour</h4>
    <p>
      To calculate time up to given hour you need write it in choosen format
      (default format is "24h").
    </p>
    <h5>24h time format</h5>
    <ul>
      <li>
        <mark>13:30</mark> equals time from now up to the nearest 13:30 hour, if
        it is 13:00 now, it will be 30 minutes, if it is 14:00 now it will be 23
        hours and 30 minutes
      </li>
      <li>
        <mark>9</mark> equals time from now up to 9:00, you can ommit minutes if
        you need just specific hour
      </li>
      <li>
        <mark>16:3</mark> equals time from now up to nearest 16:03, be aware that
        16:3 is interpreted as 16:03 rather than 16:30
      </li>
    </ul>

    <h5>12h time format</h5>
    <ul>
      <li>
        <mark>1:30pm</mark> equals time from now up to the nearest 01:30 PM, if it
        is 01:00 PM now, it will be 30 minutes, if it is 02:00 PM now it will be
        23 hours and 30 minutes
      </li>
      <li>
        <mark>9am</mark> equals time from now up to 09:00 AM, you can ommit minutes
        if you need just specific hour
      </li>
      <li>
        <mark>4:3pm</mark> equals time from now up to nearest 04:03 PM, be aware
        that 4:3 is interpreted as 04:03 rather than 04:30
      </li>
    </ul>

    <h4>Date and hour</h4>
    <p>
      If you want to get time up to specific date and specific hour at that date
      you can combine date and time elements with a underscore character
      (date_hour).
    </p>
    <ul>
      <li>
        <mark>2025_1:30pm</mark> equals time from now up to 01/01/2025 01:30 PM (with
        a 12h time format)
      </li>
      <li>
        <mark>10/05/2025_16:30</mark> equals time from now up to 10/05/2025 16:30
        (with a 24h time format)
      </li>
    </ul>

    <h4>Blocked counter</h4>
    <p>
      Counter can be blocked which means it can't be pauzed, reset or even saved
      to quick access. Blocked counter starts immediately and it can be only
      deleted. It have a lock icon in right corner to quickly regonize them. To
      create one you have to use keyword <mark>block</mark> or it's short
      version <mark>b</mark>.
    </p>
    <p>
      This is very useful to create a counter up to a specific date or hour when
      you don't want to stop it by any missclick or have to run it after you
      create it which can couse time move as the real time won't stop to wait
      for your click.
    </p>
    <ul>
      <li>
        <mark>13:00 b</mark> or <mark>13:00 block</mark> equals time from now up
        to the nearest 13:00 (if you use 24h time format), the counter is blocked
        because of used keyword 'b' or 'block'
      </li>
      <li>
        <mark>01/02/2025 10d b</mark> equals time from now up to 01/02/2025, plus
        10 days (so the result is time up to 11/02/2025), the counter is blocked
        because of used keyword 'b'
      </li>
    </ul>

    <h4>All methods combined</h4>
    <p>You can combine all those elements to build more complex counter.</p>
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
      <li>
        <mark>05/2033_22:00 .5d 30s 5m -10h b</mark> equals time up to 01/05/2033
        22:00 plus 12 hours, plus 30 seconds, plus 5 minutes, minus 5 hours and it
        is a blocked counter (using time format "24h" and date format "dd/mm/yyyy")
      </li>
    </ul>

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
  </div>
</Modal>

<style>
  .container {
    margin: 50px auto;
    width: 100%;
    max-width: 700px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  mark {
    background-color: var(--bg-primary-5);
    color: var(--bg-primary-5-text-1);
  }

  p {
    line-height: 1.5em;
    margin: 0.5em 0;
  }

  ul {
    padding: 0 0 0 1em;
    line-height: 1.5em;
  }

  h3 {
    font-size: 1.5em;
  }

  h4 {
    border-left: 5px solid var(--bg-primary-1-decoration-3);
    font-size: 1.2em;
    margin: 0.5em 0;
    padding: 0.5em;
    background-color: var(--bg-primary-2);
    color: var(--bg-primary-2-text-1);
  }

  h5 {
    font-size: 1em;
    margin: 0.5em 0;
  }
</style>
