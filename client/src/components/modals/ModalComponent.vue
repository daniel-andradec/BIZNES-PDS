<template>
    <div v-if="modalOpen">
        <div class="overlay" @click="closeModal"></div>
        <div class="modal-container">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ModalComponent',
    props: ['modalOpen'],
    emits: ['closeModal'],
    components: {},
    data () {
        return {}
    },
    computed: {
    },
    methods: {
        closeModal() {
            this.$emit('closeModal')
        }
    }
}
</script>

<style lang="less" scoped>
.modal-container {
    position: fixed;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    z-index: 11;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
    background-color: white;
    height: max-content;
    width: max-content;
    padding: 30px;
}
.overlay {
    position: fixed;
    top: 0; left: 0;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.3);
    z-index: 10;
}
</style>
