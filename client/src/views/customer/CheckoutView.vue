<template>
    <div class="checkout-view">
        <div class="header">
            <CheckoutHeader />
        </div>
        
        <div class="checkout" v-if="Object.values(getCartProducts).length > 0">
            <div class="checkout-details">
                <h1>Endereço de Entrega</h1>
                <div class="delivery-address">
                    <div class="address-info">
                        <p>Pedro Henrique Santos</p>
                        <p>Rua Sergipe, 1014- 7º e 8º andar</p>
                        <p>Belo Horizonte, MG</p>
                        <p>30130-171</p>
                    </div>
                    <button @click="changeAddressModalOpen = true">Alterar</button>
                </div>

                <h1>Envio</h1>
                <div class="shipping-info">
                    <i class="fas fa-truck"></i>
                    <p>Receba o pedido em {{ deliveryDate() }} - <span>Grátis</span> </p>
                </div>
                
                <h1>Forma de Pagamento</h1>
                <div class="payment-method">
                    <div class="payment-options">
                        <label>
                            <input type="radio" name="payment" value="pix" v-model="selectedPayment" />
                            <i class="fab fa-pix"></i>
                            <p>Pix <span>- Aprovação imediata</span></p>
                        </label>
                        <label>
                            <input type="radio" name="payment" value="card" v-model="selectedPayment" />
                            <i class="fas fa-credit-card"></i>
                            <p>Cartão de Crédito</p>
                        </label>

                        <div class="card-details" v-if="selectedPayment === 'card'">
                            <label v-for="(input, ikey) in cardInputs" :key="ikey">
                                <input type="text" :value="formatCardValue(input.value, input.format)" :placeholder="input.label" @input="input.value = $event.target.value" />
                            </label>
                            <div class="installments">
                                <label>
                                    <select v-model="installments">
                                        <option v-for="(option, key) in installmentsOptions" :key="key" :value="option.value" v-text="option.label + ' de ' + formatValue(calculateTotalPrice() / option.value) + ' sem juros'"></option>
                                    </select>
                                </label>
                            </div>
                        </div>

                        <label>
                            <input type="radio" name="payment" value="boleto" v-model="selectedPayment" />
                            <i class="fas fa-barcode"></i>
                            <p>Boleto</p>
                        </label>
                    </div>
                </div>
            </div>

            <div class="summary">
                <h1>Resumo do pedido</h1>
                <div class="product-sum">
                    <h2 v-text="calculateTotalQuantity() + ' produtos'"></h2>
                    <h2 v-text="formatValue(calculateTotalPrice())"></h2>
                </div>
                <div class="shipping">
                    <h2>Frete</h2>
                    <h2>Grátis</h2>
                </div>
                <div class="separator"></div>
                <div class="total">
                    <h2 v-text="formatValue(calculateTotalPrice())"></h2>
                    <p>em até 10x {{ formatValue(calculateTotalPrice() / 10) }} sem juros </p>
                </div>

                <div class="checkout">
                    <button @click="checkout">Finalizar compra</button>
                </div>
            </div>
        </div>

        <ChangeAddressModal :modalOpen="changeAddressModalOpen" @closeModal="changeAddressModalOpen = false" @updateAddress="updateAddress"  />
    </div>
</template>

<script>
import CheckoutHeader from '@/components/headers/CheckoutHeader.vue';
import ChangeAddressModal from '@/components/modals/customer/ChangeAddressModal.vue';
import { mapGetters, mapActions } from 'vuex'

export default {
    name: "CheckoutView",
    components: {
        CheckoutHeader,
        ChangeAddressModal
    },
    data() {
        return {
            selectedPayment: '',
            cardInputs: [
                { label: 'Número do cartão', value: '', format: 'cardNumber' },
                { label: 'Nome do titular', value: '', format: '' },
                { label: 'Validade (MM/AA)', value: '', format: 'MM/AA' },
                { label: 'CVV', value: '', format: 'XXX' },
            ],
            installmentsOptions: [
                { value: 1, label: '1x' },
                { value: 2, label: '2x' },
                { value: 3, label: '3x' },
                { value: 4, label: '4x' },
                { value: 5, label: '5x' },
                { value: 6, label: '6x' },
                { value: 7, label: '7x' },
                { value: 8, label: '8x' },
                { value: 9, label: '9x' },
                { value: 10, label: '10x' },
            ],
            installments: 1,
            changeAddressModalOpen: false
        }
    },
    computed: {
        ...mapGetters(['getCartProducts', 'clearCart']),
    },
    methods: {
        ...mapActions(['setOrderData']),
        formatValue(value) {
            return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        },
        calculateTotalQuantity() {
            return this.getCartProducts.reduce((acc, product) => acc + product.quantity, 0)
        },
        calculateTotalPrice() {
            return this.getCartProducts.reduce((acc, product) => acc + (product.price * product.quantity), 0)
        },
        deliveryDate() {
            const today = new Date()
            const deliveryDate = new Date(today.setDate(today.getDate() + 5))
            return deliveryDate.toLocaleDateString('pt-br')
        },
        formatCardValue (value, format) {
            if (!value) return ''
            value = value.toString()
            if (format === 'MM/AA') {
                return value.replace(/(\d{2})(\d{2})/, '$1/$2').substring(0, 5)
            }
            if (format === 'XXX') {
                return value.replace(/(\d{3})(\d{1})/, '$1 $2').substring(0, 3)
            }
            if (format === 'cardNumber') {
                const newVal = value.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4')
                return newVal.substring(0, 19)
            }
            return value
        },
        selectedPaymentString() {
            if (this.selectedPayment === 'pix') return 'Pix'
            if (this.selectedPayment === 'card') return 'Cartão de Crédito'
            if (this.selectedPayment === 'boleto') return 'Boleto'
            return ''
        },
        checkout() {
            // check if there is a selected payment method
            if (!this.selectedPayment) {
                this.$toast.open({
                    message: 'Selecione uma forma de pagamento',
                    type: 'warning',
                    duration: 5000,
                    position: 'top-right'
                })

                return
            }
            
            // card inputs
            console.log(this.cardInputs.map(input => input.value))

            // save order
            // todo

            // set order data
            const data = {
                products: this.getCartProducts,
                totalPrice: this.calculateTotalPrice(),
                deliveryDate: this.deliveryDate(),
                paymentMethod: this.selectedPaymentString(),
            }
            this.setOrderData(data)


            // clear cart - if order saving is successful
            // this.clearCart() // not going to clear cart for now because we are building other features

            // redirect to order success page
            this.$router.push('/order-confirmation')
        },
        updateAddress (address) {
            this.changeAddressModalOpen = false
            console.log(address)
        }
    },
}
</script>

<style lang="less">
.checkout-view {
    .header {
        padding-bottom: 50px;
    }
    .checkout {
        margin-top: 50px;
        display: flex;
        justify-content: space-evenly;

        .checkout-details {
            width: 40vw;
            padding: 30px;
            border-radius: 5px;
            border: 1px solid rgba(0, 0, 0, 0.18);
            box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

            h1 {
                font-size: 25px;
                margin: 40px 0px 10px 0px;
                text-align: left;
                font-weight: 500;

                &:first-child {
                    margin-top: 0px;
                }
            }

            .delivery-address {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;

                .address-info {
                    width: 80%;
                    margin-right: 20px;

                    p {
                        margin: 0px;
                        font-size: 18px;
                        text-align: left;
                    }
                }

                button {
                    border: none;
                    background-color: #fff;
                    color: var(--primaryColor);
                    font-weight: 600;
                    cursor: pointer;
                }
            }

            .shipping-info {
                text-align: left;
                display: flex;
                align-items: center;
                font-size: 18px;

                i {
                    margin-right: 10px;
                    color: var(--secondaryColor);
                }
            }

            .payment-method {
                font-size: 18px;

                .payment-options {
                    label {
                        display: flex;
                        align-items: center;
                        margin-bottom: 10px;

                        input {
                            margin-right: 10px;
                        }

                        i {
                            margin-right: 10px;
                            color: #15261b;
                        }

                        span {
                            color: var(--secondaryColor);
                            font-size: 14px;
                        }
                    }
                }
            }
        }

        .card-details {
            display: flex;
            margin-top: 20px;
            flex-wrap: wrap;
            justify-content: center;

            label {
                margin-bottom: 10px;

                input {
                    width: 180px;
                    height: 40px;
                    border-radius: 5px;
                    border: 1px solid rgba(0, 0, 0, 0.18);
                    padding: 0px 10px;
                    font-size: 16px;
                    font-weight: 500;
                }
            }
            
            .installments {
                select {
                    height: 42px;
                    border-radius: 5px;
                    border: 1px solid rgba(0, 0, 0, 0.18);
                    padding: 0px 10px;
                    font-size: 16px;
                    font-weight: 500;
                }
            }
        }


        .summary {
            width: 30vw;
            height: fit-content;
            border-radius: 5px;
            border: 1px solid rgba(0, 0, 0, 0.18);
            box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

            h1 {
                font-weight: 500;
                font-size: 25px;
                text-align: left;
                margin: 30px 0px 20px 50px;
            }

            .product-sum {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin: 0px 50px;
                padding: 10px 0px;

                h2 {
                    font-size: 20px;
                    font-weight: 500;
                }
            }

            .shipping {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin: 0px 50px;
                padding: 10px 0px;

                h2 {
                    font-size: 20px;
                    font-weight: 500;
                }
            }

            .separator {
                margin: 0px 50px;
                border-bottom: 2px solid rgba(0, 0, 0, 0.18);
            }

            .total {
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                margin: 0px 50px 80px 50px;

                h2 {
                    margin-top: 50px;
                    font-size: 22px;
                    font-weight: 600;
                }

                p {
                    margin: 0px;
                    font-size: 16px;
                    font-weight: 500;
                }
            }

            .checkout {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin: 30px 50px;
                padding: 10px 0px;

                button {
                    width: 100%;
                    height: 50px;
                    border-radius: 5px;
                    background: var(--primaryColor);
                    color: white;
                    font-size: 18px;
                    font-weight: 600;
                    border: none;
                    cursor: pointer;
                    font-family: Gellix;
                }

                .choose {
                    background: white;
                    color: var(--primaryColor);
                    border: none;
                    margin-top: 20px;
                    font-weight: 600;
                    font-family: Gellix;
                }
            }
        }
    }
}
</style>
