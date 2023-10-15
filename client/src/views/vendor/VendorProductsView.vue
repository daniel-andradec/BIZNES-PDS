<template>
    <div class="vendor-products-view">
        <div class="header">
            <VendorHeader />
        </div>
        <VendorMenu />

        <div class="list-header">
            <div class="vendor-menu-bars">
                <i class="fas fa-bars" @click="toggleVendorMenu"></i>
            </div>
            <div class="vendor-prod-options">
                <div class="left">
                    <h1>Meus Produtos</h1>
                    <h2 @click="addProductModalOpen = true">Adicionar Produto</h2>
                </div>
                <div class="right">
                    <i class="fa-solid fa-arrow-down-short-wide" @click="categoryModalOpen = true"></i>
                    <div class="search">
                        <input type="text" placeholder="Pesquisar produto" v-model="searchText" @input="searchProduct()"/>
                        <i class="fa fa-search icon" @click="searchProduct()"></i>
                    </div>
                </div>
            </div>
        </div>

        <div class="products-list">
            <VendorProductsList :products="this.products" :noResults="noResults" @refreshProducts="refreshProducts"/>
        </div>
        
        <ProductModal :modalOpen="addProductModalOpen" @closeModal="addProductModalOpen = false" :editProduct="false" @refreshProducts="refreshProducts"/>

        <CategoryModal :modalOpen="categoryModalOpen" :categories="categoriesList" @closeModal="categoryModalOpen = false" @addCategories="handleCategories" />
    </div>
</template>

<script>
import VendorHeader from '@/components/headers/VendorHeader.vue'
import VendorMenu from '@/components/menus/VendorMenu.vue'
import VendorProductsList from '@/components/lists/VendorProductsList.vue'
import ProductModal from '@/components/modals/vendor/ProductModal.vue'
import CategoryModal from '@/components/modals/CategoryModal.vue'
import { getProducts } from '@/controllers/VendorController'
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'VendorProductsView',
    components: {
        VendorHeader,
        VendorMenu,
        VendorProductsList,
        ProductModal,
        CategoryModal
    },
    data() {
        return {
            searchText: '',
            products: [],
            noResults: false,
            addProductModalOpen: false,
            categoryModalOpen: false,
            categoriesList: []
        }
    },
    methods: {
        ...mapActions(['toggleVendorMenu']),
        searchProduct() {
            if (this.searchText === '') {
                this.products = this.getVendorStock.map((prod) => {
                    return {
                        ...this.getProduct(prod.id),
                        quantity: prod.quantity
                    }
                })
                return
            }
            this.products = this.getVendorStock.map((prod) => {
                    return {
                            ...this.getProduct(prod.id),
                            quantity: prod.quantity
                        }
                    }
                ).filter((prod) => {
                    return prod.name.toLowerCase().includes(this.searchText.toLowerCase());
                }
            );
            this.noResults = this.products.length === 0;
            console.log(this.products)
        },
        handleCategories(categories) {
            this.categoryModalOpen = false
            if (categories.length === 0) {
                this.products = this.getVendorStock.map((prod) => {
                    return {
                        ...this.getProduct(prod.id),
                        quantity: prod.quantity
                    }
                })
                return
            }

            // category processing - todo - fix this when categories are fixed
            categories = categories.map((cat) => {
                return cat.name
            })
            this.products = this.getVendorStock.map((prod) => {
                return {
                    ...this.getProduct(prod.id),
                    quantity: prod.quantity
                }
            }).filter((prod) => {
                return prod.category.some((cat) => {
                    return categories.includes(cat)
                })
            });
            this.noResults = this.products.length === 0
        },
        async refreshProducts() {
            this.addProductModalOpen = false
            await getProducts().then(() => {
                this.products = null
                this.products = this.getVendorStock
            })
        }
    },
    computed: {
        ...mapGetters(['getVendorStock', 'getProduct', 'getCategory']),
    },
    created() {
        
    },
    async mounted() {
        await getProducts().then(() => {
            console.log(this.getVendorStock)
            this.products = this.getVendorStock;
        })
    }
    
}
</script>

<style lang="less">
.vendor-products-view {
    .list-header {
        padding-top: 20px;
        margin-bottom: 20px;

        .vendor-menu-bars {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            align-items: center;
            margin: 48px 50px 20px 50px;
            color: var(--secondaryColor);
            cursor: pointer;

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

    .vendor-prod-options {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        
        .left {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            gap: 40px;

            h2 {
                font-weight: 500;
                font-size: 22px;
                color: var(--primaryColor);
                cursor: pointer;
            }
        }

        .right {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: center;

            i {
                font-size: 25px;
                color: var(--secondaryColor);
                cursor: pointer;
            }

            .search {
                display: flex;
                align-items: center;
                background-color: #fff;
                border-radius: 5px;
                box-sizing: border-box;
                border: 1px solid var(--secondaryColor);
                padding: 10px 10px;
                position: relative;
                margin: 0 50px 0 40px;

                //sizing
                width: 20vw;
                height: 40px;
                
                input {
                    border: none;
                    outline: none;
                    background-color: transparent;
                    font-size: 18px;
                    font-family: Gellix;
                    width: 100%;
                    padding-right: 25px;
                }

                i {
                    position: absolute;
                    right: 10px;
                    color: gray;
                }
            }
        }
    }

    
}
</style>