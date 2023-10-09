import { createStore } from 'vuex'

// customer
import product from './product/product'
import category from './category/category'
import cart from './customer/cart'
import order from './customer/order'
import customer from './customer/customer'

// vendor
import vendor from './vendor/vendor'

// admin
import admin from './admin/admin'

// infrastructure
import vendorInfra from './vendor/vendorInfra'
import categoryInfra from './category/categoryInfra'

export default createStore({
    modules: {
        product,
        category,
        categoryInfra,
        cart,
        order,
        customer,
        vendor,
        vendorInfra,
        admin
    }
})
