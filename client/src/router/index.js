import { nextTick } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'

// customer routes
import ProductView from '../views/customer/ProductView.vue'
import SearchView from '../views/customer/SearchView.vue'
import CartView from '../views/customer/CartView.vue'
import CheckoutView from '../views/customer/CheckoutView.vue'
import OrderConfirmationView from '../views/customer/OrderConfirmationView.vue'
import CustomerProfileView from '../views/customer/CustomerProfileView.vue'

// vendor routes
import VendorPanelView from '../views/vendor/VendorPanelView.vue'
import StoreRegistrationView from '../views/vendor/StoreRegistrationView.vue'

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
        path: '/register/:userType',
        name: 'register',
        meta: {
            title: 'Cadastro'
        },
        component: RegisterView
    },
    {
        path: '/product/:id',
        name: 'product',
        meta: {
            title: 'Produto'
        },
        component: ProductView
    },
    {
        path: '/search',
        name: 'search',
        meta: {
            title: 'Pesquisa'
        },
        component: SearchView
    },
    {
        path: '/cart',
        name: 'cart',
        meta: {
            title: 'Carrinho'
        },
        component: CartView
    },
    {
        path: '/checkout',
        name: 'checkout',
        meta: {
            title: 'Checkout'
        },
        component: CheckoutView
    },
    {
        path: '/order-confirmation',
        name: 'order-confirmation',
        meta: {
            title: 'Confirmação de Pedido'
        },
        component: OrderConfirmationView
    },
    {
        path: '/customer-profile',
        name: 'customer-profile',
        meta: {
            title: 'Perfil'
        },
        component: CustomerProfileView
    },
    {
        path: '/vendor-panel',
        name: 'panel',
        meta: {
            title: 'Painel do Vendedor'
        },
        component: VendorPanelView
    },
    {
        path: '/store-registration',
        name: 'store-registration',
        meta: {
            title: 'Cadastro da Loja'
        },
        component: StoreRegistrationView
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