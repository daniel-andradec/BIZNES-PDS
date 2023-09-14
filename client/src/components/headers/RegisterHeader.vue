<template>
    <div class="register-header">
        <img @click="this.$router.push('/')" alt="Vue logo" :src="logo">
    </div>
</template>
<script>
export default {
    name: 'RegisterHeader',
    components: {
    },
    data() {
        return {
            logo: require('@/assets/images/logo.png')
        }
    }
}
</script>
<style lang="less">
.register-header {
    background: #F4F4F4;
    height: 90px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding: 0 20px;
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    right: 0;

    img {
        margin-left: 100px;
        cursor: pointer;
    }
}
</style>