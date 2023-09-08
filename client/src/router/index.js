import { nextTick } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        meta: {
            title: 'Home'
        },
        component: HomeView
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