<template>
  <TopHeader/>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TopHeader from './top-header.vue'
export default defineComponent({
  components:{
    TopHeader
  }
})
</script>

<style>

</style>