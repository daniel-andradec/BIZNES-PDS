<template>
    <div class="checkout-view">
        <div class="header">
            <CheckoutHeader />
        </div>
        
        <div class="checkout" v-if="Object.values(checkoutProducts).length > 0">
            <div class="checkout-details">
                <h1>Endereço de Entrega</h1>
                <div class="delivery-address">
                    <div class="address-info" v-if="Object.keys(address).length > 0">
                        <p>{{ address.recipient }}</p>
                        <p>{{ address.street }}, {{ address.number }} - {{ address.complement }}</p>
                        <p>{{ address.city }}, {{ address.state }}</p>
                        <p>{{ address.cep }}</p>
                    </div>
                    <div v-else>
                        <p>Nenhum endereço cadastrado</p>
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

        <div class="no-items" v-else>
            <div class="list-header">
                <div class="select-categories">
                    <i class="fas fa-bars" @click="toggleCategoryMenu"></i>
                </div>
                <h1>Ops! Parece que não há itens no carrinho.</h1>
            </div>
            
            <div class="info">
                <p>
                    Para adicionar produtos ao carrinho, acesse nossa
                    <span @click="this.$router.push('/')">
                        página principal,
                    </span>
                    ou navegue pelas categorias no menu lateral.
                </p>
            </div>
        </div>

        <ChangeAddressModal :modalOpen="changeAddressModalOpen" @closeModal="changeAddressModalOpen = false" @updateAddress="updateAddress"  />
        <CategoryMenu />
    </div>
</template>

<script>
import CheckoutHeader from '@/components/headers/CheckoutHeader.vue';
import CategoryMenu from '@/components/menus/CategoryMenu.vue';
import ChangeAddressModal from '@/components/modals/customer/ChangeAddressModal.vue';
import { mapGetters, mapActions } from 'vuex'
import { getCustomerAddress } from '@/controllers/CustomerController';
import moment from 'moment';
import { createTransaction } from '@/controllers/TransactionController';

export default {
    name: "CheckoutView",
    components: {
        CheckoutHeader,
        ChangeAddressModal,
        CategoryMenu
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
            changeAddressModalOpen: false,
            address: {},
            checkoutProducts: []
        }
    },
    computed: {
        ...mapGetters(['getCartProducts', 'loggedInUser']),
    },
    methods: {
        ...mapActions(['setOrderData', 'clearCart', 'toggleCategoryMenu']),
        formatValue(value) {
            return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        },
        calculateTotalQuantity() {
            return this.checkoutProducts.reduce((acc, product) => acc + product.quantity, 0)
        },
        calculateTotalPrice() {
            return this.checkoutProducts.reduce((acc, product) => acc + (product.price * product.quantity), 0)
        },
        deliveryDate() {
            const deliveryDate = moment().add(5, 'days').toDate()
            return deliveryDate.toLocaleDateString('pt-br')
        },
        formatCardValue (value, format) {
            if (!value) return ''
            value = value.toString()
            if (format === 'MM/AA') {
                value = value.replace(/\D/g, '')
                value = value.replace(/(\d{2})(\d{2})/, '$1/$2')

                if (value.length > 5) {
                    value = value.slice(0, 5)
                }

                return value
            }
            if (format === 'XXX') {
                return value.replace(/(\d{3})(\d{1})/, '$1 $2').substring(0, 3)
            }
            if (format === 'cardNumber') {
                value = value.replace(/\D/g, '')
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
        async checkout() {
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
            // check if all card inputs are filled
            if (this.selectedPayment === 'card') {
                const emptyInputs = this.cardInputs.filter(input => !input.value)
                if (emptyInputs.length > 0) {
                    this.$toast.open({
                        message: 'Preencha todos os campos do cartão',
                        type: 'warning',
                        duration: 5000,
                        position: 'top-right'
                    })
                    return
                }
            }
            console.log(this.cardInputs.map(input => input.value))

            // save order
            await this.saveOrder()
        },
        async saveOrder () {
            const transactionInfo = {
                idUser: this.loggedInUser.id,
                date: moment().format('YYYY-MM-DD'),
                deliveryDate: moment().add(5, 'days').format('YYYY-MM-DD'),
                paymentMethod: this.selectedPaymentString(),
                recipientName: this.address.recipient,
                shippingCost: 0,
                total: this.calculateTotalPrice(),
            }

            // delivery address
            const deliveryAddress = {
                street: this.address.street,
                number: this.address.number,
                complement: this.address.complement,
                city: this.address.city,
                state: this.address.state,
                cep: this.address.cep,
                neighborhood: this.address.neighborhood
            }

            // transaction products
            const transactionProducts = this.checkoutProducts.map(product => {
                return {
                    idProduct: product.idProduct,
                    quantity: product.quantity,
                    selectedOption: product.selectedOption
                }
            })

            const payload = {
                transaction: transactionInfo,
                address: deliveryAddress,
                transactionProducts
            }

            await createTransaction(payload).then((res) => {
                if (res.status === 201) {
                    this.concludeOrder()
                } else {
                    this.$toast.open({
                        message: 'Erro ao realizar pedido. Tente novamente mais tarde',
                        type: 'error',
                        duration: 5000,
                        position: 'top-right'
                    })
                }
            })
            .catch((err) => {
                console.log(err)
                this.$toast.open({
                    message: 'Erro ao realizar pedido. Tente novamente mais tarde',
                    type: 'error',
                    duration: 5000,
                    position: 'top-right'
                })
            })
        },
        concludeOrder () {
            this.$toast.open({
                message: 'Pedido realizado com sucesso!',
                type: 'success',
                duration: 5000,
                position: 'top-right'
            })

            const data = {
                products: this.checkoutProducts,
                totalPrice: this.calculateTotalPrice(),
                deliveryDate: this.deliveryDate(),
                paymentMethod: this.selectedPaymentString(),
            }
            this.setOrderData(data)

            // clear cart - if order saving is successful and there is no direct transaction
            if (!localStorage.getItem('directTransacProduct'))
                this.clearCart()

            // clear direct transaction product
            localStorage.removeItem('directTransacProduct')

            // redirect to order success page
            this.$router.push('/order-confirmation')
        },
        updateAddress (address) {
            this.changeAddressModalOpen = false
            this.address = address
        }
    },
    async mounted () {
        await getCustomerAddress().then(res => {
            if (!res?.data) return
            this.address = res.data
            this.address.recipient = this.loggedInUser.name
        })

        // check if there is a direct order
        const product = localStorage.getItem('directTransacProduct')
        if (product) {
            const productObj = JSON.parse(product)
            this.checkoutProducts.push(productObj)
        }
        else {
            this.checkoutProducts = this.getCartProducts
        }

        console.log(this.checkoutProducts)
    }
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
            min-width: 450px;
            max-width: 600px;
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

    .no-items {
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
    }
}
</style>
