<template>
    <div>
        <div class="list">
            <div class="list-header">
                <div class="header-item" v-for="(field, fkey) in listFields" :key="fkey" :class="{ 'header-item-sort': field.sort }" @click="sortSales(field)">
                    <h2>{{ field.display }}</h2>
                    <i class="fa-solid fa-sort" v-if="field.sort"></i>
                </div>
            </div>

            <div class="sale" v-for="(sale, skey) in sortedSales" :key="skey">
                <h2>{{ sale.idTransaction }}</h2>
                <h2>{{ sale.recipientName }}</h2>
                <h2>{{ formatDate(sale.date) }}</h2>
                <h2>{{ formatValue(sale.total) }}</h2>
                <h2>{{ sale.Address.city }}</h2>
                <h2>{{ formatDate(sale.deliveryDate) }}</h2>
                <i class="fa-regular fa-eye" @click="saleDetails(sale)"></i>
            </div>
        </div>

        <SaleModal :modalOpen="saleModalOpen" :sale="saleToView" @closeModal="saleModalOpen = false" />
    </div>
</template>

<script>
import SaleModal from '@/components/modals/vendor/SaleModal.vue'

import moment from 'moment'

export default {
    name: 'VendorSalesList',
    components: {
        SaleModal
    },
    props: ['sales'],
    data() {
        return {
            listFields: [
                {
                    display: 'Pedido Nº',
                    name: 'idTransaction',
                    sort: true
                },
                {
                    display: 'Cliente',
                    name: 'recipientName',
                    sort: true
                },
                {
                    display: 'Data',
                    name: 'date',
                    sort: true
                },
                {
                    display: 'Valor',
                    name: 'total',
                    sort: true
                },
                {
                    display: 'Cidade/UF',
                    name: 'city',
                    sort: true
                },
                {
                    display: 'Entrega Prevista',
                    name: 'deliveryDate',
                    sort: true
                },
                {
                    display: 'Ações'
                }
            ],
            sortedSales: [],
            isSorted: false,
            saleModalOpen: false,
            saleToView: {}
        }
    },
    methods: {
        formatValue(value) {
            return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        },
        formatDate(date) {
            return moment(date).format("DD/MM/YYYY")
        },
        sortSales(field) {
            if (field.sort) {
                this.isSorted = !this.isSorted;

                if (field.name === 'date' || field.name === 'deliveryDate') {
                    this.sortedSales.sort((a, b) => {
                        console.log(a)
                        const dateA = moment(a[field.name]);
                        const dateB = moment(b[field.name]);

                        if (this.isSorted) {
                            return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
                        } else {
                            return dateA.isAfter(dateB) ? -1 : dateA.isBefore(dateB) ? 1 : 0;
                        }
                    });
                } 
                else if (field.name === 'city') {
                    this.sortedSales.sort((a, b) => {
                        if (this.isSorted) {
                            return a.Address[field.name] < b.Address[field.name] ? -1 : a.Address[field.name] > b.Address[field.name] ? 1 : 0;
                        } else {
                            return a.Address[field.name] > b.Address[field.name] ? -1 : a.Address[field.name] < b.Address[field.name] ? 1 : 0;
                        }
                    });
                }
                else {
                    this.sortedSales.sort((a, b) => {
                        if (this.isSorted) {
                            return a[field.name] < b[field.name] ? -1 : a[field.name] > b[field.name] ? 1 : 0;
                        } else {
                            return a[field.name] > b[field.name] ? -1 : a[field.name] < b[field.name] ? 1 : 0;
                        }
                    });
                }
            }
        },
        saleDetails(sale) {
            console.log(sale)
            this.saleToView = sale
            this.saleModalOpen = true
        }
    },
    computed: {
    },
    watch: {
        sales: {
            handler(val) {
                this.sortedSales = val
            },
            deep: true
        }
    },
    mounted() {
        this.sortedSales = this.sales
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

    .sale {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 10px;
        align-items: center;
        padding: 10px;
        border-bottom: 1px solid #C8C8C8;
        text-align: center;
        margin-bottom: 20px;

        h2 {
            font-size: 16px;
            font-weight: 400;
        }

        i {
            color: var(--primaryColor);
            cursor: pointer;
        }
    }
}
</style>