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

        <div class="cart">
            <div class="products">
                <div class="list" v-if="Object.values(getCartProducts).length > 0">
                    <div class="list-item" v-for="(product, key) in getCartProducts" :key="key">
                        <div class="product-container">
                            <img :src="product.img" />

                            <div class="product-info">
                                <div class="name">{{ product.name }}</div>
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
                                    <div class="button" @click="decreaseLimit">
                                        <i class="fa fa-minus"></i>
                                    </div>
                                    <input type="text" v-model="limit" />
                                    <div class="button" @click="increaseLimit">
                                        <i class="fa fa-plus"></i>
                                    </div>
                                </div>
                                <div class="delete">
                                    <i class="fa fa-trash-can fa-xl"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="summary">
                <h1>Resumo do pedido</h1>
                <div class="product-sum">
                    <h2>2 produtos</h2>
                    <h2>R$ 20.689,00</h2>
                </div>
                <div class="shipping">
                    <h2>Frete</h2>
                    <h2>Grátis</h2>
            </div>
                <div class="separator">
                </div>

                <div class="total">
                    <h2>R$ 20.689,00</h2>
                    <p>em até 10x de R$1.029.9,00 sem juros </p>
                </div>

                <div class="checkout">
                    <button>Finalizar compra</button>
                    <button class="choose">Escolher mais produtos</button>
                </div>
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
import CustomerHeader from '@/components/headers/CustomerHeader.vue';
import ProductCard from '@/components/products/ProductCard.vue';
import CategoryMenu from '@/components/menus/CategoryMenu.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'CartView',
    components: {
        CustomerHeader,
        ProductCard,
        CategoryMenu
    },
    data () {
        return {
        }
    },
    methods: {
        ...mapActions(['toggleCategoryMenu']),
        formatValue(value) {
            return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        }
    },
    computed: {
        ...mapGetters(['getCartProducts', 'getBestSellers'])
    },
    mounted () {
        console.log(this.getCartProducts)
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
        display: flex;
        justify-content: center;
        gap: 100px;

        .products {
            padding-top: 0;

            .list {
                width: 50vw;
                margin-left: 50px;

                .list-item {
                    margin-bottom: 30px;
                }


                .product-container {
                    position: relative;
                    display: grid;
                    grid-template-columns: 1fr 1.3fr 1fr;
                    width: 100%;
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
                        }

                        .categories {
                            display: flex;
                            font-size: 14px;
                            align-items: center;
                            margin: 15px 0px;

                            .category {
                                background: #D4F3DE;
                                border-radius: 5px;
                                padding: 8px;
                                margin-right: 10px;
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
            height: fit-content;
            margin-right: 50px;
            border-radius: 5px;
            border: 1px solid rgba(0, 0, 0, 0.18);
            box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

            h1 {
                font-weight: 500;
                font-size: 30px;
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