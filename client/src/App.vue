<template>
  <router-view :key="$route.params"/>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style lang="less">
@import '@fortawesome/fontawesome-free/css/all.css';
@import '@/assets/fonts/Gellix/stylesheet.less';

@primaryColor: #57A06F;
@secondaryColor: #858586;

body {
  min-width: 1000px;
  overflow-x: scroll;
}

#app {
  font-family: Gellix;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-weight: normal;
}

:root {
    --primaryColor: #57A06F;
    --secondaryColor: #858586;
}

</style>
