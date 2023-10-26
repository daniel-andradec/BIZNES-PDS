import { nextTick } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import store from "../store/index.js";

import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";

// customer routes
import ProductView from "../views/customer/ProductView.vue";
import SearchView from "../views/customer/SearchView.vue";
import CartView from "../views/customer/CartView.vue";
import CheckoutView from "../views/customer/CheckoutView.vue";
import OrderConfirmationView from "../views/customer/OrderConfirmationView.vue";
import CustomerProfileView from "../views/customer/CustomerProfileView.vue";

// vendor routes
import VendorPanelView from "../views/vendor/VendorPanelView.vue";
import VendorProfileView from "../views/vendor/VendorProfileView.vue";
import VendorProducstView from "../views/vendor/VendorProductsView.vue";
import VendorSalesView from "../views/vendor/VendorSalesView.vue";

// admin routes
import AdminPanelView from "../views/admin/AdminPanelView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    meta: {
      title: "Home"
    },
    component: HomeView,
  },
  {
    path: "/login/:redirect?",
    name: "login",
    meta: {
      title: "Login"
    },
    component: LoginView,
  },
  {
    path: "/register/:userType?/:redirect?",
    name: "register",
    meta: {
      title: "Cadastro",
    },
    component: RegisterView,
  },
  {
    path: "/product/:idProduct",
    name: "product",
    meta: {
      title: "Produto",
    },
    component: ProductView,
  },
  {
    path: "/search",
    name: "search",
    meta: {
      title: "Pesquisa",
    },
    component: SearchView,
  },
  {
    path: "/cart",
    name: "cart",
    meta: {
      title: "Carrinho",
    },
    component: CartView,
  },
  {
    path: "/checkout",
    name: "checkout",
    meta: {
      title: "Checkout",
      roles: ["customer"],
    },
    component: CheckoutView,
  },
  {
    path: "/order-confirmation",
    name: "order-confirmation",
    meta: {
      title: "Confirmação de Pedido",
      roles: ["customer"],
    },
    component: OrderConfirmationView,
  },
  {
    path: "/customer-profile",
    name: "customer-profile",
    meta: {
      title: "Perfil",
      roles: ["customer"],
    },
    component: CustomerProfileView,
  },
  {
    path: "/vendor-panel",
    name: "panel",
    meta: {
      title: "Painel do Vendedor",
      roles: ["vendor"],
    },
    component: VendorPanelView,
  },
  {
    path: "/store-registration",
    name: "store-registration",
    meta: {
      title: "Cadastro da Loja",
      roles: ["vendor"],
    },
    component: VendorProfileView,
  },
  {
    path: "/vendor-products",
    name: "vendor-products",
    meta: {
      title: "Produtos",
      roles: ["vendor"],
    },
    component: VendorProducstView,
  },
  {
    path: "/vendor-sales",
    name: "vendor-sales",
    meta: {
      title: "Vendas",
      roles: ["vendor"],
    },
    component: VendorSalesView,
  },
  {
    path: "/admin-panel",
    name: "admin-panel",
    meta: {
      title: "Painel de Administrador",
      roles: ["admin"],
    },
    component: AdminPanelView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.afterEach((to) => {
  nextTick(() => {
    document.title = to.meta.title || "Biznes";
  });
});

router.beforeEach((to, from, next) => {
  if (!store.state.user.user.id) {
    const user = localStorage.getItem("user");
    if (user) {
      store.dispatch("setUser", JSON.parse(user));
    }
  }

  if (to.meta.roles && !to.meta.roles.includes(store.state.user.user?.role)) {
    alert("Você não tem permissão para acessar esta página!");
    if (!from.name) {
      next({ name: "login" });
    }
    return
  }

  next();
});

export default router;
