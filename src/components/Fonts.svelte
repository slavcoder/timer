<script>
  import { settings } from '../stores/settings.js'
</script>

<link rel="preconnect" href="https://fonts.gstatic.com" />

{#if $settings.font === 'Russo One'}
  <link
    href="https://fonts.googleapis.com/css2?family=Russo+One:wght@400;700&display=swap"
    rel="stylesheet"
  />
  <style>
    body {
      font-family: 'Russo One', sans-serif;
    }
  </style>
{/if}

{#if $settings.font === 'Roboto Condensed'}
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap"
    rel="stylesheet"
  />
  <style>
  body {font-family: font-family: 'Roboto Condensed', sans-serif;}
  </style>
{/if}

{#if $settings.font === 'Noto Sans'}
  <link
    href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap"
    rel="stylesheet"
  />
  <style>
    body {
      font-family: 'Noto Sans', sans-serif;
    }
  </style>
{/if}

{#if $settings.font === 'Mukta'}
  <link
    href="https://fonts.googleapis.com/css2?family=Mukta:wght@400;700&display=swap"
    rel="stylesheet"
  />
  <style>
    body {
      font-family: 'Mukta', sans-serif;
    }
  </style>
{/if}

{#if $settings.font === 'Fjalla One'}
  <link
    href="https://fonts.googleapis.com/css2?family=Fjalla+One:wght@400;700&display=swap"
    rel="stylesheet"
  />
  <style>
    body {
      font-family: 'Fjalla One', sans-serif;
    }
  </style>
{/if}

{#if $settings.font === 'Teko'}
  <link
    href="https://fonts.googleapis.com/css2?family=Teko:wght@400;700&display=swap"
    rel="stylesheet"
  />
  <style>
    body {
      font-family: 'Teko', sans-serif;
      font-size: 1.2em;
    }
  </style>
{/if}

{#if $settings.font === 'Oswald'}
  <link
    href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap"
    rel="stylesheet"
  />
  <style>
    body {
      font-family: 'Oswald', sans-serif;
    }
  </style>
{/if}

{#if $settings.font === 'Hammersmith One'}
  <link
    href="https://fonts.googleapis.com/css2?family=Hammersmith+One:wght@400;700&display=swap"
    rel="stylesheet"
  />
  <style>
    body {
      font-family: 'Hammersmith One', sans-serif;
    }
  </style>
{/if}

{#if $settings.font === 'Francois One'}
  <link
    href="https://fonts.googleapis.com/css2?family=Francois+One:wght@400;700&display=swap"
    rel="stylesheet"
  />
  <style>
    body {
      font-family: 'Francois One', sans-serif;
    }
  </style>
{/if}

{#if $settings.font === 'Acme'}
  <link
    href="https://fonts.googleapis.com/css2?family=Acme:wght@400;700&display=swap"
    rel="stylesheet"
  />
  <style>
    body {
      font-family: 'Acme', sans-serif;
    }
  </style>
{/if}

{#if $settings.font === 'Jockey One'}
  <link
    href="https://fonts.googleapis.com/css2?family=Jockey+One:wght@400;700&display=swap"
    rel="stylesheet"
  />
  <style>
    body {
      font-family: 'Jockey One', sans-serif;
      font-size: 1.2em;
    }
  </style>
{/if}

{#if $settings.font === 'Ramabhadra'}
  <link
    href="https://fonts.googleapis.com/css2?family=Ramabhadra:wght@400;700&display=swap"
    rel="stylesheet"
  />
  <style>
    body {
      font-family: 'Ramabhadra', sans-serif;
    }
  </style>
{/if}

{#if $settings.font === 'Do Hyeon'}
  <link
    href="https://fonts.googleapis.com/css2?family=Do+Hyeon:wght@400;700&display=swap"
    rel="stylesheet"
  />
  <style>
    body {
      font-family: 'Do Hyeon', sans-serif;
    }
  </style>
{/if}
