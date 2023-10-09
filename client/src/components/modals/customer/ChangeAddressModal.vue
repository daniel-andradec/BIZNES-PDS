<template>
    <div class="change-address-modal">
        <ModalComponent :modalOpen="modalOpen" @closeModal="$emit('closeModal')">
            <h2> Alterar o endereço de entrega </h2>
            <p><span>*</span> Campos Obrigatórios</p>

            <div class="section-container-address">
                <div 
                    v-for="field in addressData" 
                    :key="field.label" 
                    class="section-field-address"
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

            <div class="submit-button">
                <button @click="submit">Alterar</button>
            </div>
        </ModalComponent>
    </div>
</template>

<script>
import ModalComponent from '@/components/modals/ModalComponent.vue'
import axios from 'axios';

export default {
    name: 'ChangeAddressModal',
    components: {
        ModalComponent
    },
    props: ['modalOpen'],
    emits: ['closeModal', 'updateAddress'],
    data() {
        return {
            addressData: [
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
            ],
            formData: {
                cep: '',
                addressName: '',
                addressNumber: '',
                complement: '',
                city: '',
                state: '',
                neighborhood: ''
            }
        }
    },
    methods: {
        submit() {
            // verifica se todos os campos foram preenchidos
            const fields = this.addressData.filter(field => field.required);
            const fieldsFilled = fields.every(field => this.formData[field.ref] !== '');
            if (!fieldsFilled) {
                this.$toast.open({
                    message: 'Preencha todos os campos obrigatórios',
                    type: 'warning',
                    duration: 5000,
                    position: 'top-right'
                });
                return;
            }

            this.$emit('updateAddress', this.formData);
        },
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
        }
    }
}
</script>

<style lang="less">
.change-address-modal {
    h2 {
        font-weight: 500;
        margin-bottom: 20px;
    }

    p {
        margin-bottom: 20px;
        text-align: left;

        span {
            color: var(--primaryColor);
        }
    }
    
    .section-container-address {
        display: grid;
        grid-template-columns: repeat(2, 1fr);

        .section-field-address {
            padding-bottom: 20px;
            margin: 0px 10px;

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
                width: 180px;
    
                &:focus {
                    outline: none;
                    border-color: var(--primaryColor);
                }
            }
        }
    }

    .submit-button {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;

        button {
            padding: 10px 15px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 16px;
            width: 180px;
            background-color: var(--primaryColor);
            color: #fff;
            cursor: pointer;
        }
    }
}
    
</style>