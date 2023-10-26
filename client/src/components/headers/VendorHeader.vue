<template>
    <div class="vendor-header">
        <img @click="this.$router.push('/vendor-panel')" alt="Vue logo" :src="logo">

        <div class="login-container" @mouseover="showDropdown" @mouseleave="hideDropdown">
            <div class="login" @click="this.$router.push('/store-registration')">
                <i class="fa-solid fa-store"></i>
                <span>{{ getVendorData?.fantasyName }}</span>
            </div>
            <!-- Olá, faça seu <br><span>login</span> -->

            <div class="options" v-if="isDropDownVisible">
                <div class="option" @click="this.$router.push('/store-registration')">
                    <i class="fa fa-gear"></i>
                    Cadastro da Loja
                </div>
                <div class="option" @click="logout()">
                    <i class="fa fa-sign-out-alt"></i>
                    Sair
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { logout } from '@/controllers/UserController'
import { mapGetters } from 'vuex'
import { getVendorData } from '@/controllers/VendorController'

export default {
    name: 'VendorHeader',
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
        showDropdown() {
            this.isDropDownVisible = true
        },
        hideDropdown() {
            this.isDropDownVisible = false
        },
        async logout () {
            await logout()
            this.$router.push('/login')
        }
    },
    computed: {
        ...mapGetters(['loggedInUser', 'getVendorData'])
    },
    async mounted() {
        if (!this.getVendorData?.fantasyName) {
            console.log('getVendorData')
            await getVendorData()
        }
    }
}
</script>
<style lang="less">
.vendor-header {
    background: #F4F4F4;
    height: 90px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 20px;
    position: fixed;
    z-index: 8;
    top: 0;
    left: 0;
    right: 0;

    img {
        margin-left: 20px;
        cursor: pointer;
    }

    .login-container {
        align-self: center;
        margin-right: 20px;

        .login {
            cursor: pointer;
            margin: 10px 70px;
            color: var(--secondaryColor);
            font-size: 25px;
            font-weight: 500;

            i {
                margin-right: 10px;
            }
            span {
                color: var(--primaryColor);
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
}
</style>