<template>
    <div class="customer-order-container">
        <div class="date">
        </div>
        <div class="order-card">
            <div class="order-products">
                <div>
                    <div class="order-product" v-for="product in products" :key="product.id">
                        <div class="product-image">
                            <img :src="product.photo" alt="product image">
                        </div>
                        <div class="product-details">
                            <h3>{{ product.name }}</h3>
                            <p>{{ formatValue(product.price) }} <span>x{{ product.quantity }}</span> <template v-if="product.selectedOption"> - {{ product.selectedOption }}</template></p>
                            <p>Vendido por <b>{{ product.seller }}</b> e entregue por Biznes</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h3 id="policy" @click="showPolicy = !showPolicy" v-if="products.filter(product => product.devolutionPolicy).length > 0">
                        Política(s) de devolução</h3>
                </div>

            </div>

            <div class="separator">
            </div>

            <div class="order-details">
                <div class="details">
                    <div class="detail">
                        <h3>Status</h3>
                        <p>{{ getOrderStatus() }}</p>
                    </div>
                    <div class="detail">
                        <h3>Forma de pagamento</h3>
                        <p> {{ order.paymentMethod }}</p>
                    </div>
                    <div class="detail">
                        <h3>Valor do frete</h3>
                        <p>Grátis</p>
                    </div>
                    <div class="detail">
                        <h3>Endereço de entrega</h3>
                        <p>
                            {{ order.recipientName }} <br>
                            {{ address2text(order.Address) }}</p>
                    </div>
                </div>

                <div class="order-total">
                    <h3>Total</h3>
                    <p>{{ formatValue(order.total) }}</p>
                </div>
            </div>
        </div>

        <ModalComponent :modalOpen="showPolicy" @closeModal="showPolicy = false">
            <!-- politica de devolução de cada produto -->
            <div class="prods-dev-policy">
                <div v-for="policy in devolutionPolicies" :key="policy.seller">
                    <div class="policy">
                        <h3>{{ policy.seller }}</h3>
                        <p>{{ policy.policy }}</p>
                    </div>
                </div>
            </div>
        </ModalComponent>

    </div>
</template>

<script>
import ModalComponent from '../modals/ModalComponent.vue'
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
    name: 'CustomerOrder',
    props: ['order'],
    components: {
        ModalComponent
    },
    data() {
        return {
            products: [],
            showPolicy: false,
            devolutionPolicies: {}
        }
    },
    computed: {
        ...mapGetters(['getProduct', 'getDevolutionPolicy'])
    },
    methods: {
        address2text(address) {
            return `${address.street}, ${address.number} - ${address.complement}, ${address.neighborhood}, ${address.city} - ${address.state}, ${address.cep}`
        },
        formatValue(value) {
            return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        },
        getOrderStatus() {
            const deliveryDate = moment(this.order.deliveryDate)
            const today = moment()
            const diff = deliveryDate.diff(today, 'days')
            if (diff < 0) {
                return 'Entregue'
            } else if (diff <= 3) {
                return 'Em trânsito'
            } else {
                return 'Em preparo'
            }
        },
        fixDate(date) {
            return moment(date).format('DD/MM/YYYY')
        }
    },
    mounted() {
        this.order.TransactionProducts.forEach(product => {
            this.products.push({
                id: product.idProduct,
                photo: product.productPhoto,
                price: product.price,
                name: product.productName,
                seller: product.vendorName,
                quantity: product.quantity,
                selectedOption: product.selectedOption,
                devolutionPolicy: this.getDevolutionPolicy(product.idProduct)
            })
        })
        
        // se todos os produtos forem da mesma loja "product.idVendor", entao a politica de devolucao é a mesma
        // caso contrário, mostra a política de devolução por loja, sendo que a chave é o product.seller
        const policies = {}
        this.products.forEach(product => {
            if (!policies[product.idVendor]) {
                policies[product.idVendor] = {
                    policy: product.devolutionPolicy,
                    seller: product.seller
                }
            }
        })
        this.devolutionPolicies = policies
    },
    
}
</script>

<style lang="less">
.customer-order-container {
    display: flex;
    flex-direction: column;

    .order-card {
        height: auto;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 15px 0;
        padding: 25px;
        border-radius: 5px;
        box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.2);

        .order-products {
            width: 50%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .order-product {
                width: 100%;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: flex-end;
                margin-bottom: 30px;

                .product-image {
                    width: 120px;
                    height: 120px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-right: 20px;

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: contain;
                    }
                }

                .product-details {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: baseline;
                    margin-right: 10px;

                    h3 {
                        font-size: 18px;
                        font-weight: 500;
                        margin-bottom: 5px;
                        text-align: left;
                    }

                    p {
                        font-size: 15px;
                        font-weight: 400;
                        margin-bottom: 5px;
                        text-align: left;

                        span {
                            color: #858586;
                        }

                        b {
                            font-weight: 500;
                        }
                    }
                }
            }

            #policy {
                justify-self: flex-end;
                font-size: 14px;
                font-weight: 500;
                margin-top: 30px;
                color: #858586;
                cursor: pointer;
            }
        }

        .separator {
            border-left: 1px solid #C8C8C8;
            width: 2px;
        }

        .order-details {
            width: 50%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-left: 20px;
            
            .detail {
                width: 100%;
                display: grid;
                grid-template-columns: 1fr 1fr;                

                h3 {
                    text-align: left;
                    font-size: 18px;
                    font-weight: 600;
                }

                p {
                    text-align: right;
                    font-size: 18px;
                    font-weight: 400;
                    color: #858586;
                }
            }

            .order-total {
                width: 100%;
                display: flex;
                flex-direction: row;
                justify-content: space-between;

                h3 {
                    font-size: 22px;
                    font-weight: 600;
                }

                p {
                    font-size: 22px;
                    font-weight: 400;
                }
            }
        }
    }

    #policy {
        font-size: 15px;
        font-weight: 500;
        margin-top: 30px;
        color: #858586;
        text-align: left;
        cursor: pointer;
    }

    .prods-dev-policy {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .policy {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-bottom: 30px;

            h3 {
                font-size: 18px;
                font-weight: 500;
                margin-bottom: 5px;
                text-align: left;
            }

            p {
                font-size: 15px;
                font-weight: 400;
                margin-bottom: 5px;
                text-align: left;
                max-width: 400px;
                text-align: justify;
            }
        }
    }
}
    
</style>