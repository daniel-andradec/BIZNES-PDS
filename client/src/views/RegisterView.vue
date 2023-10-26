<template>
    <div class='register-view'>
        <div class="register-header">
            <img @click="this.$router.push('/')" alt="Vue logo" :src="logo">
        </div>

        <div class="register">
            <CustomerRegisterComp v-if="isCostumer"/>
            <VendorRegisterComp v-else />
        </div>
    </div>
</template>

<script>
import CustomerRegisterComp from '@/components/register/CustomerRegisterComponent.vue'
import VendorRegisterComp from '@/components/register/VendorRegisterComponent.vue'

export default {
    name: 'RegisterView',
    components: {
        CustomerRegisterComp,
        VendorRegisterComp
    },  
    data () {
        return {
            isCostumer: false,
            logo: require('@/assets/images/logo.png')
        }
    },
    methods: {

    },
    computed: {

    },
    mounted () {
        this.isCostumer = this.$route.params.userType == 1
        console.log(this.$route.params.redirect)
    }
}
</script>

<style lang="less">

.register-view {
    position: fixed;
    top: 0;
    left:0;
    right: 0;
    bottom: 0;
    overflow: auto;
    background: #f4f4f4;
    min-height: 100vh;
    height: 100%;

    .register-header {
        display: flex;
        align-items: flex-start;
        img {
            margin-left: 30px;
            cursor: pointer;
            height: 90px;
        }
    }

    .register {
        padding-bottom: 30px;
    }
}
    
</style>