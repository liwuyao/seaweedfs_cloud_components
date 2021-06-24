<template>
  <DiskUsage msg="Disk Usage"/>
</template>

<script>
import DiskUsage from './components/DiskUsage.vue'

export default {
  name: 'App',
  components: {
    DiskUsage: DiskUsage
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
