<template>
    <div class="category-modal">
        <ModalComponentVue :modalOpen="modalOpen" @closeModal="closeModal">
            <h2>Categorias</h2>

            <div class="multi-select-list">
                <label v-for="(category, ckey) in categories" :key="ckey" class="option-label">
                    <input type="checkbox" :value="category" v-model="chosenCategories">
                    {{ category.name || category }}
                </label>
            </div>

            <div class="buttons">
                <button class="cancel" @click="closeModal">Cancelar</button>
                <button class="add" @click="addCategories">Adicionar</button>
            </div>
        </ModalComponentVue>
        
    </div>
</template>

<script>
import ModalComponentVue from './ModalComponent.vue'

export default {
    name: 'CategoryModal',
    components: {
        ModalComponentVue
    },
    props: ['modalOpen', 'categories'],
    emits: ['closeModal', 'addCategories'],
    data() {
        return {
            chosenCategories: []
        }
    },
    methods: {
        closeModal() {
            this.$emit('closeModal');
        },
        addCategories() {
            this.$emit('addCategories', this.chosenCategories);
        }
    },
    watch: {
        modalOpen() {
            this.chosenCategories = [];
        }
    }
}
</script>

<style lang="less">
.category-modal {
    .overlay {
        background: rgba(0, 0, 0, 0.3);
        z-index: 12;
    }
    .modal-container {
        z-index: 13;
    }
    .multi-select-list {
        display: flex;
        flex-direction: column;
        align-items: baseline;
        justify-content: center;
        margin-bottom: 15px;
        padding: 0 20px;
    }

    .option-label {
        display: block; 
        margin: 5px 0; 
        cursor: pointer;
    }

    .buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        gap: 20px;
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

        .add {
            background-color: var(--primaryColor);
            color: white;
        }
        
    }

}
</style>