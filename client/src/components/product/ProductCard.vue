<template>
    <div class="product-card">
        <img :src="product.img" />
        <div class="name">{{ product.name }}</div>
        <div class="categories">
            <div class="category" v-for="(category, key) in product.category" :key="key">
                {{ category }}
            </div>
        </div>
        <div class="price">R$ {{ product.price }}</div>
    </div>
</template>

<script>
export default {
    name: 'ProductCard',
    props: ['product'],
    components: {
    },
    data() {
        return {
        }
    },
    computed: {
    },
    methods: {
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
    margin: 20px;
    height: min(500px, 100%);

    img {
        width: 100%;
        height: 300px;
        object-fit: contain;
        border-radius: 5px;
    }

    .name {
        font-size: 16px;
        margin: 10px 20px;
    }

    .categories {
        display: flex;
        font-size: 14px;

        .category {
            margin-right: 10px;
            background: #D4F3DE;
            border-radius: 5px;
            padding: 10px;
        }
    }

    .price {
        color: var(--primaryColor);
        font-size: 22px;
        padding: 10px 0px;
    }

    &:active{
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.25);
    }

}
</style>