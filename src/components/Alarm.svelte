<script>
  import { onMount } from 'svelte'
  import { alarmList } from '../data/alarmList.js'
  export let play
  export let sound
  const remove = () => play = false
  let audio

  onMount(() => {
    audio.play()
    console.log(audio)
  })

</script>

<audio id="myAudio" bind:this={audio} on:ended={remove}>
  <track kind="captions">
  <source src="alarm/{alarmList[sound]}" type="audio/mpeg">
  Your browser does not support the audio element.
</audio>