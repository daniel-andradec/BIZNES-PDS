<template>
    <div class="sale-modal">
        <ModalComponent :modalOpen="modalOpen" @closeModal="closeModal">
            <h2>
                Pedido Nº: {{ sale.id }}
            </h2>

            <div class="sale-details">
                <div class="info">
                    <div class="left">
                        <h2>Data: <span>{{ sale.date }}</span></h2>
                        <h2>Entrega Prevista: <span>{{sale.deliveryDate }}</span></h2>
                        <h2>Forma de Pagamento: <span>{{ sale.paymentMethod }}</span></h2>
                    </div>
                    <div class="right">
                        <h2>Endereço de entrega</h2>
                        <span>
                            {{ sale.deliveryAddress?.recipient }} <br>
                            {{ sale.deliveryAddress?.street }}, {{ sale.deliveryAddress?.number }} - {{ sale.deliveryAddress?.complement }} -
                            {{ sale.deliveryAddress?.neighborhood }}, 
                            {{ sale.deliveryAddress?.city }} - {{ sale.deliveryAddress?.state }} <br>
                            {{ sale.deliveryAddress?.zipCode }}
                        </span>
                    </div>
                </div>

                <div class="items">
                    <h1>Itens do pedido</h1>
                    <div class="sale-list">
                        <div class="sale-list-header">
                            <div class="header-item" v-for="(field, fkey) in listFields" :key="fkey">
                                <h2>{{ field }}</h2>
                            </div>
                        </div>
                        <div class="sale-products">
                            <div class="sale-prod" v-for="(prod, pkey) in productsList" :key="pkey">
                                <div class="prod-info">
                                    <img :src="prod.img" alt="product">
                                    <h2>{{ prod.name }}</h2>
                                </div>
                                <h2>{{ prod.quantity }}</h2>
                                <h2>{{ formatValue(getProductTotal(prod)) }}</h2>
                                <h2> {{ prod.option?.join(', ') }}</h2>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="sale-total">
                    <h2>Total: {{ formatValue(sale.total) }}</h2>
                </div>
            </div>
        </ModalComponent>
        
    </div>
</template>

<script>
import ModalComponent from '../ModalComponent.vue'

import { mapGetters } from 'vuex'

/**sale
 * {
                id: 11,
                customer: 'Lucas Martins',
                date: '09/08/2023',
                total: 650.00,
                city: 'Florianópolis',
                deliveryDate: '12/08/2023',
                paymentMethod: 'Cartão de Débito',
                deliveryAddress: {
                    recipient: 'Ricardo Pereira',
                    street: 'Av. K',
                    city: 'Florianópolis',
                    state: 'Santa Catarina',
                    complement: 'Apto 10',
                    number: '1010',
                    zipCode: '30350230'
                },
                products: [
                    { id: 1, quantity: 3 },
                    { id: 2, quantity: 2 }
                ]
            }
 */

export default {
    name: 'SaleModal',
    components: {
        ModalComponent
    },
    props: ['modalOpen', 'sale'],
    data() {
        return {
            productsList: [],
            listFields: ['Produto', 'Quantidade', 'Total', 'Opções']
        }
    },
    methods: {
        closeModal() {
            this.$emit('closeModal')
        },
        getProductTotal(product) {
            return product.price * product.quantity
        },
        formatValue(value) {
            if (value)
                return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        },
    },
    computed: {
        ...mapGetters(['getProduct'])
    },
    mounted() {
        this.productsList = this.sale.products?.map((prod) => {
            return {
                ...this.getProduct(prod.id),
                quantity: prod.quantity,
                option: prod.option
            }
        })
    },
    watch: {
        modalOpen() {
            if (this.modalOpen) {
                this.productsList = this.sale.products.map((prod) => {
                    return {
                        ...this.getProduct(prod.id),
                        quantity: prod.quantity,
                        option: prod.option
                    }
                })
            }
        }
    }
    
}
</script>

<style lang="less">
.sale-modal {   
    h2 {
        font-size: 18px;
        font-weight: 500;
    }

    span {
        font-weight: 400;
        color: #858586;
    }

    .sale-details {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .info {
            display: flex;
            flex-direction: row;
            text-align: left;

            .left {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: flex-start;
                margin-right: 50px;
            }

            .right {
                display: flex;
                flex-direction: column;
                align-items: flex;
                justify-content: flex-start;
                max-width: 350px;
                word-break: break-word;
                text-align: right;

                span {
                    font-size: 18px;
                }
            }
        }
    }

    .items {
        display: flex;
        flex-direction: column;
        margin-top: 30px;
        width: 100%;
        max-width: 800px;

        h1 {
            font-size: 22px;
            font-weight: 500;
            margin-bottom: 20px;
            text-align: left;
            align-self: flex-start;
        }

        .sale-list {
            width: 100%;
            display: flex;
            flex-direction: column;
            max-height: 300px;
            overflow-y: auto;

            .sale-list-header {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 10px;
                align-items: center;
                padding: 10px;

                h2 {
                    font-size: 18px;
                    font-weight: 500;
                }
            }

            .sale-products {
                display: flex;
                flex-direction: column;

                .sale-prod {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 10px;
                    align-items: center;
                    padding: 10px;
                    border-bottom: 1px solid #ccc;
                    text-align: center;
                    margin-bottom: 20px;

                    .prod-info {
                        display: flex;
                        align-items: center;
                        justify-content: center;

                        img {
                            width: 70px;
                            height: 70px;
                            display: flex;
                            object-fit: contain;
                            margin-right: 10px;
                        }
                    }


                    h2 {
                        font-size: 16px;
                        font-weight: 500;
                        text-align: center;
                    }
                }
            }
        }
    }

    .sale-total {
        display: flex;
        flex-direction: row;
        align-self: flex-end;
        margin-right: 15px;

        h2 {
            font-size: 24px;
            font-weight: 500;
        }
    }
}
</style>