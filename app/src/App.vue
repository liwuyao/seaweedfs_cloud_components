<template>
  <div class="aaa">
    <TopBar/>
    <router-view></router-view>
  </div>
</template>

<script>
import { ref, defineComponent } from 'vue'
import TopBar from './components/topBar.vue'
export default defineComponent({
  name: 'App',
  components:{
    TopBar
  },
  setup: () => {
    const count = ref(0)
    return { count }
  }
})
</script>

<style scoped>

</style>
