<template>
    <div class="checkout-header">
        <img @click="this.$router.push('/')" alt="Vue logo" :src="logo">

        <div class="checkout-title">
            Finalizar a compra
        </div>
        
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'CustomerHeader',
    emits: ['input'],
    components: {
    },
    data() {
        return {
            logo: require('@/assets/images/logo.png'),
            searchText: '',
            isDropDownVisible: false
        }
    },
    methods: {
        search() {
            this.$router.push({ name: 'search', query: { searchText: this.searchText } })
        },
        showDropdown() {
            this.isDropDownVisible = true
        },
        hideDropdown() {
            this.isDropDownVisible = false
        }
    },
    computed: {
        ...mapGetters(['getCartTotalQuantity'])
    }
}
</script>

<style lang="less">
.checkout-header {
    background: #F4F4F4;
    height: 90px;
    display: flex;
    flex-direction: row;
    align-items: center; 
    padding: 0 20px;
    position: fixed;
    z-index: 8;
    top: 0;
    left: 0;
    right: 0;
    justify-content: space-between;

    img {
        position: absolute; 
        left: 40px; 
        height: 90px;

    }

    .checkout-title {
        width: 100%;
        text-align: center; 
        font-size: 25px;
        color: #252525;
    }

}
@media (max-width: 1200px) {
    .checkout-header {
        justify-content: space-between;
    }
}
</style>
