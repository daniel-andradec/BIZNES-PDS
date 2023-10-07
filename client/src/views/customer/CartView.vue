<template>
    <div class="cart-view">
        <div class="header">
            <CustomerHeader />
        </div>

        <CategoryMenu />

        <div class="list-header">
            <div class="select-categories">
                <i class="fas fa-bars" @click="toggleCategoryMenu"></i>
            </div>
            <h1>Carrinho de compras</h1>
        </div>

        <div class="cart" v-if="Object.values(getCartProducts).length > 0">
            <div class="cart-products">
                <div class="list">
                    <div class="list-item" v-for="(product, key) in getCartProducts" :key="key">
                        <div class="product-container">
                            <img :src="product.img" @click="goToProduct(product)" />

                            <div class="product-info">
                                <div class="name" @click="goToProduct(product)">{{ product.name }}</div>
                                <div class="categories">
                                    <div class="category" v-for="(category, key) in product.category" :key="key">
                                        {{ category }}
                                    </div>
                                </div>
                                <div>Vendido por <b>FastShop</b></div>
                                <div class="price"> Total: <span>{{ formatValue(product.price) }}</span></div>
                            </div>

                            <div class="actions">
                                <div class="edit">
                                    <div class="button" @click="checkDecreaseQuantity(product.id)">
                                        <i class="fa fa-minus"></i>
                                    </div>
                                    <input type="text" v-model="product.quantity" disabled />
                                    <div class="button" @click="incrementProductQuantity(product.id)">
                                        <i class="fa fa-plus"></i>
                                    </div>
                                </div>
                                <div class="delete">
                                    <i class="fa-regular fa-trash-can fa-xl" @click="openRemoveProdModal(product)"></i>
                                </div>
                            </div>
                        </div>
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
                <div class="separator">
                </div>

                <div class="total">
                    <h2 v-text="formatValue(calculateTotalPrice())"></h2>
                    <p>em até 10x {{ formatValue(calculateTotalPrice() / 10) }} sem juros </p>
                </div>

                <div class="checkout">
                    <button @click="goToCheckout">Finalizar compra</button>
                    <button @click="goToHome" class="choose">Escolher mais produtos</button>
                </div>
            </div>
        </div>

        <div class="not-found" v-else>
            <h2>Seu carrinho está vazio :(</h2>
            <span @click="this.$router.push('/')">Voltar à página inicial</span>
        </div>

        <div>
            <BestSellersList />
        </div>
        

        <ModalComponent :modalOpen="removeProdModalOpen" @closeModal="removeProdModalOpen = false">
            <div class="remove-prod">
                <i class="fa-regular fa-trash-can fa-2xl"></i>
                <p>Deseja remover o produto do carrinho?</p>

                <div class="options">
                    <button class="btn btn-secondary" @click="removeProdModalOpen = false">Cancelar</button>
                    <button class="btn btn-primary" @click="removeProduct()">Remover</button>
                </div>
            </div>
        </ModalComponent>
    </div>
</template>

<script>
import CustomerHeader from '@/components/headers/CustomerHeader.vue';
import CategoryMenu from '@/components/menus/CategoryMenu.vue';
import ModalComponent from '@/components/modals/ModalComponent.vue';
import BestSellersList from '@/components/lists/BestSellersList.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'CartView',
    components: {
        CustomerHeader,
        CategoryMenu,
        ModalComponent,
        BestSellersList
    },
    data () {
        return {
            removeProdModalOpen: false,
            selectedProduct: {}
        }
    },
    methods: {
        ...mapActions(['toggleCategoryMenu', 'incrementProductQuantity', 'decrementProductQuantity', 'setProductQuantity', 'removeProductFromCart']),
        formatValue(value) {
            return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        },
        checkDecreaseQuantity(productId) {
            const product = this.getCartProducts.find(product => product.id === productId)
            if (product.quantity > 1) {
                this.decrementProductQuantity(productId)
            } else {
                this.openRemoveProdModal(product)
            }
        },
        openRemoveProdModal(product) {
            this.removeProdModalOpen = true
            this.selectedProduct = product
        },
        removeProduct() {
            this.removeProductFromCart(this.selectedProduct.id)
            this.removeProdModalOpen = false

            // todo: show toast
        },
        calculateTotalQuantity() {
            return this.getCartProducts.reduce((acc, product) => acc + product.quantity, 0)
        },
        calculateTotalPrice() {
            return this.getCartProducts.reduce((acc, product) => acc + (product.price * product.quantity), 0)
        },
        goToProduct(product) {
            this.$router.push({ name: 'product', params: { id: product.id } })
        },
        goToCheckout() {
            this.$router.push('/checkout')
        },
        goToHome() {
            this.$router.push('/')
        }
    },
    computed: {
        ...mapGetters(['getCartProducts', 'getBestSellers'])
    },
    mounted () {
        console.log(this.getCartProducts)
        console.log(localStorage.getItem('cart'))
        window.scrollTo(0, 0)
    }
}
</script>

<style lang="less">
.cart-view {
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

    .cart {
        margin-top: 30px;
        margin-right: 70px;
        margin-left: 70px;
        display: flex;
        justify-content: center;
        gap: 30px;

        .cart-products {
            padding-top: 0;

            .list {
                margin-left: 50px;

                .list-item {
                    margin-bottom: 30px;
                }


                .product-container {
                    position: relative;
                    display: grid;
                    grid-template-columns: 1fr 1.3fr 1fr;
                    width: 100%;
                    min-width: 500px;
                    text-align: center;
                    border-radius: 5px;
                    border: 1px solid rgba(0, 0, 0, 0.18);
                    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
                    transition: all linear .2s;

                    img {
                        height: 200px;
                        width: 100%;
                        border-radius: 5px;
                        object-fit: contain;
                        margin: 10px 40px;
                        cursor: pointer;
                    }

                    .product-info {
                        display: flex;
                        flex-direction: column;
                        align-items: baseline;
                        justify-content: center;
                        text-align: left;
                        margin-left: 60px;

                        .name {
                            font-size: 20px;
                            font-weight: 500;
                            margin: 15px 0px;
                            cursor: pointer;
                        }

                        .categories {
                            display: flex;
                            flex-wrap: wrap;
                            font-size: 14px;
                            align-items: center;
                            margin: 15px 0px;

                            .category {
                                background: #D4F3DE;
                                border-radius: 5px;
                                padding: 8px;
                                margin-right: 10px;
                                margin-top: 5px;
                            }
                        }

                        .price {
                            margin: 15px 0px;
                            font-size: 22px;
                            padding: 10px 0px;

                            span {
                                color: var(--primaryColor);
                            }
                        }
                    }

                    .actions {
                        display: flex;
                        flex-direction: column;
                        align-items: flex-end;
                        justify-content: flex-start;
                        margin-right: 40px;
                        margin-top: 70px;
                        padding-bottom: 20px;

                        h1 {
                            // 2 linhas
                            max-width: 50%;
                        }
                        .edit {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            width: 100px;
                            margin-bottom: 60px;

                            .button {
                                width: 30px;
                                height: 30px;
                                border-radius: 50%;
                                background: var(--primaryColor);
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                i {
                                    color: white;
                                }
                            }

                            input {
                                width: 30px;
                                height: 30px;
                                border: none;
                                font-size: 18px;
                                font-family: Gellix;
                                text-align: center;
                            }
                        }

                        .delete {
                            align-self: flex-end;
                            color: var(--secondaryColor);
                        }
                    }
                }
            }
        }


        .summary {
            width: 30vw;
            min-width: 450px;
            max-width: 600px;
            height: fit-content;
            margin-right: 50px;
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

    .not-found {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0px 50px;
        margin-bottom: 20px;
        h2 {
            font-size: 22px;
            font-weight: 600;
        }
        span {
            color: var(--primaryColor);
            cursor: pointer;
        }
    }

    .remove-prod {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;

        i {
            color: var(--primaryColor);
        }

        p {
            font-size: 20px;
            font-weight: 500;
        }

        .options {
            display: flex;
            gap: 20px;

            button {
                width: 150px;
                height: 50px;
                border-radius: 5px;
                border: none;
                font-size: 18px;
                font-weight: 500;
                cursor: pointer;
            }
        }
    }


    // media - width less than 1200px puts the summary below the products list
    @media (max-width: 800px) {
        .cart {
            flex-direction: column;
            gap: 0px;

            .cart-products {
                .list {
                    width: 100%;
                    margin-left: 0px;
                }
            }

            .summary {
                width: 100%;
                margin-right: 0px;
                margin-top: 30px;
            }
        }
    }

}

  
</style>