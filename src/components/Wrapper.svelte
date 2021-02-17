<script>
  import { settings } from '../stores/settings.js'
</script>

<div class="wrapper font-{$settings.fontSize}">
  <slot />
</div>

<style>
  .wrapper {
    background-color: var(--color-primary-4);
    color: var(--color-primary-7);
    width: 100%;
    height: 100%;
    min-height: 100vh;
    padding-bottom: 50px;
  }

  .font-small {
    font-size: 0.8em;
  }

  .font-medium {
    font-size: 1em;
  }

  .font-large {
    font-size: 1.1em;
  }

  @media (min-width: 1200px) {
    .font-large {
      font-size: 1.5em;
    }
  }

  @media (min-width: 1600px) {
    .font-small {
      font-size: 1em;
    }

    .font-medium {
      font-size: 1.2em;
    }

    .font-large {
      font-size: 1.7em;
    }
  }

  @media (min-width: 2400px) {
    .font-small {
      font-size: 1.2em;
    }

    .font-medium {
      font-size: 1.4em;
    }

    .font-large {
      font-size: 1.9em;
    }
  }
</style>
