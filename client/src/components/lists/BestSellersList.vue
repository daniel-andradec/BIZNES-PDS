<template>
    <div class="best-sellers-list">
        <div class="list-header">
            <h2>Mais vendidos no Biznes</h2>
        </div>
        <div class="list" v-if="Object.values(getBestSellers).length > 0">
            <div class="list-item" v-for="(product, key) in getBestSellers" :key="key" @click="goToProduct(product)">
                <ProductCard :key="product.id" :product="product" :fixSize="true" />
            </div>
                
            <span @click="this.$router.push('/')">Outros produtos</span>
        </div>
        
    </div>
</template>

<script>
import ProductCard from '@/components/products/ProductCard.vue'
import { mapGetters } from 'vuex'

export default {
    name: 'BestSellersList',
    components: {
        ProductCard
    },
    data() {
        return {
        }
    },
    computed: {
        ...mapGetters(['getBestSellers'])
    },
    methods: {
        goToProduct(product) {
            this.$router.push({ name: 'product', params: { idProduct: product.idProduct } })
        }
    }
}
</script>

<style lang="less">
.best-sellers-list {
    margin-bottom: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    // margin-left: 50px;
    gap: 20px;

    h2 {
        font-size: 30px;
        font-weight: 500;
    }

    .list {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        // max 4 products in the row
        flex-wrap: wrap;
        gap: 20px;

        span {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 25px;
            font-weight: 600;
            color: var(--primaryColor);
            cursor: pointer;
        }
    }

    .list-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 20px;
        margin-top: 20px;
        max-width: 100%;
    }
}
</style>