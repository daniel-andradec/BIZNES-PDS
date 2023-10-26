<template>
    <div class="customer-register">
        <h1>Crie sua nova conta no Biznes</h1>
        <p><span>*</span> Campos obrigatórios</p>

        <div v-for="(fields, section) in sections" :key="section" class="section">
            <h2>{{ section }}</h2>
            <div class="section-container">
                <div 
                    v-for="field in fields" 
                    :key="field.label" 
                    class="section-field"
                >
                    <label :for="field.ref" :class="{ required: field.required }">{{ field.label }}</label>
                    <input 
                        :id="field.ref" 
                        :type="field.type" 
                        :placeholder="field.placeholder"
                        v-model="formData[field.ref]"
                        @input="field.input && this[field.input]($event); formatValue($event, field.format)" />
                </div>
            </div>
        </div>

        <div class="submit-button">
            <button @click="submitForm">Cadastrar</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import { registerCustomer } from '../../controllers/CustomerController'
import { formatValue } from '@/libs/Util'

export default {
    name: 'CustomerRegisterComponent',
    data() {
        return {
            sections: {
                'Dados Pessoais': [
                    {
                        ref: 'name',
                        label: 'Nome Completo',
                        type: 'text',
                        placeholder: 'Nome Completo',
                        required: true,
                        minSize: 3
                    },
                    {
                        ref: 'birthDate',
                        label: 'Data de Nascimento', 
                        type: 'date',
                        placeholder: '',
                        required: true
                    },
                    {
                        ref: 'CPF',
                        label: 'CPF', 
                        type: 'text',
                        placeholder: 'CPF',
                        required: true,
                        format: 'cpf',
                        minSize: 11
                    },
                    {
                        ref: 'phone',
                        label: 'Celular', 
                        type: 'tel',
                        placeholder: 'Celular',
                        required: true,
                        format: 'cellphone',
                        minSize: 3
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
                        minSize: 6
                    },
                    {
                        ref: 'passwordConfirmation',
                        label: 'Confirmar Senha', 
                        type: 'password',
                        placeholder: 'Confirmar Senha',
                        required: true
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
                name: '',
                birthDate: '',
                CPF: '',
                phone: '',
                email: '',
                password: '',
                passwordConfirmation: '',
                cep: '',
                street: '',
                number: '',
                complement: '',
                city: '',
                state: '',
                neighborhood: ''
            }
        }
    },
    methods: {
        async calcCEP(event) {
            const cep = event.target.value;
            if (cep.length >= 8 && cep.length <= 9) {
                await axios.get(`https://viacep.com.br/ws/${cep}/json/`).then((resp) => {
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
                    this.$toast.open({
                        message: 'CEP não encontrado. Verifique o CEP e tente novamente.',
                        type: 'error',
                        duration: 3000,
                        position: 'top-right'
                    });
                    event.target.value = '';
                });
            }
        },
        submitForm: async function () {
            if (!this.validateFields()) return
            this.sanitizeData()

            const customer = { ...this.formData }
            delete customer.passwordConfirmation

            console.log(customer)

            await registerCustomer(customer).then((res) => {
                if (!res.error) {
                    this.$toast.open({
                        message: 'Cadastro realizado com sucesso! Faça login para continuar.',
                        type: 'success',
                        duration: 5000,
                        position: 'top-right'
                    });
                    if (this.$route.params.redirect) {
                        this.$router.push({ name: 'login', params: { redirect: this.$route.params.redirect } })
                    } 
                    else
                        this.$router.push('/login')
                } else {
                    this.$toast.open({
                        message: 'Erro ao cadastrar usuário. Verifique os dados e tente novamente.',
                        type: 'error',
                        duration: 5000,
                        position: 'top-right'
                    });
                }
            }).catch(err => {
                console.log(err)
                this.$toast.open({
                    message: 'Erro ao cadastrar usuário. Verifique os dados e tente novamente.',
                    type: 'error',
                    duration: 5000,
                    position: 'top-right'
                });
            })
        },
        formatValue: function (event, format) { // formats value on input to be displayed nicely
            if (!format) return
            const value = event.target.value
            event.target.value = formatValue(value, format)
            this.formData[event.target.id] = event.target.value
        },
        validateFields: function () { // check if fields are valid
            // validate required fields
            const fields = this.sections
            let valid = true
            for (const section in fields) {
                for (const field of fields[section]) {
                    if (field.required && !this.formData[field.ref]) {
                        valid = false
                        this.$toast.open({
                            message: `O campo ${field.label} é obrigatório.`,
                            type: 'error',
                            duration: 3000,
                            position: 'top-right'
                        });
                    }
                }
            }

            // validate minSize fields
            for (const section in fields) {
                for (const field of fields[section]) {
                    if (field.minSize && this.formData[field.ref].length < field.minSize) {
                        valid = false
                        this.$toast.open({
                            message: `O campo ${field.label} deve ter no mínimo ${field.minSize} caracteres.`,
                            type: 'error',
                            duration: 3000,
                            position: 'top-right'
                        });
                    }
                }
            }

            // validate password confirmation
            if (this.formData.password !== this.formData.passwordConfirmation) {
                valid = false
                this.$toast.open({
                    message: 'As senhas não coincidem.',
                    type: 'error',
                    duration: 3000,
                    position: 'top-right'
                });
            }

            // validate if birthDate is not in the future
            const birthDate = moment(this.formData.birthDate)
            const today = moment()
            if (birthDate > today) {
                valid = false
                this.$toast.open({
                    message: 'Data de nascimento inválida.',
                    type: 'error',
                    duration: 3000,
                    position: 'top-right'
                });
            }

            return valid
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
    }
}
</script>

<style lang="less">
.customer-register {
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
        width: 70vw;

        .section-field {
            padding-bottom: 20px;

            label {
                display: block;
                margin-bottom: 5px;
                font-weight: 500;
                text-align: left;
                &.required:after {
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
}

</style>
