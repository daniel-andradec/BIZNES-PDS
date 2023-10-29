<template>
    <div class="vendor-panel-view">
        <div class="header">
            <VendorHeader />
        </div>

        <VendorMenu />
        
        <div class="list-header">
            <div class="vendor-menu-bars">
                <i class="fas fa-bars" @click="toggleVendorMenu"></i>
            </div>
            <h1>Painel</h1>
        </div>

        <div class="panel-data">
            <div class="data" v-for="(field, fkey) in panelData" :key="fkey" @click="this.$router.push('/vendor-sales')">
                <i :class="field.icon"></i>
                <div class="data-info">
                    <p>{{ field.display }}</p>
                    <h2>{{ getFieldValue(field) }}</h2>
                </div>
            </div>
        </div>

        <div class="vendor-options">
            <div class="option" v-for="(option, okey) in vendorOptions" :key="okey" @click="this.$router.push(option.route)">
                <img :src="require(`@/assets/images/${option.image}.svg`)" alt="option">
                <p>{{ option.display }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import VendorHeader from '@/components/headers/VendorHeader.vue';
import VendorMenu from '@/components/menus/VendorMenu.vue';
import { mapGetters, mapActions } from 'vuex';
import { getVendorSales, getProducts } from '@/controllers/VendorController';

export default {
    name: 'VendorPanelView',
    components: {
        VendorHeader,
        VendorMenu
    },
    data() {
        return {
            panelData: [
                {
                    display: 'Total de vendas',
                    name: 'salesTotal',
                    value: 0,
                    icon: 'fa-solid fa-chart-line',
                    format: true
                },
                {
                    display: 'Total de pedidos',
                    name: 'totalOrders',
                    value: 0,
                    icon: 'fa-solid fa-cart-shopping'
                },
                {
                    display: 'Produto mais vendido',
                    name: 'bestSellingProduct',
                    value: '-',
                    icon: 'fa-solid fa-medal',
                    fixLength: true
                },
                {
                    display: 'Categoria mais vendida',
                    name: 'bestSellingCategory',
                    value: '-',
                    icon: 'fa-solid fa-ranking-star',
                    fixLength: true
                }
            ],
        vendorOptions: [
            {
                display: 'Cadastro da Loja',
                image: 'vendor_profile',
                route: '/store-registration'
            },
            {
                display: 'Meus Produtos',
                image: 'vendor_products',
                route: '/vendor-products'
            },
            {
                display: 'Minhas Vendas',
                image: 'vendor_sales',
                route: '/vendor-sales'
            }
        ]
        }
    },
    methods: {
        ...mapActions(['toggleVendorMenu']),
        formatValue(value) {
            return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        },
        getFieldValue(field) {
            let value = field.value
            if (field.format) {
                value = this.formatValue(field.value)
            } 
            if (field.fixLength) {
                value = field.value?.length > 30 ? field.value?.substring(0, 30) + '...' : field.value
            }

            return value
        },
        setPanelData() {
            let salesTotal = 0
            let totalOrders = 0
            let productsCount = {}
            let categoriesCount = {}

            this.getVendorSales.forEach(sale => {
                salesTotal += sale.total;
                totalOrders += 1;

                sale.TransactionProducts.forEach(product => {
                    productsCount[product.productName] = (productsCount[product.productName] || 0) + (product.quantity || 0)
                    
                    const categories = product.productCategory.split(',');
                    categories.forEach(category => {
                        categoriesCount[category.trim()] = (categoriesCount[category.trim()] || 0) + (product.quantity || 0)
                    });
                });
            });

            const bestSellingProduct = Object.keys(productsCount).reduce((a, b) => productsCount[a] > productsCount[b] ? a : b, "");
            const bestSellingCategory = Object.keys(categoriesCount).reduce((a, b) => categoriesCount[a] > categoriesCount[b] ? a : b, "");

            this.panelData[0].value = salesTotal || 0;
            this.panelData[1].value = totalOrders || 0;
            this.panelData[2].value = bestSellingProduct || '-';
            this.panelData[3].value = bestSellingCategory || '-';
        }
    },
    computed: {
        ...mapGetters(['getVendorSales']),
    },
    async mounted() {
        // load sales to use in panel data
        await getVendorSales().then((res) => {
            if (res.data && res.data.length > 0) {
                console.log(this.getVendorSales)
                this.setPanelData()
            }
        }).catch((err) => {
            console.log(err)
            this.$toast.open({
                message: 'Erro ao carregar resumo de vendas. Tente novamente mais tarde.',
                position: 'top-right',
                duration: 5000,
                type: 'error'
            })
        })

        // load stock
        await getProducts()
    }
    
}
</script>

<style lang="less">
.vendor-panel-view {
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

    .panel-data {
        display: flex;
        flex-direction: row;
        justify-content: center;
        padding: 0 calc(100vw * 0.1);
        gap: 30px;
        min-width: 1000px;

        .data {
            display: grid;
            grid-template-columns: 1fr 2fr;
            width: 268px;
            background: #8bb89a2c;
            border-radius: 10px;
            padding: 10px;
            cursor: pointer;

            i {
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 20px;
                font-size: 25px;
                color: var(--primaryColor);
            }

            .data-info {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                align-items: flex-start;

                p {
                    font-size: 15px;
                    color: var(--secondaryColor);
                    text-align: left;
                }

                h2 {
                    font-weight: 600;
                    font-size: 18px;
                    text-align: left;
                }
            }
        }
    }

    .vendor-options {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin: 60px;
        padding: 0 calc(100vw * 0.05);
        min-width: 1000px;

        .option {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border-radius: 5px;
            padding: 60px;
            cursor: pointer;
            border: 1px solid rgba(0, 0, 0, 0.1);
            box-shadow: 1px 5px 5px rgba(0,0,0,0.1);
            margin: 0px 20px;

            img {
                width: 260px;
                height: 201px;
            }

            p {
                font-weight: 500;
                font-size: 25px;
                text-align: center;
                margin-top: 40px;
            }
        }
    }
}
</style>