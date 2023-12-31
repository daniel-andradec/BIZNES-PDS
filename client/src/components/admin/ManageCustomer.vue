<template>
    <div>
        <div class="customers-list" v-if="sortedCustomers.length > 0">
            <div class="c-list-header">
                <div class="c-header-item" v-for="(field, fkey) in listFields" :key="fkey" :class="{ 'header-item-sort': field.sort }" @click="sortCustomers(field)">
                    <h2>{{ field.display }}</h2>
                    <i class="fa-solid fa-sort" v-if="field.sort"></i>
                </div>
            </div>

            <div class="customers" v-for="(customer, ckey) in sortedCustomers" :key="ckey">
                <h2>{{ customer.idCustomer }}</h2>
                <h2>{{ customer.User.name }}</h2>
                <h2>{{ customer.birthDate }}</h2>
                <h2>{{ customer.CPF }}</h2>
                <h2>{{ customer.User.Address.city }}/{{ customer.User.Address.state }}</h2>
                <h2>{{ customer.User.email }}</h2>
                <i class="fa-solid fa-trash red" @click="openDeleteCustomerModal(customer)" data-testid="delete-customer-button">
                </i>
            </div>
        </div>

        <div class="not-found" v-else>
            <h2>Não foram encontrados resultados.</h2>
        </div>

        <ModalComponent :modalOpen="deleteCustomerModalOpen" @closeModal="deleteCustomerModalOpen = false">
            <div class="delete-customer-modal">
                <i class="fa-solid fa-trash fa-xl"></i>
                <h2>Tem certeza que deseja <b>excluir</b> o cliente {{ customerToDelete.name }}?</h2>
                <div class="delete-buttons">
                    <button class="btn btn-primary" @click="deleteCustomerModalOpen = false">Cancelar</button>
                    <button class="btn btn-danger" @click="deleteCustomer" data-testid="delete-customer-confirm">
                        Excluir</button>
                </div>
            </div>
        </ModalComponent>

    </div>  
</template>

<script>
import ModalComponent from '../modals/ModalComponent.vue'

import { mapGetters } from 'vuex'
import moment from 'moment'
import { getCustomers, deleteCustomer } from '@/controllers/AdminController'
import { formatValue } from '@/libs/Util'

export default {
    name: 'ManageCustomer',
    props: ['searchText'],
    components: {
        ModalComponent
    },
    data() {
        return {
            listFields: [
                {
                    display: 'ID',
                    name: 'idCustomer',
                    sort: true
                },
                {
                    display: 'Nome',
                    name: 'name',
                    sort: true
                },
                
                {
                    display: 'Nascimento',
                    name: 'birthDate',
                    sort: true
                },
                {
                    display: 'CPF',
                    name: 'cpf'
                },
                {
                    display: 'Cidade/UF',
                    name: 'city'
                },
                {
                    display: 'E-mail',
                    name: 'email'
                },
                {
                    display: 'Ações'
                }
            ],
            sortedCustomers: [],
            isSorted: false,
            deleteCustomerModalOpen: false,
            customerToDelete: {}
        }
    },
    computed: {
        ...mapGetters(['getCustomers'])
    },
    methods: {
        sortCustomers(field) {
            if (field.sort) {
                this.isSorted = !this.isSorted;

                 if (field.name === 'birthDate') {
                    this.sortedCustomers.sort((a, b) => {
                        const dateA = moment(a[field.name]);
                        const dateB = moment(b[field.name]);

                        if (this.isSorted) {
                            return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
                        } else {
                            return dateA.isAfter(dateB) ? -1 : dateA.isBefore(dateB) ? 1 : 0;
                        }
                    });
                 } else if (field.name === 'name') {
                    this.sortedCustomers.sort((a, b) => {
                        if (this.isSorted) {
                            return a.User[field.name] < b.User[field.name] ? -1 : a.User[field.name] > b.User[field.name] ? 1 : 0;
                        } else {
                            return a.User[field.name] > b.User[field.name] ? -1 : a.User[field.name] < b.User[field.name] ? 1 : 0;
                        }
                    });
                } else {
                    this.sortedCustomers.sort((a, b) => {
                        if (this.isSorted) {
                            return a[field.name] < b[field.name] ? -1 : a[field.name] > b[field.name] ? 1 : 0;
                        } else {
                            return a[field.name] > b[field.name] ? -1 : a[field.name] < b[field.name] ? 1 : 0;
                        }
                    });
                }
            }
        },
        openDeleteCustomerModal (customer) {
            this.customerToDelete = customer
            this.deleteCustomerModalOpen = true
        },
        formatLoadedData () {
            this.sortedCustomers.forEach(customer => {
                customer.CPF = formatValue(customer.CPF, 'cpf')
                customer.birthDate = moment(customer.birthDate).format('DD/MM/YYYY')
            })
        },
        async deleteCustomer () {
            await deleteCustomer(this.customerToDelete.idCustomer).then(async res => {
                if (res.status === 204) {
                    await getCustomers().then(res => {
                        if (res.data.length > 0){
                            this.sortedCustomers = res.data
                            this.formatLoadedData()
                        } 
                    })
                    this.deleteCustomerModalOpen = false
                    this.$toast.open({
                        message: 'Cliente excluído com sucesso.',
                        type: 'success',
                        position: 'top-right'
                    })
                }
            })
            .catch(() => {
                this.deleteCustomerModalOpen = false
                this.$toast.open({
                    message: 'Não foi possível excluir o cliente.',
                    type: 'error',
                    position: 'top-right'
                })
            })
        }
    },
    async mounted() {
        //this.sortedCustomers = this.getCustomers
        await getCustomers().then(res => {
            if (res.data.length > 0){
                this.sortedCustomers = res.data
                this.formatLoadedData()
            } 
        })

    },
    watch: {
        searchText: {
            handler: function (val) {
                if (val === '') {
                    this.sortedCustomers = this.getCustomers
                } else {
                    this.sortedCustomers = this.getCustomers.filter(customer => {
                        // return customer.name.toLowerCase().includes(val.toLowerCase()) 
                        // match id, or name, or email
                        return customer.idCustomer.toString().includes(val) || customer.User.name.toLowerCase().includes(val.toLowerCase()) || customer.User.email.toLowerCase().includes(val.toLowerCase())
                    })
                }
            },
            deep: true
        }
    }
    
}
</script>
<style lang="less">
.customers-list {
    .c-list-header {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 10px;
        align-items: center;
        padding: 10px;
        margin-top: 20px;
        
        h2 {
            font-size: 18px;
            font-weight: 500;
        }

        .c-header-item {
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

    .customers {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
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
.delete-customer-modal {
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