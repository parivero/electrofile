<template>
  <div id="wrapper">
    <ServerCard></ServerCard>
    <AddButton/>
  </div>
</template>

<script>
  import ServerCard from './ServerCard/ServerCard'
  import AddButton from './AddButton/AddButton'
  
  export default {
    props: ['server'],
    components: { "ServerCard": ServerCard, "AddButton": AddButton }
  }
</script>

<style>

</style>
