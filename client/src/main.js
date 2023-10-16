import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

// Toast
import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

// user control
import { getUser } from './controllers/UserController.js'

// check if user is logged in
getUser().then((res) => {
    if (res) {
        const user = {
            id: res.idUser,
            name: res.name,
            email: res.email,
            role: res.role
        }
        store.dispatch('setUser', user)
        localStorage.setItem('user', JSON.stringify(user))
    }
}).catch(() => {
    store.dispatch('doLogout')
})

const app = createApp(App)

app.use(ToastPlugin)

app.use(store).use(router).mount('#app')