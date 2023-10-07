<template>
    <div class="customer-profile-reg">
        <p><span>*</span> Campos obrigatórios</p>

        <div v-for="(fields, section) in sections" :key="section" class="section">
            <h2>{{ section }}</h2>
            <div class="section-container">
                <div 
                    v-for="field in fields" 
                    :key="field.label" 
                    class="section-field"
                >
                    <div class="field-label">
                        <label :for="field.ref" :class="{ required: field.required }">
                            {{ field.label }}
                        </label>
                        <p v-if="field.changeButton" class="change-password" @click="passwordModalOpen = true">Alterar</p>
                    </div>
                    <input 
                        :id="field.ref" 
                        :type="field.type" 
                        :placeholder="field.placeholder"
                        v-model="formData[field.ref]"
                        :disabled="field.disable"
                        @input="field.input && this[field.input]($event)"
                    >
                </div>
            </div>
        </div>

        <div class="submit-button">
            <button @click="submitForm">Salvar</button>
        </div>

        <ModalComponent :modalOpen="passwordModalOpen" @closeModal="passwordModalOpen = false">
            <div class="update-password-modal">
                <h2>Alterar senha</h2>
                <div class="change-password-container">
                    <div class="password-fields">
                        <label for="password">Senha Atual</label>
                        <input  id="password" type="password" placeholder="Nova senha" v-model="passwordData.password">
                        
                        <label for="newPassword">Nova Senha</label>
                        <input  id="newPassword" type="password" placeholder="Nova senha" v-model="passwordData.newPassword">

                        <label for="confirmPassword">Confirmar Senha</label>
                        <input  id="confirmPassword" type="password" placeholder="Confirmar senha" v-model="passwordData.confirmPassword">
                    </div>
                </div>
                <div class="submit-button-pss">
                    <button @click="updatePassword()">Alterar</button>
                </div>
            </div>
        </ModalComponent>
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import moment from 'moment'
import ModalComponent from '@/components/modals/ModalComponent.vue'

export default {
    name: 'CustomerProfileReg',
    components: {
        ModalComponent
    },
    data() {
        return {
            sections: {
                'Dados Pessoais': [
                    {
                        ref: 'name',
                        label: 'Nome Completo',
                        type: 'text',
                        placeholder: 'Nome Completo',
                        required: true
                    },
                    {
                        ref: 'birthDate',
                        label: 'Data de Nascimento', 
                        type: 'date',
                        placeholder: '',
                        required: true
                    },
                    {
                        ref: 'cpf',
                        label: 'CPF', 
                        type: 'text',
                        placeholder: 'CPF',
                        required: true,
                        disable: true
                    },
                    {
                        ref: 'cellphone',
                        label: 'Celular', 
                        type: 'tel',
                        placeholder: 'Celular',
                        required: true
                    }
                ],
                'Dados de acesso': [
                    {
                        ref: 'email',
                        label: 'E-mail', 
                        type: 'email',
                        placeholder: 'E-mail',
                        required: true
                    },
                    {
                        ref: 'password',
                        label: 'Senha', 
                        type: 'password',
                        placeholder: 'Senha',
                        required: true,
                        changeButton: true,
                        disable: true
                    }
                ],
                'Endereço': [
                    {
                        ref: 'cep',
                        label: 'CEP', 
                        type: 'text',
                        placeholder: 'CEP',
                        input: 'calcCEP',
                        value: '',
                        required: true
                    },
                    {
                        ref: 'addressName',
                        label: 'Logradouro', 
                        type: 'text',
                        placeholder: 'Logradouro',
                        value: '',
                        required: true
                    },
                    {
                        ref: 'addressNumber',
                        label: 'Número', 
                        type: 'text',
                        placeholder: 'Número',
                        required: true
                    },
                    {
                        ref: 'complement',
                        label: 'Complemento', 
                        type: 'text',
                        placeholder: 'Complemento'
                    },
                    {
                        ref: 'city',
                        label: 'Município', 
                        type: 'text',
                        placeholder: 'Município',
                        required: true
                    },
                    {
                        ref: 'state',
                        label: 'UF', 
                        type: 'text',
                        placeholder: 'UF',
                        required: true
                    },
                    {
                        ref: 'neighborhood',
                        label: 'Bairro', 
                        type: 'text',
                        placeholder: 'Bairro',
                        required: true
                    }
                ]
            },
            formData: {
                name: '',
                birthDate: '',
                cpf: '',
                cellphone: '',
                email: '',
                password: '',
                cep: '',
                addressName: '',
                addressNumber: '',
                complement: '',
                city: '',
                state: '',
                neighborhood: ''
            },
            passwordData: {
                password: '',
                newPassword: '',
                confirmPassword: ''
            },
            passwordModalOpen: false
        }
    },
    computed: {
        ...mapGetters(['getCustomerData'])
    },
    methods: {
        async calcCEP(event) {
            const cep = event.target.value;
            if (cep.length >= 8) {
                await axios.get(`https://viacep.com.br/ws/${cep}/json/`).then((resp) => {
                    console.log(resp.data)
                    this.formData.cep = resp.data.cep;
                    this.formData.addressName = resp.data.logradouro;
                    this.formData.city = resp.data.localidade;
                    this.formData.state = resp.data.uf;
                }).catch(err => {
                    console.log(err);
                });
            }
        },
        submitForm() {
            console.log(this.formData);
            // Aqui você pode fazer o que quiser com os dados, como enviá-los para uma API
        },
        updatePassword() {
            console.log(this.passwordData)
            if (!this.passwordData.password || !this.passwordData.newPassword || !this.passwordData.confirmPassword) {
                this.$toast.open({
                    message: 'Preencha todos os campos obrigatórios',
                    type: 'warning',
                    duration: 5000,
                    position: 'top-right'
                });
                return;
            }

            if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
                this.$toast.open({
                    message: 'As senhas não coincidem',
                    type: 'warning',
                    duration: 5000,
                    position: 'top-right'
                });
                return;
            }

            // todo: enviar para a API a senha atual e a nova senha
        }
    },
    mounted() {
        console.log (this.getCustomerData);
        if (this.getCustomerData) {
            this.formData.name = this.getCustomerData.name;
            this.formData.birthDate = moment(this.getCustomerData.birthDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
            this.formData.cpf = this.getCustomerData.cpf;
            this.formData.cellphone = this.getCustomerData.phone;
            this.formData.email = this.getCustomerData.email;
            this.formData.cep = this.getCustomerData.address.zipCode;
            this.formData.addressName = this.getCustomerData.address.street;
            this.formData.addressNumber = this.getCustomerData.address.number;
            this.formData.complement = this.getCustomerData.address.complement;
            this.formData.city = this.getCustomerData.address.city;
            this.formData.state = this.getCustomerData.address.state;
            this.formData.neighborhood = this.getCustomerData.address.neighborhood;
            this.formData.password = this.getCustomerData.passwordMD5;
        }
    }
}
</script>

<style lang="less">
.customer-profile-reg {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    background: #fff;
    margin: 20px 50px 0px 50px;
    border-radius: 5px;

    h1 {
        font-weight: 600;
        margin-top: 50px;
    }

    p {
        text-align: left;
        font-size: 20px;

        span {
            color: var(--primaryColor);
        }
    }

    h2 {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 20px;
    }

    .section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        h2 {
            align-self: flex-start;
        }
    }

    .section-container {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 20px;
        align-items: center;
        justify-content: center;
        width: 50vw;

        .section-field {
            padding-bottom: 20px;

            .field-label {
                display: flex;
                justify-content: space-between;
                align-items: center;
                p {
                    color: var(--primaryColor);
                    font-size: 16px;
                    cursor: pointer;
                    margin-right: 20px;
                }
            }

            label {
                margin-bottom: 5px;
                font-weight: 500;
                text-align: left;
                &.required:after {
                    content: '*';
                    color: var(--primaryColor);
                    margin-left: 5px;
                }
            }

           

            .change-password {
                color: var(--primaryColor);
                font-size: 16px;
                cursor: pointer;
                margin: 0px;
            }
    
            input {
                padding: 10px 15px;
                border: 1px solid #ccc;
                border-radius: 4px;
                font-size: 16px;
                margin: 10px 20px 10px 0px;
                width: 12vw;
    
                &:focus {
                    outline: none;
                    border-color: var(--primaryColor);
                }
            }
        }
    }

    .submit-button {
        margin-bottom: 50px;

        button {
            width: 425px;
            height: 50px;
            border-radius: 5px;
            border: none;
            background-color: var(--primaryColor);
            color: #FFFFFF;
            font-size: 20px;
            font-weight: bold;
            cursor: pointer;
            margin: 30px 0px;
        }
    }

    .update-password-modal {
        .password-fields {
            display: flex;
            flex-direction: column;
            justify-content: center;

            label {
                margin-bottom: 5px;
                font-weight: 500;
                text-align: left;
                &:after {
                    content: '*';
                    color: var(--primaryColor);
                    margin-left: 5px;
                }
            }
    
            input {
                padding: 10px 15px;
                border: 1px solid #ccc;
                border-radius: 4px;
                font-size: 16px;
                margin: 10px 0px 20px 0px;
                width: 300px;
    
                &:focus {
                    outline: none;
                    border-color: var(--primaryColor);
                }
            }
        }

        .submit-button-pss {
            button {
                width: 200px;
                height: 50px;
                border-radius: 5px;
                border: none;
                background-color: var(--primaryColor);
                color: #FFFFFF;
                font-size: 20px;
                font-weight: bold;
                cursor: pointer;
                margin: 30px 0px;
            }
        }
    }
}

</style>
