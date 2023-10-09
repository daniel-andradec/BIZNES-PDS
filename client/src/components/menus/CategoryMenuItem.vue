<template lang="">
    <div class="menu-item">
        <i :class="category.icon"></i>
        {{ category.name }}
    </div>
</template>
<script>
export default {
    name: 'CategoryMenuItem',
    props: ['category'],
    components: {
    },
    data() {
        return {
        }
    },
    methods: {
    },
    computed: {
    },
    mounted() {
    }
    
}
</script>
<style lang="less">
.menu-item {
    border-radius: 5px;
    background: #FAFAFA;
    border: 1px solid rgba(0, 0, 0, 0.18);
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
    margin: 10px;
    cursor: pointer;
    transition: all linear .2s;
    z-index: 4;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    height: 60px;
    min-width: 110px;
    color: #374957;
    font-size: 20px;
    
    &:hover {
        background: var(--secondaryColor);
        color: #fff;
    }
}
</style>