<template>
  <div class="reload"   v-loading="loading" element-loading-text="Loading!">

  </div>
</template>

<script>
export default {
    data(){
        return{
            loading:true
        }
    },
    mounted() {
        setTimeout(()=>{
            this.$router.push(localStorage.last_path)
        },1000)
    },
}
</script>

<style scoped>
.reload{
    height: 100%;
    width: 100%;
}
</style>