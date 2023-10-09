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
                        @input="field.input && this[field.input]($event)"
                    >
                </div>
            </div>
        </div>

        <div class="submit-button">
            <button @click="submitForm">Cadastrar</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { registerCustomer } from '../../controllers/CustomerController'

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
                        ref: 'CPF',
                        label: 'CPF', 
                        type: 'text',
                        placeholder: 'CPF',
                        required: true
                    },
                    {
                        ref: 'phone',
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
                        required: true
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
                        required: true
                    },
                    {
                        ref: 'street',
                        label: 'Logradouro', 
                        type: 'text',
                        placeholder: 'Logradouro',
                        value: '',
                        required: true
                    },
                    {
                        ref: 'number',
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
            if (cep.length >= 8) {
                await axios.get(`https://viacep.com.br/ws/${cep}/json/`).then((resp) => {
                    console.log(resp.data)
                    this.formData.cep = resp.data.cep;
                    this.formData.street = resp.data.logradouro;
                    this.formData.city = resp.data.localidade;
                    this.formData.state = resp.data.uf;
                }).catch(err => {
                    console.log(err);
                });
            }
        },
        submitForm: async function () {
            const customer = { ...this.formData }
            delete customer.passwordConfirmation

            await registerCustomer(customer).then((res) => {
                console.log(res)
                if (res) {
                    this.$toast.open({
                        message: 'Cadastro realizado com sucesso! Faça login para continuar.',
                        type: 'success',
                        duration: 5000,
                        position: 'top-right'
                    });
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
            })
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
