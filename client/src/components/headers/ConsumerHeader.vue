<template>
    <div class="consumer-header">
        <img @click="this.$router.push('/')" alt="Vue logo" :src="logo">

        <div class="search">
            <input type="text" placeholder="Buscar no Biznes" v-model="searchText" @keyup.enter="search()"/>
            <i class="fa fa-search icon" @click="search()"></i>
        </div>

        <div class="login-container" @mouseover="showDropdown" @mouseleave="hideDropdown">
            <div class="login">
                <i class="fa-regular fa-user"></i>
                Olá, <span>Pedro</span>
            </div>
            <!-- Olá, faça seu <br><span>login</span> -->

            <div class="options" v-if="isDropDownVisible">
                <div class="option">
                    <i class="fa fa-user-circle"></i>
                    Minha conta
                </div>
                <div class="option">
                    <i class="fa fa-sign-out-alt"></i>
                    Sair
                </div>
            </div>
        </div>

        <div class="cart">
            <i class="fa fa-shopping-cart"></i>
            <span>
                Ir para <br> o carrinho
            </span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ConsumerHeader',
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
        search() {
            this.$router.push({ name: 'search', query: { searchText: this.searchText } })
        },
        showDropdown() {
            this.isDropDownVisible = true
        },
        hideDropdown() {
            this.isDropDownVisible = false
        }
    }
}
</script>
<style lang="less">
.consumer-header {
    background: #F4F4F4;
    height: 90px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    padding: 0 20px;
    position: fixed;
    z-index: 999;
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
            }
        }

        .options {
            position: absolute;
            background: #FFF;
            border-radius: 5px;
            box-shadow: 0px 2px 10px rgba(0,0,0,0.1);
            z-index: 9;
            margin-left: 60px;

            .option {
                padding: 10px 15px;
                display: flex;
                align-items: center;
                cursor: pointer;

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
    

    .cart {
        margin: 10px 0px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        color: var(--secondaryColor);
        font-size: 18px;
        font-weight: 500;

        span {
            margin-left: 10px;
        }
    }
}
</style>