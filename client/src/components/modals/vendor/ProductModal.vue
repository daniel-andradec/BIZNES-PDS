<template>
    <div class="vendor-product-modal">
        <ModalComponent :modalOpen="modalOpen" @closeModal="$emit('closeModal')">
            <h2 v-if="!editProduct">Adicionar Produto</h2>
            <h2 v-else>Editar Produto</h2>
            
            <div class="top-fields">
                <div class="text-inputs">
                    <h3><span>*</span> Campos obrigatórios</h3>
                    <label for="name">Nome <span>*</span></label>
                    <input type="text" placeholder="Nome" required ref="name" />

                    <label for="description">Descrição <span>*</span></label>
                    <input type="text" placeholder="Descrição" required ref="description" />
                </div>
                <div class="image-input">
                    <label for="inputfile" class="add-image-label" v-if="!imagePreviewUrl">
                        Adicionar imagem
                    </label>
                    <input type="file" id="inputfile" @change="handleFileUpload" class="file-input" ref="inputfile" />
                    <div class="image-preview" v-if="imagePreviewUrl" @click="triggerFileInput">
                        <img :src="imagePreviewUrl" alt="Preview da imagem">
                        <h2>Alterar imagem</h2>
                    </div>
                </div>
            </div>

            <div class="middle-fields">
                <div>
                    <label for="price">Preço <span>*</span></label>
                    <input type="text" placeholder="Preço" required ref="price" @keypress="formatInput" />
                </div>

                <div>
                    <label for="quantity">Qtde. disponível <span>*</span></label>
                    <input type="text" placeholder="Quantidade" required ref="quantity" @keypress="formatInput" />
                </div>
            </div>

            <div class="bottom-fields">
                <div class="options-input" @keyup.enter="addOption()">
                    <label for="options">Opções <span @click="clearOptions">Limpar escolha</span></label>
                    <input type="text" placeholder="Opções" ref="options" />
                    <i class="fa fa-plus" @click="addOption()"></i>
                </div>

                <div class="category-input">
                    <label for="category">Categoria <span>*</span>
                    </label>
                    <input type="text" placeholder="Selecione" required ref="category" @click="openCategoryModal()"> 
                    <i class="fa fa-chevron-down" @click="openCategoryModal()"></i>
                </div>
            </div>

            <h2 id="info" v-if="chosenOptions.length < 1">Obs.: Para adicionar uma opção, digite o nome da opção e clique no botão de adicionar, uma por vez.</h2>

            <div class="chosen-options" v-if="chosenOptions.length > 0">
                <p>Opções selecionadas: </p>
                <text>{{ ' ' + chosenOptions.map((option) => option).join(', ') }}</text>
            </div>

            <div class="buttons">
                <button class="cancel" @click="this.$emit('closeModal')">Cancelar</button>
                <button class="save" @click="handleSave" v-if="!loading">Salvar</button>
                <div class="loading" v-else>
                    <i class="fa fa-spinner fa-spin"></i>
                    <h2>Salvando...</h2>
                </div>
            </div>
        </ModalComponent>
    </div>

    <CategoryModal :modalOpen="categoryModalOpen" @closeModal="categoryModalOpen = false" :categories="getCategories" @addCategories="handleCategories"/>
</template>

<script>
import ModalComponent from '../ModalComponent.vue'
import CategoryModal from '../CategoryModal.vue'
import { mapGetters } from 'vuex'
import { createProduct, updateProduct } from '@/controllers/vendor/VendorProductController'

export default {
    name: 'AddProductModal',
    components: {
        ModalComponent,
        CategoryModal
    },
    props: ['modalOpen', 'editProduct', 'product'],
    emits: ['closeModal', 'refreshProducts'],
    data() {
        return {
            imagePreviewUrl: null,
            imgFile: null,
            categoryModalOpen: false,
            chosenOptions: [],
            fileChanged: false,
            loading: false
        }
    },
    methods: {
        handleFileUpload(event) {
            const file = event.target.files[0];

            // verificar se imagem é jpg ou png
            if (file?.type !== 'image/jpeg' && file?.type !== 'image/png') {
                this.$toast.open({
                    message: 'Formato de imagem inválido. A imagem deve ser JPG ou PNG.',
                    type: 'warning',
                    position: 'top-right',
                    duration: 5000
                })
                return
            }

            if (file) {
                this.fileChanged = true
                const formData = new FormData()
                formData.append('photo', file)
                this.imagePreviewUrl = URL.createObjectURL(file);
                this.imgFile = file
            }
        },
        triggerFileInput() {
            this.$refs.inputfile.click()
        },
        openCategoryModal() {
            this.categoryModalOpen = true
        },
        handleCategories(categories) {
            this.categoryModalOpen = false
            console.log(categories)
            // puts the category names in the input
            this.$refs.category.value = categories.map((cat) => cat.name).join(', ')
        },
        addOption() {
            const option = this.$refs.options.value
            if (option) {
                this.chosenOptions.push(option)
                this.$refs.options.value = ''
            }
        },
        handleSave(){
            if (this.editProduct) {
                this.editProductFunc()
            }
            else {
                this.addProduct()
            }
        },
        clearOptions() {
            this.chosenOptions = []
        },
        async addProduct() {
            const name = this.$refs.name.value
            const description = this.$refs.description.value
            const price = this.$refs.price.value
            const quantity = this.$refs.quantity.value
            const options = this.chosenOptions.map((option) => option).join(', ')
            const category = this.$refs.category.value
            let img = this.imgFile

            if (!img) {
                // img is the image no-image in src/assets/images
                img = new File([await (await fetch(require('@/assets/images/no-image.png'))).blob()], 'no-image.png', { type: 'image/png' })

                this.$toast.open({
                    message: 'Recomendamos que adicione uma imagem ao produto.',
                    type: 'warning',
                    position: 'top-right',
                    duration: 5000
                })
            }

            
            if (name && description && price && quantity && category) {
                // add product to database
                // todo
                const data = {
                    name,
                    description,
                    price,
                    quantity,
                    options,
                    category
                }

                this.loading = true
                await createProduct(data, img).then(() => {
                    this.$toast.open({
                        message: 'Produto adicionado com sucesso',
                        type: 'success',
                        position: 'top-right',
                        duration: 5000
                    })
                    this.$emit('refreshProducts')
                }).catch(() => {
                    this.$toast.open({
                        message: 'Erro ao adicionar produto',
                        type: 'error',
                        position: 'top-right',
                        duration: 5000
                    })
                })

                this.loading = false
            }
            else {
                this.$toast.open({
                    message: 'Preencha todos os campos obrigatórios',
                    type: 'warning',
                    position: 'top-right',
                    duration: 5000
                })
            }
        },
        async editProductFunc() {
            const id = this.product.idProduct
            const name = this.$refs.name.value
            const description = this.$refs.description.value
            const price = this.$refs.price.value
            const quantity = this.$refs.quantity.value
            const options = this.chosenOptions.map((option) => option).join(', ')
            const category = this.$refs.category.value
            const img = this.imgFile

            if (name && description && price && quantity && category) {
                // edit product in database
                const data = {
                    name,
                    description,
                    price,
                    quantity,
                    options,
                    category
                }

                this.loading = true
                await updateProduct(id, data, img).then(() => {
                    this.$toast.open({
                        message: 'Produto editado com sucesso',
                        type: 'success',
                        position: 'top-right',
                        duration: 5000
                    })
                    this.$emit('refreshProducts')
                }).catch(() => {
                    this.$toast.open({
                        message: 'Erro ao editar produto',
                        type: 'error',
                        position: 'top-right',
                        duration: 5000
                    })
                })

                this.loading = false
            }
            else {
                this.$toast.open({
                    message: 'Preencha todos os campos obrigatórios',
                    type: 'warning',
                    position: 'top-right',
                    duration: 5000
                })
            }
        },
        formatInput(event) {
            const charCode = (event.which) ? event.which : event.keyCode;
            const value = event.target.value + event.key; // Obtém o valor atual do input mais a tecla pressionada

            // Verifica se o valor é um número float válido
            if (!/^(\d+\.?\d*|\.\d+)$/.test(value) && charCode > 31) {
                event.preventDefault(); // Previne a entrada se não for um número float válido
            }
        }
    },
    computed: {
        ...mapGetters(['getCategories'])
    },
    // watch for changes in editProduct prop
    watch: {
        editProduct: {
            handler: function (newVal) {
                if (newVal) {
                    this.$nextTick(() => { 
                        this.fileChanged = false
                        if (this.$refs.name && this.$refs.description && this.$refs.price && this.$refs.quantity && this.$refs.category) {
                            this.$refs.name.value = this.product.name
                            this.$refs.description.value = this.product.description
                            this.$refs.price.value = this.product.price
                            this.$refs.quantity.value = this.product.quantity
                            this.$refs.category.value = this.product.category
                            this.imagePreviewUrl = this.product.photo
                            this.chosenOptions = this.product.options !== '' ? this.product.options.split(', ') : []
                        }
                    });
                }
            },
            deep: true
        },
        modalOpen: {
            handler: function () {
                if (!this.editProduct) {
                    this.$nextTick(() => { 
                        this.fileChanged = false
                        this.imagePreviewUrl = null
                        this.chosenOptions = []
                    });
                }
            },
            deep: true
        }
    }
    
}
</script>

<style lang="less">
.vendor-product-modal {
    * {
        box-sizing: border-box;
    } 

    h2 {
        font-size: 20px;
        font-weight: 500;
    }
    h3 {
        font-size: 12px;
        font-weight: 500;
        text-align: left;
        span {
            color: var(--primaryColor);
        }
    }

    label {
        font-size: 12px;
        font-weight: 500;
        text-align: left;
        margin-bottom: 10px;
        span {
            color: var(--primaryColor);
        }
    }

    input {
        width: 100%;
        height: 40px;
        border-radius: 5px;
        border: 1px solid #ccc;
        padding: 0px 10px;
        font-size: 14px;
        font-weight: 500;
        color: #232323;
        margin-bottom: 20px;
    }

    .top-fields {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        gap: 80px;

        .text-inputs {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
        }

        .image-input {
            .file-input {
                display: none;
            }

            .add-image-label {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 150px;
                height: 150px;
                border: 2px dashed #828282;
                border-radius: 5px;
                cursor: pointer;
                color: #828282;
                font-size: 16px;
                font-weight: bold;
                text-align: center;
            }

            .image-preview {
                width: 180px;
                height: 170px;
                border-radius: 5px;
                padding: 5px;
                font-size: 14px;
                font-weight: 500;
                color: #232323;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                img {
                    width: 100%;
                    height: 100%;
                    max-width: 150px;
                    max-height: 130px;
                    object-fit: contain;
                    cursor: pointer;
                }

                h2 {
                    font-size: 12px;
                    font-weight: 500;
                    color: var(--primaryColor);
                    cursor: pointer;
                }
            }
        }
    }

    .middle-fields {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;

        div {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
        }

        & > div:first-child {
            margin-right: 40px;
        }
    }

    .bottom-fields {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;

        div {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
        }

        & > div:first-child {
            margin-right: 40px;
        }

        .options-input {
            position: relative;

            i {
                position: absolute;
                // a direita do input
                top: 50%;
                right: 10px;
                transform: translateY(-50%);
                font-size: 12px;
                color: #828282;
                cursor: pointer;
            }

            span {
                color: var(--primaryColor);
                margin-left: 5px;
                cursor: pointer;
            }
        }

        .category-input {
            position: relative;

            input {
                cursor: pointer;
            }

            i {
                position: absolute;
                top: 50%;
                right: 10px;
                transform: translateY(-50%);
                font-size: 12px;
                color: #828282;
                cursor: pointer;
            }
        }
    }

    #info {
        font-size: 12px;
        font-weight: 500;
        color: #828282;
        margin-top: 10px;
        max-width: 434px;
        word-break: break-all;
    }

    .chosen-options {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        max-width: 100%;

       
        p {
            margin-right: 5px;
        }

        text {
            max-width: 264px;
            word-break: break-all;
        }
    }

    .buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;

        button {
            width: 100px;
            height: 40px;
            border-radius: 5px;
            border: none;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
        }

        .cancel {
            background-color: #fff;
            border: 1px solid #ccc;
            color: #232323;
        }

        .save {
            background-color: var(--primaryColor);
            color: #fff;
        }

        .loading {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 10px;
            color: var(--primaryColor);

            h2 {
                font-size: 16px;
                font-weight: 500;
            }
        }
    }
}
</style>