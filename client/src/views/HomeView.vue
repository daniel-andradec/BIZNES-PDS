<template>
    <div>
        <div class="header">
            <CustomerHeader />
        </div> 
        <div class="products">
            <ProductsList :products="getProducts"/>
        </div>

    </div>
</template>

<script>
import ProductsList from '@/components/products/ProductsList.vue';
import CustomerHeader from '@/components/headers/CustomerHeader.vue';
import { mapGetters } from 'vuex';
import { getProducts } from '@/controllers/ProductController';

export default {
    name: 'HomeView',
    components: {
        CustomerHeader,
        ProductsList
    },
    data() {
        return {
        }
    },
    computed: {
        ...mapGetters(['getProducts'])
    },
    methods: {
    },
    async mounted() {
        await getProducts().then((response) => {
            console.log(response);
        });
        console.log(this.getProducts);
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