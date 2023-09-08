<template>
    <div>
        <div class="header">
            <ConsumerHeader @input="handleSearch" />
        </div> 
        <div class="products">
            <ProductsList />
        </div>

    </div>
</template>

<script>
import ProductsList from '@/components/product/ProductsList.vue';
import ConsumerHeader from '../components/header/ConsumerHeader.vue';

export default {
    name: 'HomeView',
    components: {
        ConsumerHeader,
        ProductsList
    },
    data() {
        return {
        }
    },
    methods: {
        handleSearch(searchText) {
            console.log('searchText', searchText)
        }
    }
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