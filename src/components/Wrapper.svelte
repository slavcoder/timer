<script>
  import {settings} from '../stores/settings.js'
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

  .font-default {
    font-size: 1.1em;
  }
  .font-large {
    font-size: 1.5em;
  }
  .font-small {
    font-size: .9em;
  }
</style>