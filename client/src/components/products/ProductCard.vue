<template>
    <div class="product-card" :class="{ fixedSize: fixSize }">
        <img :src="product.photo" />
        <div class="name">{{ fixLength(product.name) }}</div>
        <div class="categories">
            <div class="category" v-for="(category, key) in product.category.split(',')" :key="key">
                {{ category }}
            </div>
        </div>
        <div class="price"> {{ formatValue(product.price) }}</div>
    </div>
</template>

<script>
export default {
    name: 'ProductCard',
    props: ['product', 'fixSize'],
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
    },
    mounted() {
    }
}
</script>
<style lang="less">
.product-card  {
    position: relative;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: space-evenly;
    align-items: center;
    min-height: 90px;
    text-align: center;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.18);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    transition: all linear .2s;
    margin: 10px;
    height: min(500px, 100%);
    padding: 10px;

    &.fixedSize {
        width: 300px;
        height: 400px;

        img {
            width: 100%;
            height: 200px;
            object-fit: contain;
        }
    }

    img {
        width: 100%;
        height: 200px;
        border-radius: 5px;
        object-fit: contain;
        margin-top: 10px;
    }

    .name {
        font-size: 18px;
        margin: 10px 20px;
    }

    .categories {
        display: flex;
        font-size: 12px;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;
        gap: 10px;

        .category {
            background: #D4F3DE;
            border-radius: 5px;
            padding: 8px;
        }
    }

    .price {
        color: var(--primaryColor);
        font-size: 22px;
        padding: 10px 0px;
        font-weight: 600;
    }

    &:active{
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.25);
    }

}
</style>