<template>
  <div class="school">
    <h2>{{ schoolName }}</h2>
    <h2>{{ address }}</h2>
  </div>
</template>

<script>
 export default {
  name: 'School',
  data() {
    return {
      schoolName:'first school',
      address:'1st street'
    }
  },
 }
</script>

<style>
  .school{
    background-color: gray;
  }
</style>