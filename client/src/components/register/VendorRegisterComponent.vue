<template>
    <div class="vendor-register">
        <h1>Cadastre sua loja no Biznes</h1>
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

        <div class="section">
            <h2>Política de Devolução</h2>
            <div class="section-container">
                <div class="section-field">
                    <label for="returnPolicy" class="required">Política de devolução (será informada ao consumidor)</label>
                    <textarea name="returnPolicy" id="returnPolicy" cols="30" rows="10" v-model="formData['returnPolicy']"></textarea>
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

export default {
    name: 'CustomerRegisterComponent',
    data() {
        return {
            sections: {
                'Cadastro da Loja': [
                    {
                        ref: 'companyName',
                        label: 'Razão Social',
                        type: 'text',
                        placeholder: 'Razão Social',
                        required: true
                    },
                    {
                        ref: 'tradingName',
                        label: 'Nome Fantasia',
                        type: 'text',
                        placeholder: 'Nome Fantasia',
                        required: true
                    },
                    {
                        ref: 'phone',
                        label: 'Telefone', 
                        type: 'tel',
                        placeholder: '',
                        required: true
                    },
                    {
                        ref: 'cnpj',
                        label: 'CNPJ', 
                        type: 'text',
                        placeholder: 'CNPJ',
                        required: true
                    }
                ],
                'Dados de acesso': [
                    {
                        ref: 'login',
                        label: 'Login', 
                        type: 'text',
                        placeholder: 'Login',
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
                companyName: '',
                tradingName: '',
                cnpj: '',
                phone: '',
                login: '',
                password: '',
                passwordConfirmation: '',
                cep: '',
                addressName: '',
                addressNumber: '',
                complement: '',
                city: '',
                state: '',
                neighborhood: '',
                returnPolicy: ''

            },
            imagePreviewUrl: ''
        }
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
        }
    }
}
</script>

<style lang="less">
.vendor-register {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    background: #fff;
    margin: 20px 50px 0px 50px;
    border-radius: 5px;

    .file-input-container {
        background-color: blue;
        display: flex;
        flex-direction: column;
        align-items: center;

        .image-preview {
            width: 100px; /* Defina o tamanho desejado para o preview da imagem */
            height: 100px; /* Defina o tamanho desejado para o preview da imagem */
            margin-top: 10px;
            overflow: hidden;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        input[type="file"] {
            border: none;
            background: #fff;
        }
    }

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
        width: 100vw;
        align-items: center;
        justify-content: center;
        width: 50vw;

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

</style>
