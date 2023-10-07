<template>
    <div>
        <div class="header">
            <CustomerHeader />
        </div> 
        <div class="products">
            <ProductsList :products="results" :search="this.$route.query.searchText"/>
        </div>

    </div>
</template>

<script>
import ProductsList from '@/components/products/ProductsList.vue';
import CustomerHeader from '@/components/headers/CustomerHeader.vue';

export default {
    name: 'SearchView',
    components: {
        CustomerHeader,
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