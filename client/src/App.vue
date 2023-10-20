<template>
  <router-view :key="$route.params"/>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
  },
  computed: {
    ...mapGetters(['getProducts'])
  },
  mounted() {
    console.log('App mounted');
    if (!this.getProducts.length) {
      this.$store.dispatch('fetchProducts');
    }
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
