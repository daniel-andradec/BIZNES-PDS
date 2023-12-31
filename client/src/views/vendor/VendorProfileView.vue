<template>
    <div class="vendor-profile-view">
        <div class="header">
            <VendorHeader />
        </div>

        <VendorMenu />

        <div class="list-header">
            <div class="vendor-menu-bars">
                <i class="fas fa-bars" @click="toggleVendorMenu"></i>
            </div>
            <h1>Cadastro da Loja</h1>
        </div>

        <div class="vendor-register">
            <p><span>*</span> Campos obrigatórios</p>

            <div v-for="(fields, section) in sections" :key="section" class="section">
                <h2>{{ section }}</h2>
                <div class="section-containerc">
                    <div v-for="field in fields" :key="field.label" class="section-fieldc">
                        <div class="field-labelc">
                            <label :for="field.ref" :class="{ required: field.required }">
                                {{ field.label }}
                            </label>
                            <p v-if="field.changeButton" class="change-password" @click="passwordModalOpen = true">Alterar
                            </p>
                        </div>
                        <input 
                            :id="field.ref" 
                            :type="field.type" 
                            :placeholder="field.placeholder"
                            v-model="formData[field.ref]" 
                            :disabled="field.disable"
                            @input="field.input && this[field.input]($event); formatValue($event, field.format)"
                            >
                    </div>
                </div>
            </div>

            <div class="section">
                <h2>Política de Devolução</h2>
                <div class="section-container">
                    <div class="section-field">
                        <label for="returnPolicy" class="required">Política de devolução (será informada ao
                            consumidor)</label>
                        <textarea name="returnPolicy" id="returnPolicy" cols="30" rows="10"
                            v-model="formData['devolutionPolicy']"></textarea>
                    </div>
                </div>
            </div>

            <div class="submit-button">
                <button @click="submitForm">Salvar</button>
            </div>
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
import VendorHeader from '@/components/headers/VendorHeader.vue';
import VendorMenu from '@/components/menus/VendorMenu.vue';
import ModalComponent from '@/components/modals/ModalComponent.vue';
import { mapActions, mapGetters } from 'vuex';
import { getVendorData, updateVendorData } from '@/controllers/VendorController';
import { updatePassword } from '@/controllers/UserController';
import { formatValue } from '@/libs/Util'
import axios from 'axios';

export default {
    name: 'VendorProfileView',
    components: {
        VendorHeader,
        VendorMenu,
        ModalComponent
    },
    data() {
        return {
            sections: {
                'Dados da Loja': [
                    {
                        ref: 'companyName',
                        label: 'Razão Social',
                        type: 'text',
                        placeholder: 'Razão Social',
                        required: true,
                        minSize: 3
                    },
                    {
                        ref: 'fantasyName',
                        label: 'Nome Fantasia',
                        type: 'text',
                        placeholder: 'Nome Fantasia',
                        required: true,
                        minSize: 3
                    },
                    {
                        ref: 'phone',
                        label: 'Telefone',
                        type: 'tel',
                        placeholder: '',
                        required: true,
                        format: 'phone',
                        minSize: 8
                    },
                    {
                        ref: 'cnpj',
                        label: 'CNPJ',
                        type: 'text',
                        placeholder: 'CNPJ',
                        required: true,
                        disable: true,
                        format: 'cnpj',
                        minSize: 14
                    }
                ],
                'Dados de acesso': [
                    {
                        ref: 'email',
                        label: 'E-mail',
                        type: 'text',
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
                        required: true,
                        format: 'cep'
                    },
                    {
                        ref: 'street',
                        label: 'Logradouro',
                        type: 'text',
                        placeholder: 'Logradouro',
                        value: '',
                        required: true,
                        minSize: 3
                    },
                    {
                        ref: 'number',
                        label: 'Número',
                        type: 'text',
                        placeholder: 'Número',
                        required: true,
                        format: 'number'
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
                companyName: '',
                fantasyName: '',
                cnpj: '',
                phone: '',
                email: '',
                password: '',
                cep: '',
                street: '',
                number: '',
                complement: '',
                city: '',
                state: '',
                neighborhood: '',
                devolutionPolicy: ''

            },
            passwordData: {
                password: '',
                newPassword: '',
                confirmPassword: ''
            },
            passwordModalOpen: false
        }
    },
    methods: {
        ...mapActions(['toggleVendorMenu']),
        async calcCEP(event) {
            const cep = event.target.value;
            if (cep.length >= 8 && cep.length <= 9) {
                await axios.get(`https://viacep.com.br/ws/${cep}/json/`).then((resp) => {
                    console.log(resp.data);
                    if (resp.data.erro) {
                        this.$toast.open({
                            message: 'CEP não encontrado. Verifique o CEP e tente novamente.',
                            type: 'error',
                            duration: 3000,
                            position: 'top-right'
                        });
                        event.target.value = '';
                        return
                    }
                    this.formData.cep = resp.data.cep;
                    this.formData.street = resp.data.logradouro;
                    this.formData.city = resp.data.localidade;
                    this.formData.state = resp.data.uf;
                    this.formData.neighborhood = resp.data.bairro;
                }).catch(() => {
                    console.log('Erro ao buscar CEP');
                    this.$toast.open({
                        message: 'CEP não encontrado. Verifique o CEP e tente novamente.',
                        type: 'error',
                        duration: 3000,
                        position: 'top-right'
                    });
                    event.target.value = '';
                });
            }

            console.log(this.formData);
        },
        submitForm() {
            if (!this.validateFields()) return;
            this.sanitizeData();
            
            const data = this.formData;
            delete data.password

            updateVendorData(data).then(() => {
                this.$toast.open({
                    message: 'Dados atualizados com sucesso',
                    type: 'success',
                    duration: 5000,
                    position: 'top-right'
                });

                this.formData.password = '********';
                this.formatLoadedData();
            }).catch(err => {
                console.log(err);
                this.$toast.open({
                    message: 'Erro ao atualizar dados',
                    type: 'error',
                    duration: 5000,
                    position: 'top-right'
                });
            });
        },
        async updatePassword() {
            if (!this.passwordData.password || !this.passwordData.newPassword || !this.passwordData.confirmPassword) {
                this.$toast.open({
                    message: 'Preencha todos os campos obrigatórios',
                    type: 'warning',
                    duration: 5000,
                    position: 'top-right'
                });
                return;
            }

            if (this.passwordData.newPassword.length < 6) {
                this.$toast.open({
                    message: 'A senha deve ter no mínimo 6 caracteres',
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

            await updatePassword(this.passwordData.password, this.passwordData.newPassword).then(() => {
                this.$toast.open({
                    message: 'Senha alterada com sucesso',
                    type: 'success',
                    duration: 5000,
                    position: 'top-right'
                });
                this.passwordModalOpen = false;
            }).catch(err => {
                console.log(err);
                this.$toast.open({
                    message: 'Senha incorreta.',
                    type: 'error',
                    duration: 5000,
                    position: 'top-right'
                });
            });
        },
        formatValue: function (event, format) { // formats value on input to be displayed nicely
            if (!format) return
            const value = event.target.value
            event.target.value = formatValue(value, format)
            this.formData[event.target.id] = event.target.value
        },
        formatLoadedData() {
            this.formData.cnpj = formatValue(this.formData.cnpj, 'cnpj')
            this.formData.phone = formatValue(this.formData.phone, 'phone')
            this.formData.cep = formatValue(this.formData.cep, 'cep')
        },
        validateFields() {
            const fields = this.sections
            for (const section in fields) {
                for (const field of fields[section]) {
                    if (field.required && !this.formData[field.ref]) {
                        this.$toast.open({
                            message: 'Preencha todos os campos obrigatórios',
                            type: 'warning',
                            duration: 5000,
                            position: 'top-right'
                        });
                        return false
                    }
                }
            }

            // validate minSize fields
            for (const section in fields) {
                for (const field of fields[section]) {
                    if (field.minSize && this.formData[field.ref].length < field.minSize) {
                        this.$toast.open({
                            message: `O campo ${field.label} deve ter no mínimo ${field.minSize} caracteres.`,
                            type: 'error',
                            duration: 3000,
                            position: 'top-right'
                        });
                        return false
                    }
                }
            }

            return true
        },
        sanitizeData: function () { // sanitize data before sending to backend - remove special characters, format dates, etc
            const fields = this.sections
            for (const section in fields) {
                for (const field of fields[section]) {
                    if (field.format) {
                        this.formData[field.ref] = formatValue(this.formData[field.ref], field.format, true) // true - sanitize
                    }
                }
            }
        }
    },
    computed: {
        ...mapGetters(['getVendorData'])
    },
    async mounted() {
        await getVendorData()
        if (this.getVendorData) {
            this.formData.companyName = this.getVendorData.companyName
            this.formData.fantasyName = this.getVendorData.fantasyName
            this.formData.phone = this.getVendorData.phone
            this.formData.cnpj = this.getVendorData.CNPJ
            this.formData.email = this.getVendorData.email
            this.formData.password = '********'
            this.formData.devolutionPolicy = this.getVendorData.devolutionPolicy
            this.formData.cep = this.getVendorData.address.cep
            this.formData.street = this.getVendorData.address.street
            this.formData.number = this.getVendorData.address.number
            this.formData.complement = this.getVendorData.address.complement
            this.formData.city = this.getVendorData.address.city
            this.formData.state = this.getVendorData.address.state
            this.formData.neighborhood = this.getVendorData.address.neighborhood

            this.formatLoadedData();
        }
    }
}
</script>

<style lang="less">
.vendor-profile-view {
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

    .vendor-register {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        align-items: center;
        margin: 20px 50px 0px 50px;

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

        .section-containerc {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 20px;
            align-items: center;
            justify-content: center;
            width: 70vw;

            .section-fieldc {
                padding-bottom: 20px;

                .field-labelc {
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
                    display: block;
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

                textarea {
                    padding: 10px 15px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    font-size: 16px;
                    margin-top: 10px;
                    width: 45vw;
                    height: 100px;

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