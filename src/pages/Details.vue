<template lang="">
  <div>
    <ul v-if="$route.query">
      <li>{{$route.query.id }}</li>
      <li>{{$route.query.title}}</li>
    </ul>
    <ul v-if="$route.params">
      <li>{{$route.params.id}}</li>
      <li>{{$route.params.title}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="">
  
</style>