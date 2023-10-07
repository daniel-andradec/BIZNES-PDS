import { createStore } from 'vuex'

import product from './product/product'
import category from './category/category'
import cart from './customer/cart'
import order from './customer/order'

// infrastructure
import categoryInfra from './category/categoryInfra'

export default createStore({
    modules: {
        product,
        category,
        categoryInfra,
        cart,
        order
    }
})
