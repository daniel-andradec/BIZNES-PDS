import { createStore } from 'vuex'

import product from './product/product'
import category from './category/category'

// infrastructure
import categoryInfra from './category/categoryInfra'

export default createStore({
    modules: {
        product,
        category,
        categoryInfra
    }
})
