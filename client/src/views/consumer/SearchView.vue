<template>
    <div>
        <div class="header">
            <ConsumerHeader />
        </div> 
        <div class="products">
            <ProductsList :products="results" :search="this.$route.query.searchText"/>
        </div>

    </div>
</template>

<script>
import ProductsList from '@/components/products/ProductsList.vue';
import ConsumerHeader from '@/components/headers/ConsumerHeader.vue';

export default {
    name: 'SearchView',
    components: {
        ConsumerHeader,
        ProductsList
    },
    data() {
        return {
            results: []
        }
    },
    methods: {
    },
    mounted() {
        const query = this.$route.query.searchText
        this.results = this.$store.getters.getSearchProducts(query)
        window.scrollTo(0, 0)
    },
}
</script>
<style lang="less">
.header {
    padding-bottom: 50px;
}

.products {
    padding-top: 30px;
    margin-bottom: 50px;
}
</style>