<script>
  import { draw } from 'svelte/transition'
  export let name = 'reset'
  export let duration = 0
  export let delay = 0

  let animate = {
    duration: duration,
    delay: delay,
  }
</script>

{#if name === 'reset'}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="feather feather-rotate-ccw"
  >
    <polyline in:draw={animate} points="1 4 1 10 7 10" />
    <path in:draw={animate} d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
  </svg>
{:else if name === 'delete'}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="feather feather-trash-2"
  >
    <polyline in:draw={animate} points="3 6 5 6 21 6" />
    <path
      in:draw={animate}
      d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
    /><line x1="10" y1="11" x2="10" y2="17" />
    <line in:draw={animate} x1="14" y1="11" x2="14" y2="17" />
  </svg>
{:else if name === 'close'}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="feather feather-x"
    ><line in:draw={animate} x1="18" y1="6" x2="6" y2="18" />
    <line in:draw={animate} x1="6" y1="6" x2="18" y2="18" /></svg
  >
{/if}
