<template>
    <div class="consumer-header">
        <img alt="Vue logo" :src="logo">

        <div class="search">
            <input type="text" placeholder="Buscar no Biznes" v-model="searchText" @input="emitInput" />
            <i class="fa fa-search icon"></i>
        </div>

        <div class="login">
            Olá, faça seu <span>login</span>
        </div>

        <div class="cart">
            <i class="fa fa-shopping-cart"></i>
            <span>
                Ir para <br> o carrinho
            </span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ConsumerHeader',
    emits: ['input'],
    components: {
    },
    data() {
        return {
            logo: require('@/assets/images/logo.png'),
            searchText: ''
        }
    },
    methods: {
        emitInput() {
            this.$emit('input', this.searchText)
        }
    }
}
</script>
<style lang="less">
.consumer-header {
    background: #F4F4F4;
    height: 90px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    padding: 0 20px;
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    right: 0;
    img {
        margin-right: 20px;
    }

    .search {
        display: flex;
        align-items: center;
        background-color: #fff;
        border-radius: 5px;
        box-sizing: border-box;
        border: 1px solid var(--secondaryColor);
        padding: 10px 10px;
        position: relative;
        margin: 20px 20px;

        //sizing
        width: 100%;
        width: 40vw;
        height: 40px;
        
        input {
            border: none;
            outline: none;
            background-color: transparent;
            font-size: 16px;
            font-family: Gellix;
            width: 100%;
        }

        i {
            position: absolute;
            right: 10px;
            color: gray;
        }
    }

    .login {
        margin: 10px 70px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: var(--secondaryColor);
        font-size: 18px;
        font-weight: 500;

        span {
            color: var(--primaryColor);
        }
    }

    .cart {
        margin: 10px 0px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        color: var(--secondaryColor);
        font-size: 18px;
        font-weight: 500;

        span {
            margin-left: 10px;
        }
    }
}
</style>