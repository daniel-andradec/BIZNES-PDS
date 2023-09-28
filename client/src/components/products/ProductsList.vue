<template>
    <div class="product-list">
        <CategoryMenu />

        <div class="list-header">
            <div class="select-categories">
                <i class="fas fa-bars" @click="toggleMenu"></i>
                <div v-if="search">
                    <p>Resultados para "{{ search }}"</p>
                </div>
                <p v-else> Todos os produtos</p> 
            </div>
            <div class="sort"  @mouseover="showSortDropdown" @mouseleave="hideSortDropdown">
                <p>Classificar por</p>
                <i class="fas fa-arrow-down-wide-short"></i>

                <!-- Dropdown Menu -->
                <div class="sort-options" v-if="isSortDropdownVisible">
                    <div class="option" v-for="(option, key) in sortOptions" :key="key">
                        <i :class="option.icon"></i>
                        {{ option.name }}
                    </div>
                </div>
            </div>
        </div>

        <div class="list" v-if="Object.values(products).length > 0">
            <div class="list-item" v-for="(product, key) in products" :key="key" @click="goToProduct(product)">
                <ProductCard :key="product.id" :product="product" />
            </div>
        </div>
        <div class="not-found" v-else>
            <h2>Nenhum produto encontrado :(</h2>
            <span v-if="search" @click="this.$router.push('/')">Voltar à página inicial</span>
        </div>
    </div>
</template>

<script>
import ProductCard from '@/components/products/ProductCard.vue'
import CategoryMenu from '@/components/menus/CategoryMenu.vue'
import { mapActions } from 'vuex'
export default {
    name: 'ProductsList',
    components: {
        ProductCard,
        CategoryMenu
    },
    props: ['products', 'search'],
    data() {
        return {
            isSortDropdownVisible: false,
            sortOptions: [
                {
                    name: 'Mais vendidos',
                    icon: 'fa-regular fa-star',
                },
                {
                    name: 'Menor preço',
                    icon: 'fa fa-arrow-down-long',
                },
                {
                    name: 'Maior preço',
                    icon: 'fa fa-arrow-up-long',
                },
                {
                    name: 'Categoria',
                    icon: 'fa fa-bars'
                },
                {
                    name: 'Nome',
                    icon: 'fa fa-font'
                }
            ]
        }
    },
    computed: {
    },
    methods: {
        ...mapActions(['toggleCategoryMenu']),
        toggleMenu() {
            this.toggleCategoryMenu()
        },
        showSortDropdown() {
            this.isSortDropdownVisible = true
        },
        hideSortDropdown() {
            this.isSortDropdownVisible = false
        },
        goToProduct(product) {
            this.$router.push({ name: 'product', params: { id: product.id } })
        }
    },
    mounted() {
    }
}
</script>

<style lang="less">
.product-list {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    .list-header {
        display: flex;
        justify-content: space-between;
        width: 100%;

        .select-categories {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            align-items: center;
            margin: 20px 50px;
            color: var(--secondaryColor);
            i {
                margin-right: 15px;
                font-size: 25px;
            }
            p {
                font-weight: normal;
                font-size: 25px;
            }
        }

        .sort {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            margin: 20px 50px;
            color: var(--secondaryColor);
            position: relative;

            i {
                font-size: 25px;
                margin-right: 10px;
            }
            p {
                font-weight: normal;
                font-size: 25px;
                margin-right: 10px;
            }

            .sort-options {
                position: absolute;
                background: #FFF;
                border-radius: 5px;
                box-shadow: 0px 2px 10px rgba(0,0,0,0.1);
                margin-top: 280px;
                z-index: 9;
                right: 0; // Para aparecer alinhado à direita

                .option {
                    padding: 10px 15px;
                    cursor: pointer;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-evenly;
                    align-items: center;
                    border-bottom: 1px solid #d3d3d3;

                    &:last-of-type {
                        border-bottom: none;
                    }

                    &:hover {
                        background: #F4F4F4;
                    }
                }
            }
        }
    }
    
    .list {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        margin: 0px 5%;

        .list-item {
            padding: 20px 20px;
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
            color: var(--secondaryColor);
        }
        span {
            color: var(--primaryColor);
            cursor: pointer;
            margin-left: 10px;
        }
    }

    @media (max-width: 1090px) {
        .list-header {
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;

            .select-categories {
                margin: 20px 50px 0px 50px;
            }

            .sort {
                margin: 0px 50px;
            }
        }
    }
}
    
</style>