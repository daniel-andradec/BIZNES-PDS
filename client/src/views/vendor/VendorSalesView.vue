<template>
    <div class="vendor-sales-view">
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
                    <h1>Minhas Vendas</h1>
                </div>
                <div class="right">
                    <div class="search">
                        <input type="text" placeholder="Pesquisar venda" v-model="searchText" @input="searchSale()"/>
                        <i class="fa fa-search icon" @click="searchProduct()"></i>
                    </div>
                    <div class="pagination">
                        <i class="fa-solid fa-chevron-left" @click="prevPage()"></i>
                        <p>{{ page }}</p>
                        <i class="fa-solid fa-chevron-right" @click="nextPage()"></i>
                    </div>
                </div>
            </div>
        </div>

        <div class="sales-list">
            <VendorSalesList :sales="this.paginatedSales" />
        </div>

    </div>
</template>

<script>
import VendorHeader from '@/components/headers/VendorHeader.vue'
import VendorSalesList from '@/components/lists/VendorSalesList.vue'
import VendorMenu from '@/components/menus/VendorMenu.vue'

import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'VendorSalesView',
    components: {
        VendorHeader,
        VendorSalesList,
        VendorMenu
    },
    data() {
        return {
            searchText: '',
            page: 1,
            sales: [],
            itemsPerPage: 10,
            totalSales: 0,
        }
    },
    methods: {
        ...mapActions(['toggleVendorMenu']),
        nextPage() {
            if (this.page * this.itemsPerPage < this.totalSales) {
                this.page++
            }
        },
        prevPage() {
            if (this.page > 1) {
                this.page--
            }
        },
        searchSale() {
            if (this.searchText === '') {
                this.sales = this.getVendorSales
                this.totalSales = this.sales.length
            } else {
                // remove extra spaces
                this.searchText = this.searchText.replace(/\s+/g, ' ')

                // looks for matches in ID, customer name and city
                this.sales = this.getVendorSales.filter(sale => {
                    return sale.id.toString().includes(this.searchText) || sale.customer.toLowerCase().includes(this.searchText.toLowerCase()) || sale.city.toLowerCase().includes(this.searchText.toLowerCase())
                })
                this.totalSales = this.sales.length
            }
        }
    },
    computed: {
        ...mapGetters(['getVendorSales']),
        paginatedSales() {
            const start = (this.page - 1) * this.itemsPerPage
            const end = start + this.itemsPerPage
            return this.sales.slice(start, end)
        }
    },
    created() {
        this.sales = this.getVendorSales
        this.totalSales = this.sales.length
    }
}
</script>

<style lang="less">
.vendor-sales-view {
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

        .right {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: center;

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

            .pagination {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
                margin-right: 50px;

                p {
                    font-size: 18px;
                    font-weight: 500;
                    color: var(--primaryColor);
                }

                i {
                    font-size: 25px;
                    color: var(--secondaryColor);
                    cursor: pointer;
                }
            }
        }
    }
}
</style>