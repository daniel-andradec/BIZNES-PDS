<template lang="">
    <div class="category-menu">
        <div v-if="categoryMenu.isVisible" class="menu">
            <div class="overlay" @click="toggleCategoryMenu">
            </div>

            <div class="menu">
                <div class="title">
                    Compre por categoria
                    <i class="fa-regular fa-circle-xmark fa-lg" @click="toggleCategoryMenu"></i>
                </div>
                <div class=categories>
                    <div class="category" v-for="(category, key) in getCategories" :key="key">
                        <CategoryMenuItem :category="category" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CategoryMenuItem from '@/components/menus/CategoryMenuItem.vue'

export default {
    name: 'CategoryMenu',
    components: {
        CategoryMenuItem
    },
    data() {
        return {
        }
    },
    methods: {
        ...mapActions(['toggleCategoryMenu']),
        toggleMenu() {
            this.toggleCategoryMenu()
        }
    },
    computed: {
        ...mapGetters(['categoryMenu', 'getCategories']),
    },
    mounted() {
    }
}
</script>
<style lang="less">
.category-menu {
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
        background: rgba(0, 0, 0, 0.3);
        overflow: hidden;
    }

    .menu {
        position: fixed;
        top: 0;
        left: 0;
        width: 30vw;
        height: calc(100vh - 90px);
        z-index: 3;
        background: #F4F4F4;
        margin: 0px 0px;
        margin-top: 90px;
        overflow: auto;
        display: flex;
        flex-direction: column;
        justify-content: flex-start !important;
        border-top: 1px solid #DEDEDE;
        max-width: 450px;
        
        .categories {
            display: grid;
            grid-template-columns: 1fr 1fr;
            margin-bottom: 20px;
        }
        .title {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            margin: 20px 15px 20px 10px;
            font-size: 18px;
            color: var(--secondaryColor);
        }
    }
}
    
</style>