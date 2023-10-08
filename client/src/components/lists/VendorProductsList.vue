<template>
    <div>
        <div class="list" v-if="Object.values(sortedProducts).length > 0">
            <div class="list-header">
                <div class="header-item" v-for="(field, fkey) in listFields" :key="fkey" :class="{ 'header-item-sort': field.sort }" @click="sortProducts(field)">
                    <h2>{{ field.display }}</h2>
                    <i class="fa-solid fa-sort" v-if="field.sort"></i>
                </div>
            </div>
            <div class="product" v-for="(product, pkey) in sortedProducts" :key="pkey">
                <div class="image">
                    <img :src="product.img" alt="product">
                </div>
                <h2>{{ product.name }}</h2>
                <div class="categories">
                    <div class="category" v-for="(category, key) in product.category" :key="key">
                        {{ category }}
                    </div>
                </div>
                <h2> {{ formatValue(product.price) }}</h2>
                <h2>{{ product.quantity }}</h2>
                <h2> {{ getOptionsList(product.options) }}</h2>
                <div class="actions">
                    <i class="fa-solid fa-edit" @click="editProduct(product)"></i>
                    <i class="fa-solid fa-trash red" @click="openDeleteProdModal(product)"></i>
                </div>
            </div>
        </div>
        <div class="not-found" v-else-if="noResults">
            <h2>Não foram encontrados resultados.</h2>
        </div>
        <div class="not-found" v-else>
            <h2>Ops! Parece que você ainda não tem nenhum produto cadastrado. <br>Utilize o botão acima para adicionar um novo produto.</h2>
        </div>

        <ProductModal :modalOpen="editProductModalOpen" :product="productToEdit" :editProduct="editProductModalOpen" @closeModal="editProductModalOpen = false" />

        <ModalComponent :modalOpen="deleteProductModalOpen" @closeModal="deleteProductModalOpen = false">
            <div class="delete-prod-modal">
                <i class="fa-solid fa-trash fa-xl"></i>
                <h2>Tem certeza que deseja <b>excluir</b> o produto {{ productToDelete.name }}?</h2>
                <div class="delete-buttons">
                    <button class="btn btn-primary" @click="deleteProductModalOpen = false">Cancelar</button>
                    <button class="btn btn-danger" @click="deleteProduct">Excluir</button>
                </div>
            </div>
        </ModalComponent>
    </div>
</template>

<script>
import ProductModal from '../modals/vendor/ProductModal.vue'
import ModalComponent from '../modals/ModalComponent.vue'

export default {
    name: 'VendorProductsList',
    components: {
        ProductModal,
        ModalComponent
    },
    props: ['products', 'noResults'],
    data() {
        return {
            listFields: [
                {
                    display: 'Imagem'
                },
                {
                    display: 'Nome',
                    name: 'name',
                    sort: true
                },
                {
                    display: 'Categoria'
                },
                {
                    display: 'Preço',
                    name: 'price',
                    sort: true
                },
                {
                    display: 'Qtde. disponível',
                    name: 'quantity',
                    sort: true
                },
                {
                    display: 'Opções'
                },
                {
                    display: 'Ações'
                }
            ],
            sortedProducts: [],
            isSorted: false,
            editProductModalOpen: false,
            productToEdit: {},
            deleteProductModalOpen: false,
            productToDelete: {}
        }
    },
    methods: {
        getOptionsList (options) {
            if (options.length === 0) return '-'
            return options.join(', ')
        },
        formatValue(value) {
            return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        },
        sortProducts(field) {
            if (field.sort) {
                this.isSorted = !this.isSorted

                this.sortedProducts.sort((a, b) => {
                    if (this.isSorted) {
                        return a[field.name] < b[field.name] ? -1 : a[field.name] > b[field.name] ? 1 : 0
                    } else {
                        return a[field.name] > b[field.name] ? -1 : a[field.name] < b[field.name] ? 1 : 0
                    }
                })
            }
        },
        editProduct(product) {
            this.productToEdit = product
            this.editProductModalOpen = true
        },
        openDeleteProdModal (product) {
            this.productToDelete = product
            this.deleteProductModalOpen = true
        },
        deleteProduct () {
            // todo - delete product
        }
    },
    computed: {
    },
    created() {
    },
    mounted() {
        console.log(this.products)
        this.sortedProducts = this.products
    },
    watch: {
        products: {
            handler: function (val) {
                this.sortedProducts = val
            },
            deep: true
        }
    }
}
</script>


<style lang="less">

.list {
    .list-header {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 10px;
        align-items: center;
        padding: 10px;
        
        h2 {
            font-size: 18px;
            font-weight: 500;
        }

        .header-item {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            gap: 10px;

            i {
                color: #232323;
            }

            &.header-item-sort {
                cursor: pointer;
            }
        }
    }

    .product {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 10px;
        align-items: center;
        padding: 10px;
        border-bottom: 1px solid #ccc;
        text-align: center;
        margin-bottom: 20px;

        .image {
            display: flex;
            align-items: center;
            justify-content: center;

            img {        
                width: 70px;
                height: 70px;
                display: flex;
                object-fit: contain;
            }
        }

        h2 {
            font-size: 16px;
            font-weight: 500;
            text-align: center;
        }

        .categories {
            display: flex;
            font-size: 12px;
            align-items: center;
            justify-content: center;
            gap: 5px;

            .category {
                background: #D4F3DE;
                border-radius: 5px;
                padding: 8px;
            }
        }


        .actions {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            gap: 20px;

            i {
                font-size: 18px;
                color: var(--primaryColor);
                cursor: pointer;
            }

            .red {
                color: #9E4343;
            }
        }   

        &:last-child {
            border-bottom: none;
        }
    }
}

.not-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;

    h2 {
        font-size: 25px;
        font-weight: 500;
        text-align: center;
    }
}

.delete-prod-modal {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;

    h2 {
        font-size: 22px;
        font-weight: 500;
        text-align: center;
        max-width: 450px;
        word-break: break-word;
    }

    i {
        color: #3b3b3b;
    }

    button {
        width: 100px;
        height: 40px;
        border-radius: 5px;
        border: none;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
    }

    .btn-primary {
        background-color: #fff;
        border: 1px solid #ccc;
        color: #232323;
    }

    .btn-danger {
        background-color: #9E4343;
        color: white;
    }

    .delete-buttons {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 20px;
    }
}
</style>