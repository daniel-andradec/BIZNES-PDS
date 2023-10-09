<template>
    <div class="admin-panel-view">
        <div class="header">
            <AdminHeader />
        </div>
        
        <div class="admin-panel">
            <h1>Painel de Administrador</h1>
        </div>

        <div class="choose-tab">
            <div class="options">
                <div class="tab-option" :class="{ 'selected': currentTab === 'users' }" @click="currentTab = 'users'">
                    <i class="fa-solid fa-user"></i>
                    <h2>Usuários</h2>
                </div>
                <div id="separator"></div>
                <div class="tab-option" :class="{ 'selected': currentTab === 'stores' }" @click="currentTab = 'stores'">
                    <i class="fa-solid fa-store"></i>
                    <h2>Lojas</h2>
                </div>
            </div>
        </div>

        <div class="search">
            <input type="text" 
            :placeholder="currentTab === 'users' ? 'Pesquisar Usuários' : 'Pesquisar Lojas'" 
            v-model="searchText" @input="search()"/>
            <i class="fa fa-search icon" @click="search()"></i>
        </div>

        <div class="users" v-if="currentTab === 'users'">
            <ManageCustomer :searchText="searchUser"/>
        </div>

        <div class="stores" v-else>
            <ManageVendor :searchText="searchStore"/>
        </div>
    </div>
</template>

<script>
import AdminHeader from '@/components/headers/AdminHeader.vue'
import ManageCustomer from '@/components/admin/ManageCustomer.vue'
import ManageVendor from '@/components/admin/ManageVendor.vue'

export default {
    name: 'AdminPanelView',
    components: {
        AdminHeader,
        ManageCustomer,
        ManageVendor
    },
    data() {
        return {
            currentTab: 'users',
            searchText: '',
            searchUser: '',
            searchStore: ''
        }
    },
    methods: {
        search () {
            if (this.currentTab === 'users') {
                this.searchUser = this.searchText
            } else {
                this.searchStore = this.searchText
            }
        }
    },
    computed: {
    },
    mounted() {   
    }
}
</script>

<style lang="less">
.admin-panel-view {
    .admin-panel {
        margin-top: 80px;
        margin-bottom: 20px;

        h1 {
            font-weight: 500;
            font-size: 30px;
            text-align: left;
            margin-left: 50px;
        }
    }

    .choose-tab {
        display: flex;
        justify-content: center;
        align-items: center;

        .options {
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid #C8C8C8;
            border-radius: 5px;
            text-align: center;

            #separator {
                border-left: 1px solid #C8C8C8;
                height: 50px;
            }

            .tab-option {
                display: flex;
                align-items: baseline;
                justify-content: center;
                margin: 0 50px;
                cursor: pointer;
                color: #0f0f0fd3;
    
                i {
                    font-size: 25px;
                    margin-right: 10px;
                }
    
                h2 {
                    font-size: 25px;
                    font-weight: 500;
                }

                &.selected {
                    color: var(--primaryColor);
                }
            }
        }
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
        margin: 20px 0 0 50px;

        //sizing
        width: 20vw;
        height: 40px;
        
        input {
            border: none;
            outline: none;
            background-color: transparent;
            font-size: 18px;
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
}
</style>