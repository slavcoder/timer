<script>
  import { onMount } from 'svelte'
  import { alarmList } from '../data/alarmList.js'
  export let play
  export let sound
  export let volume = 50
  let mounted = false
  let audio
  const remove = () => play = false
  $: if(mounted) audio.volume = volume / 100

  onMount(() =>  {
    mounted = true
    audio.volume = volume / 100
    audio.play()
  })
</script>

<audio bind:this={audio} on:ended={remove}>
  <track kind="captions">
  <source src="alarm/{alarmList[sound]}" type="audio/mpeg">
  Your browser does not support the audio element.
</audio>