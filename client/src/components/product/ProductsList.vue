<template>
    <div class="product-list">
        <div class="menu">
            <div class="categories">
                <i class="fas fa-bars"></i>
                <p> Todos os produtos</p> 
            </div>
            <div class="order">
                <p>Classificar por por</p>
                <i class="fas fa-arrow-down-wide-short"></i>
            </div>
        </div>
        <div class="list">
            <div class="list-item" v-for="(product, key) in getProducts" :key="key">
                <ProductCard :key="product.id" :product="product" />
            </div>
        </div>
        
    </div>
</template>

<script>
import ProductCard from './ProductCard.vue'
import { mapGetters } from 'vuex'
export default {
    name: 'ProductsList',
    components: {
        ProductCard
    },
    data() {
        return {
        }
    },
    computed: {
        ...mapGetters(['getProducts']),
    },
    methods: {
    },
    mounted() {
        console.log('ProductsList.vue mounted', this.getProducts)
    }
}
</script>

<style lang="less">
.product-list {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    .menu {
        display: flex;
        justify-content: space-between;

        .categories {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            align-items: center;
            margin: 20px 50px;
            color: var(--secondaryColor);
            i {
                margin-right: 15px;
                font-size: 25px;
            }
            p {
                font-weight: normal;
                font-size: 25px;
            }
        }

        .order {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            margin: 20px 50px;
            color: var(--secondaryColor);
            i {
                margin-left: 15px;
                font-size: 25px;
            }
            p {
                font-weight: normal;
                font-size: 25px;
            }
        }
        
    }
    .list {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        margin: 0px 5%;

        .list-item {
            padding: 20px 20px;
        }
    }
}
    
</style>