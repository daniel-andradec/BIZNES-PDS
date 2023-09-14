<template>
    <div class="cart-view">
        <div class="header">
            <CustomerHeader />
        </div>

        <div class="list-header">
            <div class="select-categories">
                <i class="fas fa-bars" @click="toggleMenu"></i>
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

            </div>
        </div>
    </div>
</template>

<script>
import CustomerHeader from '@/components/headers/CustomerHeader.vue';
import { mapGetters } from 'vuex';

export default {
    name: 'CartView',
    components: {
        CustomerHeader
    },
    data () {
        return {
        }
    },
    methods: {
        formatValue(value) {
            return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        }
    },
    computed: {
        ...mapGetters(['getCartProducts'])
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

  
</style>