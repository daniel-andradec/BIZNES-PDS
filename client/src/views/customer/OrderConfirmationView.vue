<template>
    <div class="order-confirmation-container">
        <div class="header">
            <CustomerHeader />
        </div>
        <CategoryMenu />

        <div v-if="this.getOrderData?.products.length > 0">
            <div class="list-header">
                <div class="select-categories">
                    <i class="fas fa-bars" @click="toggleCategoryMenu"></i>
                    <h1>Pedido realizado!</h1>
                </div>
            </div>
            
            <div class="info">
                <p>Olá, {{ consumerName }}! 
                    Obrigado por comprar conosco. Seu pedido será enviado em breve. Para ver os detalhes do pedido
                    ou política de devolução, acesse 
                    <span @click="this.$router.push('/customer-profile')">
                        Minha Conta > Pedidos.
                    </span>
                </p>
            </div>
    
            <div class="order-summary">
                <h1>Resumo do pedido</h1>
    
                <div class="summary-container">
                    <div class="order-products">
                        <div class="order-prod" v-for="(prod, key) in getOrderData.products" :key="key">
                            <OrderProductCard :key="prod.id" :product="prod" :fixSize="true" :quantity="prod.quantity" @click="goToProduct(prod)" />
                        </div>
                    </div>
    
                    <div class="order-data"> Valor Total: <span>{{ formatValue(getOrderData.totalPrice) }}</span></div>
                    <div class="order-data">Forma de pagamento: {{ getOrderData.paymentMethod }}</div>
                    <div class="order-data">Seu pedido chegará em <span>{{ getOrderData.deliveryDate }}</span> com frete grátis</div>
    
                </div>
            </div>
        </div>
        <div v-else>
            <div class="list-header">
                <div class="select-categories">
                    <i class="fas fa-bars" @click="toggleCategoryMenu"></i>
                </div>
                <h1>Ops! Parece que não há pedidos para serem mostrados.</h1>
            </div>
            
            <div class="info">
                <p>Olá, {{ consumerName }}! 
                    Para ver seus pedidos ou política de devolução, acesse 
                    <span @click="this.$router.push('/customer-profile')">
                        Minha Conta > Pedidos.
                    </span>
                </p>
            </div>
        </div>

        <div class="other-products">
            <h2>Outros usuários também compraram</h2>
            <div class="list" v-if="Object.values(getBestSellers).length > 0">
                <div class="list-item" v-for="(product, key) in getBestSellers" :key="key" @click="goToProduct(product)">
                    <ProductCard :key="product.id" :product="product" :fixSize="true" />
                </div>
                    
                <span @click="this.$router.push('/')">Outros produtos</span>
            </div>

            <div class="list" v-else>
                <!-- Produtos mais vendidos -->
                <div class="list-item" v-for="(product, key) in this.$store.getters.getBestSellers" :key="key" @click="goToProduct(product)">
                    <ProductCard :key="product.id" :product="product" :fixSize="true" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CustomerHeader from '@/components/headers/CustomerHeader.vue'
import CategoryMenu from '@/components/menus/CategoryMenu.vue'
import OrderProductCard from '@/components/products/OrderProductCard.vue'
import ProductCard from '@/components/products/ProductCard.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'OrderConfirmationView',
    components: {
        CustomerHeader,
        CategoryMenu,
        OrderProductCard,
        ProductCard
    },
    data() {
        return {
            consumerName: 'Pedro',
        }
    },
    computed: {
        ...mapGetters(['getOrderData', 'getBestSellers'])
    },
    methods: {
        ...mapActions(['toggleCategoryMenu']),
        formatValue(value) {
            return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        },
        goToProduct(product) {
            this.$router.push({ name: 'product', params: { id: product.id } })
        }
    },
    mounted() {
    },
    
}
</script>

<style lang="less">
.order-confirmation-container {
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
            i {
                color: var(--secondaryColor);
                font-size: 25px;
            }
            h1 {
                font-weight: 500;
                font-size: 30px;
                text-align: left;
                margin-left: 20px;
            }
        }
    }

    .info {
        margin: 0 50px;
        p {
            font-size: 25px;
            line-height: 30px;
            text-align: left;

            span {
                font-weight: 500;
                cursor: pointer;
            }
        }
    }

    .order-summary {
        margin: 50px 50px 50px 50px;
        h1 {
            font-weight: 500;
            font-size: 30px;
            text-align: left;
        }

        .summary-container {
            background: rgba(0, 0, 0, 0.05);
            border-radius: 10px;
            box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.05);
            margin-top: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            .order-products {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                flex-wrap: wrap;
                margin: 20px 0px 30px 0px;
                width: 100%;

                .order-prod {
                    margin: 0 10px;

                }
            }

            .order-data {
                font-size: 25px;
                margin: 10px 0;

                span {
                    font-weight: 600;
                }

                &:last-child {
                    margin-bottom: 30px;
                }
            }
            
        }
    }

    .other-products {
        margin-bottom: 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        // margin-left: 50px;
        gap: 20px;

        h2 {
            font-size: 30px;
            font-weight: 500;
        }

        .list {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            // max 4 products in the row
            flex-wrap: wrap;
            gap: 20px;

            span {
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 25px;
                font-weight: 600;
                color: var(--primaryColor);
                cursor: pointer;
            }
        }

        .list-item {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            gap: 20px;
            margin-top: 20px;
            max-width: 100%;
        }
    }
    
}
    
</style>