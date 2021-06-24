<template>
  <router-view></router-view>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  data(){
    return{
    }
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
</style>
