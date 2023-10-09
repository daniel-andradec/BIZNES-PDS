<template>
    <div class="admin-header">
        <img @click="this.$router.push('/admin-panel')" alt="Vue logo" :src="logo">

        <div class="login-container">
            <div class="login">
                <i class="fa fa-gear"></i>
                <span> Biznes ADM </span>
                <span> (admin) </span>
            </div>
            <div class="logout">
                <button class="adm-logout" @click="logout">Sair</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AdminHeader',
    components: {
    },
    data() {
        return {
            logo: require('@/assets/images/logo.png'),
            searchText: '',
            isDropDownVisible: false,
            store: {
                name: 'Fastsell'
            }
        }
    },
    methods: {
    },
    computed: {
    }
}
</script>
<style lang="less">
.admin-header {
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
        margin-right: 40px;

        .login {
            cursor: pointer;
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
        .logout {
            margin-top: 10px;
            display: flex;
            justify-content: flex-end;
            
            button {
                background: none;
                border: none;
                color: #C34343;
                font-size: 20px;
                font-weight: bold;
                cursor: pointer;
            }
        }
    }
}
</style>