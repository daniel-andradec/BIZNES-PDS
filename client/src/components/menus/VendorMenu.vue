<template lang="">
    <div class="vendor-menu">
        <div v-if="vendorMenu.isVisible" class="menu">
            <div class="overlay" @click="toggleVendorMenu">
            </div>

            <div class="menu">
                <div class="title">
                    <i class="fa-regular fa-circle-xmark fa-lg" @click="toggleVendorMenu"></i>
                </div>
                <div class="menu-content">
                    <div class=categories>
                        <div class="category" v-for="(item, key) in vendorMenu.items" :key="key" @click="navigate(item)">
                            <i :class="item.icon"></i>
                            {{ item.display }}
                        </div>
                    </div>
                    <div class="logout">
                        <i class="fa-solid fa-arrow-right-from-bracket"></i>
                        Sair
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'VendorMenu',
    components: {
    },
    data() {
        return {
        }
    },
    methods: {
        ...mapActions(['toggleVendorMenu']),
        toggleMenu() {
            this.toggleVendorMenu()
        },
        navigate(item) {
            this.$router.push(item.route)
            this.toggleVendorMenu()
        }
    },
    computed: {
        ...mapGetters(['vendorMenu']),
    },
    mounted() {
    }
}
</script>
<style lang="less">
.vendor-menu {
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
        width: 17vw;
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

        .menu-content {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            flex-grow: 1;
            font-size: 18px;
        }
        
        .categories {
            display: flex;
            flex-direction: column;

            .category {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
                padding: 20px 15px;
                border-bottom: 1px solid #DEDEDE;
                cursor: pointer;

                i {
                    margin-right: 10px;
                    color: var(--secondaryColor);
                }

                &:last-child {
                    border-bottom: none;
                }

                &:hover {
                    background: #EFEFEF;
                }
            }
        }

        .logout {
            justify-self: flex-end;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            padding: 20px 15px;
            cursor: pointer;

            i {
                margin-right: 10px;
                color: var(--secondaryColor);
            }
        }

        .title {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            margin: 20px 15px 20px 10px;
            font-size: 18px;
            color: var(--secondaryColor);
        }
    }
}
    
</style>