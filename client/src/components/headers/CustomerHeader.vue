<template>
    <div class="customer-header">
        <img @click="this.$router.push('/')" alt="Vue logo" :src="logo">

        <div class="search">
            <input type="text" placeholder="Buscar no Biznes" v-model="searchText" data-testid="search-box" @keyup.enter="search()"/>
            <i class="fa fa-search icon" data-testid="search-icon" @click="search()"></i>
        </div>

        <div class="login-container" @mouseover="showDropdown" @mouseleave="hideDropdown">
            <div class="login">
                <div class="logged" v-if="loggedInUser?.id">
                    <i class="fa-regular fa-user"></i>
                    Olá, <span>{{ getFirstName(loggedInUser?.name) }}</span>
                </div>
                <div class="not-logged" v-else>
                    Olá, faça seu <br><span @click="this.$router.push('/login')">login</span>
                </div>
            </div>
            <!-- Olá, faça seu <br><span>login</span> -->

            <div class="options" v-if="isDropDownVisible">
                <div class="option" @click="navigateToProfile()">
                    <i class="fa fa-user-circle"></i>
                    Minha conta
                </div>
                <div class="option" @click="logout()">
                    <i class="fa fa-sign-out-alt"></i>
                    Sair
                </div>
            </div>
        </div>

        <div class="cart-header" @click="this.$router.push('/cart')">
            <i class="fa fa-shopping-cart"> <sup>{{ getCartTotalQuantity }}</sup></i>
            <span>
                Carrinho 
            </span>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { logout } from '@/controllers/UserController'

export default {
    name: 'CustomerHeader',
    emits: ['input'],
    components: {
    },
    data() {
        return {
            logo: require('@/assets/images/logo.png'),
            searchText: '',
            isDropDownVisible: false
        }
    },
    methods: {
        ...mapActions(['loadCart']),
        search() {
            this.$router.push({ name: 'search', query: { searchText: this.searchText } })
        },
        showDropdown() {
            if (this.loggedInUser?.id)
                this.isDropDownVisible = true
        },
        hideDropdown() {
            this.isDropDownVisible = false
        },
        async logout() {
            this.$router.push('/')
            await logout()
            window.location.reload()
        },
        getFirstName(name) {
            return name.split(' ')[0]
        },
        navigateToProfile() {
            console.log(this.loggedInUser)
            if (this.loggedInUser?.role === 'customer')
                this.$router.push('/customer-profile')
            else if (this.loggedInUser?.role === 'vendor')
                this.$router.push('/store-registration')
        }
    },
    computed: {
        ...mapGetters(['getCartTotalQuantity', 'getCartProducts', 'loggedInUser'])
    },
    mounted() {
        // update getCartTotalQuantity when cart is updated
        this.loadCart()
    }
}
</script>
<style lang="less">
.customer-header {
    background: #F4F4F4;
    height: 90px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    padding: 0 20px;
    position: fixed;
    z-index: 8;
    top: 0;
    left: 0;
    right: 0;

    img {
        margin-right: 20px;
        cursor: pointer;
    }

    .search {
        display: flex;
        align-items: center;
        background-color: #fff;
        border-radius: 5px;
        box-sizing: border-box;
        border: 1px solid var(--secondaryColor);
        padding: 10px 10px;
        position: relative;
        margin: 20px 20px;

        //sizing
        width: 40vw;
        height: 40px;
        
        input {
            border: none;
            outline: none;
            background-color: transparent;
            font-size: 16px;
            font-family: Gellix;
            width: 100%;
            padding-right: 25px;
        }

        i {
            position: absolute;
            right: 10px;
            color: gray;
        }
    }

    .login-container {
        align-self: center;

        .login {
            margin: 10px 70px;
            color: var(--secondaryColor);
            font-size: 18px;
            font-weight: 500;

            i {
                margin-right: 10px;
            }
            span {
                color: var(--primaryColor);
                cursor: pointer;
            }
        }

        .options {
            position: absolute;
            background: #FFF;
            border-radius: 5px;
            box-shadow: 0px 2px 10px rgba(0,0,0,0.1);
            z-index: 9;
            margin-left: 60px;
            cursor: pointer;

            .option {
                padding: 10px 15px;
                display: flex;
                align-items: center;

                &:hover {
                    background: #F4F4F4;
                }

                i {
                    margin-right: 10px;
                    color: var(--secondaryColor);
                }
            }
        }
    }
    

    .cart-header {
        margin: 10px 0px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--secondaryColor);
        font-size: 18px;
        font-weight: 500;
        cursor: pointer;

        i {
            margin-right: 4px;
        }
    }
}
</style>