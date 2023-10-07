<template>
    <div class="customer-profile-view">
        <div class="header">
            <CustomerHeader />
        </div>

        <CategoryMenu />

        <div class="list-header">
            <div class="select-categories">
                <i class="fas fa-bars" @click="toggleCategoryMenu"></i>
            </div>
            <h1>Sua conta</h1>
        </div>
        
        <div class="choose-tab">
            <div class="options">
                <div class="tab-option" :class="{ 'selected': currentTab === 'profile' }" @click="currentTab = 'profile'">
                    <i class="fa-solid fa-truck-fast"></i>
                    <h2>Pedidos</h2>
                </div>
                <div id="separator"></div>
                <div class="tab-option" :class="{ 'selected': currentTab === 'register' }" @click="currentTab = 'register'">
                    <i class="fa-regular fa-user"></i>
                    <h2>Cadastro</h2>
                </div>
            </div>
        </div>

        <div class="customer-orders" v-if="currentTab === 'profile'">
            <div v-if="Object.values(getCustomerOrders).length > 0">
                <div class="list">
                    <div class="list-item" v-for="(order, key) in getCustomerOrders" :key="key">
                        <CustomerOrder :key="order.id" :order="order" />
                    </div>
                </div>
            </div>
            <div v-else class="no-orders">
                <h2>Você ainda não realizou pedidos no Biznes. Aqui você encontra tudo, dê uma olhadinha nas categorias :)</h2>
                <BestSellersList />
            </div>
        </div>

        <div class="customer-register" v-else>
            <CustomerProfileReg />
        </div>

    </div>
</template>

<script>
import CustomerHeader from '@/components/headers/CustomerHeader.vue'
import CategoryMenu from '@/components/menus/CategoryMenu.vue'
import BestSellersList from '@/components/lists/BestSellersList.vue'
import CustomerOrder from '@/components/customer/CustomerOrder.vue'
import CustomerProfileReg from '@/components/customer/CustomerProfileReg.vue'

import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'CustomerProfileView',
    components: {
        CustomerHeader,
        CategoryMenu,
        BestSellersList,
        CustomerOrder,
        CustomerProfileReg
    },
    data() {
        return {
            consumerName: 'Pedro',
            currentTab: 'profile'
        }
    },
    computed: {
        ...mapGetters(['getCustomerOrders'])
    },
    methods: {
        ...mapActions(['toggleCategoryMenu'])
    },
    mounted() {
        console.log(this.getCustomerOrders)
        window.scrollTo(0, 0)
    },
    
}
</script>

<style lang="less">
.customer-profile-view {
    .header {
        padding-bottom: 50px;
    }
        
    .list-header {
        padding-top: 30px;
        margin-bottom: 20px;

        .select-categories {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            align-items: center;
            margin: 48px 50px 20px 50px;
            color: var(--secondaryColor);
            i {
                font-size: 25px;
            }
        }

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

    .customer-orders {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .list {
            padding: 0px 100px;

            .list-item {
                margin-bottom: 30px;
            }
        }

        .no-orders {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 20px;

            h2 {
                font-size: 25px;
                font-weight: 500;
                text-align: center;
            }
        }
    }
}
</style>