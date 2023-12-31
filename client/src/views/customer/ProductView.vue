<template>
    <div class="product-view">
        <CategoryMenu />
        
        <div class="header">
            <CustomerHeader />
        </div>
        <div class="select-categories">
            <i class="fas fa-bars" @click="toggleMenu"></i>
            <div class="category" v-for="(category, key) in product.category?.split(',')" :key="key">
                <p>{{ category }}</p>
            </div>
        </div>

        <div class="product-container">
            <div class="product-image">
                <img :src="product.photo" />
            </div>
            <div class="info">
                <h1>{{ product.name }}</h1>
                <p class="justify">{{ product.description }}</p>
                <div class="price">
                    <h2>{{ formatValue(product.price) }}</h2>
                    <p>em até 10x de {{ formatValue(product.price / 10) }}</p>
                </div>
    
                <p>
                    Vendido por <span>{{ product.seller }}</span> e entregue por Biznes
                </p>
    
                <p>
                    Entrega Gratuita: {{ calcDeliveryDate() }}
                </p>
    
                <div class="options" v-if="product.options?.length > 0">
                    <label for="color-options">Opção:</label>
                    <select id="color-options" v-model="selectedOption" data-testid="option-select">
                        <option value="" disabled selected>Selecione uma opção</option>
                        <option v-for="(option, index) in product.options?.split(',')" :key="index" :value="option">
                            {{ option }}
                        </option>
                    </select>
                </div>


                <div class="actions">
                    <button class="btn btn-primary" @click="directTransaction()">Comprar</button>
                    <button class="btn btn-secondary" @click="addToCart()" data-testid="add-to-cart-button">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                </div>
            </div>
        </div>


        <div class="other-products">
            <h2>Outros produtos que você pode gostar</h2>
            <div class="list" v-if="Object.values(categoryProducts).length > 0">
                <div class="list-item" v-for="(product, key) in categoryProducts" :key="key" @click="goToProduct(product)">
                    <ProductCard :key="product.id" :product="product" :fixSize="true" />
                </div>
                    
                <span @click="this.$router.push('/')">Voltar à <br>página inicial</span>
            </div>

            <div class="list" v-else>
                <!-- Produtos mais vendidos -->
                <BestSellersList />
            </div>
        </div>
    </div>
</template>

<script>
import CustomerHeader from '@/components/headers/CustomerHeader.vue'
import CategoryMenu from '@/components/menus/CategoryMenu.vue'
import ProductCard from '@/components/products/ProductCard.vue'
import BestSellersList from '@/components/lists/BestSellersList.vue'

import { mapActions, mapGetters } from 'vuex'
import { checkQuantity } from '@/controllers/ProductController'

export default {
    name: 'ProductView',
    components: {
        CustomerHeader,
        CategoryMenu,
        ProductCard,
        BestSellersList
    },
    data() {
        return {
            product: {},
            categoryProducts: [],
            selectedOption: ''
        }
    },
    methods: {
        ...mapActions(['toggleCategoryMenu', 'addProductToCart']),
        toggleMenu() {
            this.toggleCategoryMenu()
        },
        formatValue(value) {
            return value?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        },
        calcDeliveryDate() {
            // em até 5 dias úteis
            const today = new Date()
            const deliveryDate = new Date(today.setDate(today.getDate() + 5))
            return deliveryDate.toLocaleDateString('pt-br', { weekday: 'long', day: 'numeric', month: 'long' })
        },
        goToProduct(prod) {
            this.$router.push({ name: 'product', params: { idProduct: prod.idProduct } })
        },
        addToCart() {
            if (!this.selectedOption && this.product.options?.length > 0) return this.$toast.open({
                message: 'Selecione uma opção!',
                type: 'error',
                position: 'top-right',
                duration: 3000
            })
            const newProd = {
                ...this.product,
                selectedOption: this.selectedOption,
                quantity: 1
            } 
            this.addProductToCart(newProd)
            this.$toast.open({
                message: 'Produto adicionado ao carrinho!',
                type: 'success',
                position: 'top-right',
                duration: 3000
            })
        },
        async directTransaction() {
            if (!this.selectedOption && this.product.options?.length > 0) return this.$toast.open({
                message: 'Selecione uma opção!',
                type: 'error',
                position: 'top-right',
                duration: 3000
            })

            const prodQuantityOk = await checkQuantity(this.product.idProduct, 1)
            if (!prodQuantityOk) return this.$toast.open({
                message: 'Não há estoque suficiente para essa compra!',
                type: 'error',
                position: 'top-right',
                duration: 3000
            })

            this.product.selectedOption = this.selectedOption
            this.product.quantity = 1
            localStorage.setItem('directTransacProduct', JSON.stringify(this.product))

            if (!this.loggedInUser.id) {
                this.$toast.open({
                    message: 'Você precisa estar logado para finalizar a compra!',
                    type: 'warning',
                    position: 'top-right',
                    duration: 3000
                })

                // go to login informing that user will be redirected to checkout after login
                this.$router.push({ name: 'login', params: { redirect: '/checkout' } })
                return
            }
            
            this.$router.push('/checkout')
        }
    },
    computed: {
        ...mapGetters(['getBestSellers', 'getCategoryProducts', 'loggedInUser'])
    },
    mounted() {
        const productID = this.$route.params.idProduct
        this.product = this.$store.getters.getProduct(productID)
        console.log(this.product)
        this.categoryProducts = this.$store.getters.getCategoryProducts(this.product?.category.split(','), this.product?.idProduct)
        window.scrollTo(0, 0)
    },
    created() {
        this.$watch(
            () => this.$route.params.id,
            (newVal) => {
                this.product = this.$store.getters.getProduct(newVal)
                this.categoryProducts = this.$store.getters.getCategoryProducts(this.product?.category, this.product?.idProduct)
            }
        )
    }
}
</script>

<style lang="less">
.product-view {

    .select-categories {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        align-items: center;
        margin: 35px 50px;
        padding-top: 30px;
        color: var(--secondaryColor);
        i {
            margin-right: 15px;
            font-size: 25px;
        }
        p {
            font-weight: normal;
            font-size: 20px;
        }

        .category {
            display: flex;
            background: #D4F3DE;
            height: 40px;
            align-items: center;
            padding: 5px;
            margin-right: 10px;
            border-radius: 5px;
        }
    }

    .product-container {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-bottom: 100px;
        
        .product-image {
            max-width: 400px;
            margin-right: 10vw;

            img {
                width: 100%;
                height: 50vh;
                max-height: 500px;
                max-width: 380px;
                border-radius: 5px;
                object-fit: contain;
                margin-top: 10px;
                scale: 1.2;
            }

            img:hover {
                transform: scale(1.3);
                transition: transform 0.5s;
                max-height: 500px;                
            }
        }


        .info {
            width: 35%;
            padding: 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            text-align: left;

            h1 {
                font-family: Gellix;
                font-size: 32px;
                margin-top: 0;
                margin-bottom: 15px;
                font-weight: 600;
            }
    
            p {
                font-size: 22px;        
                
                span {
                    font-weight: 500;
                }
            }

            .justify {
                text-align: justify;
            }
    
            .price {
                h2 {
                    font-size: 28px;
                    color: var(--primaryColor);
                }
                p {
                    font-size: 18px;
                }
            }
    
            .options {
                margin-top: 20px;
                margin-bottom: 20px;

                label {
                    font-size: 20px;
                    margin-right: 10px;
                }

                select {
                    padding: 10px;
                    font-size: 18px;
                    border-radius: 5px;
                    border: 1px solid #ccc;
                    appearance: none; /* Remove a seta padrão do seletor */
                    background-color: #f9f9f9;
                    cursor: pointer;
                }

                select:focus {
                    border-color: var(--primaryColor);
                    outline: none;
                }
            }

            .actions {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 20px;
                
                .btn {
                    padding: 12px 25px;
                    border: none;
                    border-radius:  5px;
                    font-size: 16px;
                    cursor: pointer;
                    transition: background 0.3s;
                    
                    &.btn-primary {
                        font-weight: bold;
                        font-size: 20px;
                        background: var(--primaryColor);
                        color: #fff;
                        width: 80%;
                        &:hover {
                            background: var(--primaryColor);
                        }
                    }
    
                    &.btn-secondary {
                        background:var(--secondaryColor);
                        color: #fff;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 20%;
                        i {
                            font-size: 20px;
                        }
                        &:hover {
                            background: var(--secondaryColor);
                        }
                    }
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

    @media (max-width: 1090px) {
        .product-container {
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-bottom: 50px;

            .product-image {
                margin-right: 0px;
                margin-bottom: 50px;
            }

            .info {
                width: 50%;
                padding: 0px;
                text-align: center;
            }
        }
    }
}

</style>