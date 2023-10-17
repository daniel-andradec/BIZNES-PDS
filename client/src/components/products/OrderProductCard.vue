<template>
    <div class="order-product-card" :class="{ fixedSize: fixSize }">
        <img :src="product.photo" />
        <div class="name">{{ quantity + 'x ' + fixLength(product.name) }}</div>
        <div class="option" v-if="product.selectedOption">{{ product.selectedOption }}</div>
        <div class="price"> {{ 'Total: ' + formatValue(getTotalPrice()) }}</div>
    </div>
</template>

<script>
export default {
    name: 'OrderProductCard',
    props: ['product', 'fixSize', 'quantity'],
    components: {
    },
    data() {
        return {
        }
    },
    computed: {
    },
    methods: {
        formatValue(value) {
            return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        },
        fixLength: function (text) {
            return text.length > 25 && this.fixSize ? text.substr(0, 25) + '...' : text
        },
        getTotalPrice() {
            return this.product.price * this.product.quantity
        }
    },
    mounted() {
    }
}
</script>
<style lang="less">
.order-product-card  {
    background-color: #fff;
    position: relative;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: space-evenly;
    align-items: center;
    min-height: 70px;
    text-align: center;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.18);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    transition: all linear .2s;
    margin: 10px;
    width: 250px;
    height: 350px;

    img {
        width: 100%;
        height: 200px;
        object-fit: contain;
        margin-top: 10px;
        border-radius: 5px;
    }


    .name {
        font-size: 18px;
        margin: 10px 20px;
    }

    .price {
        font-size: 22px;
        padding: 10px 0px;
        font-weight: 500;
    }

    &:active{
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.25);
    }

}
</style>