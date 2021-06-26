<template>
  <div class="app-container">
    <div class="menu">
      <LeftMenu/>
    </div>
    <div class="content">
      <TopBar/>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { ref, defineComponent } from 'vue'
import TopBar from './components/topBar.vue'
import LeftMenu from './components/leftMenu.vue'
export default defineComponent({
  name: 'App',
  components:{
    TopBar,
    LeftMenu
  },
  setup: () => {
    const count = ref(0)
    return { count }
  }
})
</script>

<style scoped>
.app-container{
  width: 100%;
  height: 100%;
  display: flex;
}
.menu{
  height: 100%;
  width: 200px;
  box-shadow: 6px 0px 5px -5px #999,-6px 0px 5px -5px #999;
}
.content{
  box-sizing: border-box;
  width: calc(100% - 200px);
}
</style>
