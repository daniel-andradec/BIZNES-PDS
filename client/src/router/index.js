import { nextTick } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

// consumer routes
import ProductView from '../views/consumer/ProductView.vue'
import SearchView from '../views/consumer/SearchView.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        meta: {
            title: 'Home'
        },
        component: HomeView
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            title: 'Login'
        },
        component: LoginView
    },
    {
        path: '/product/:id',
        name: 'product',
        meta: {
            title: 'Produto'
        },
        component: ProductView
    },
    // query to search
    {
        path: '/search',
        name: 'search',
        meta: {
            title: 'Pesquisa'
        },
        component: SearchView
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.afterEach((to) => {
    nextTick(() => {
        document.title = to.meta.title || 'Biznes'
    })
})

export default router