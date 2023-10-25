<template>
    <div>
        <div class="vendors-list" v-if="sortedVendors.length > 0">
            <div class="v-list-header">
                <div class="v-header-item" v-for="(field, fkey) in listFields" :key="fkey" :class="{ 'header-item-sort': field.sort }" @click="sortVendors(field)">
                    <h2>{{ field.display }}</h2>
                    <i class="fa-solid fa-sort" v-if="field.sort"></i>
                </div>
            </div>

            <div class="vendors" v-for="(vendor, ckey) in sortedVendors" :key="ckey">
                <h2>{{ vendor.idVendor }}</h2>
                <h2>{{ vendor.companyName }}</h2>
                <h2>{{ vendor.fantasyName }}</h2>
                <h2>{{ vendor.CNPJ }}</h2>
                <h2>{{ vendor.User.Address.city }}/{{ vendor.User.Address.state }}</h2>
                <h2>{{ vendor.phone }}</h2>
                <h2>{{ vendor.User.email }}</h2>                
                <i class="fa-solid fa-trash red" @click="openDeleteVendorModal(vendor)"></i>
            </div>
        </div>

        <div class="not-found" v-else>
            <h2>Não foram encontrados resultados.</h2>
        </div>

        <ModalComponent :modalOpen="deleteVendorModalOpen" @closeModal="deleteVendorModalOpen = false">
            <div class="delete-vendor-modal">
                <i class="fa-solid fa-trash fa-xl"></i>
                <h2>Tem certeza que deseja <b>excluir</b> o fornecedor {{ vendorToDelete.companyName }}?</h2>
                <div class="delete-buttons">
                    <button class="btn btn-primary" @click="deleteVendorModalOpen = false">Cancelar</button>
                    <button class="btn btn-danger" @click="deleteVendor">Excluir</button>
                </div>
            </div>
        </ModalComponent>
    </div>  
</template>

<script>
import ModalComponent from '../modals/ModalComponent.vue'

import { mapGetters } from 'vuex'
import { getVendors } from '@/controllers/AdminController'
import { formatValue } from '@/libs/Util'

export default {
    name: 'ManageVendor',
    props: ['searchText'],
    components: {
        ModalComponent
    },
    data() {
        return {
            listFields: [
                {
                    display: 'ID',
                    name: 'idVendor',
                    sort: true
                },
                {
                    display: 'Razão Social',
                    name: 'companyName',
                    sort: true
                },
                
                {
                    display: 'Fantasia',
                    name: 'fantasyName',
                    sort: true
                },
                {
                    display: 'CNPJ',
                    name: 'cnpj'
                },
                {
                    display: 'Cidade/UF',
                    name: 'city'
                },
                {
                    display: 'Telefone',
                    name: 'phone'
                },
                {
                    display: 'E-mail',
                    name: 'email'
                },
                {
                    display: 'Ações'
                }
            ],
            sortedVendors: [],
            isSorted: false,
            deleteVendorModalOpen: false,
            vendorToDelete: {}
        }
    },
    computed: {
        ...mapGetters(['getVendors'])
    },
    methods: {
        sortVendors(field) {
            if (field.sort) {
                this.isSorted = !this.isSorted

                this.sortedVendors.sort((a, b) => {
                    console.log(a)
                    if (this.isSorted) {
                        return a[field.name] < b[field.name] ? -1 : a[field.name] > b[field.name] ? 1 : 0;
                    } else {
                        return a[field.name] > b[field.name] ? -1 : a[field.name] < b[field.name] ? 1 : 0;
                    }
                });
            }
        },
        openDeleteVendorModal (vendor) {
            this.vendorToDelete = vendor
            this.deleteVendorModalOpen = true
        },
        formatLoadedData() {
            this.sortedVendors.forEach(vendor => {
                vendor.phone = formatValue(vendor.phone, 'phone')
                vendor.CNPJ = formatValue(vendor.CNPJ, 'cnpj')
            })
        },
    },
    async mounted() {
        //this.sortedVendors = this.getVendors
        await getVendors().then(res => {
            if (res.data.length > 0){
                this.sortedVendors = res.data
                this.formatLoadedData()
            }
        })
    },
    watch: {
        searchText: {
            handler: function (val) {
                if (val === '') {
                    this.sortedVendors = this.getVendors
                } else {
                    this.sortedVendors = this.getVendors.filter(vendors => {
                        //match id, company name, fantasy name or email
                        return vendors.idVendor.toString().includes(val) || vendors.companyName.toLowerCase().includes(val.toLowerCase()) || vendors.fantasyName.toLowerCase().includes(val.toLowerCase()) || vendors.User.email.toLowerCase().includes(val.toLowerCase())
                    })
                }
            },
            deep: true
        }
    }
    
}
</script>
<style lang="less">
.vendors-list {
    .v-list-header {
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        gap: 10px;
        align-items: center;
        padding: 10px;
        margin-top: 20px;
        
        h2 {
            font-size: 18px;
            font-weight: 500;
        }

        .v-header-item {
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

    .vendors {
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        gap: 10px;
        align-items: center;
        padding: 10px;
        margin-top: 20px;
        border-bottom: 1px solid #ccc;

        h2 {
            font-size: 16px;
            font-weight: 400;
        }

        i {
            cursor: pointer;
            color: #9E4343;
        }

        &:last-child {
            border-bottom: none;
        }
    }
}

.delete-vendor-modal {
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