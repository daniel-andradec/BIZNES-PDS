<template>
    <div class="login-view">
        <img class="logo" alt="Biznes logo" :src="logo">

        <div class="login">
            <img :src="imgLogin">

            <div class="form">
                <h3>Faça seu Login</h3>
                <div class="input">
                    <i class="fa-regular fa-user icon"></i>
                    <input type="text" id="email" placeholder="Digite seu login" ref="email">
                </div>

                <div class="input">
                    <i class="fa fa-key icon"></i>
                    <input :type="showPassword ? 'text' : 'password'" id="password" placeholder="Digite sua senha" ref="password">

                    <div>
                        <i class="fa-regular fa-eye icon" @click="showPassword = !showPassword"></i>
                    </div>
                </div>

                <p><span>Esqueceu a senha?</span></p>

                <div class="button" @click="login()">
                    <button>Entrar</button>
                </div>

                <p>Não tenho login, <span @click="registerModalOpen = true">quero fazer Biznes!</span></p>
            </div>
        </div>

        <ModalComponent :modalOpen="registerModalOpen" @closeModal="registerModalOpen = false">
            <div class="register-options">
                <div class="register-option" @click="registerCostumer()">
                    <i class="fa fa-shopping-cart"></i>
                    <p>Quero <b>comprar</b> <br>no Biznes</p>
                </div>
                <div class="register-option" @click="registerSeller()">
                    <i class="fa fa-chart-line"></i>
                    <p>Quero <b>vender</b> <br>no Biznes</p>
                </div>
            </div>
        </ModalComponent>
    </div>
</template>

<script>
import ModalComponent from '@/components/modals/ModalComponent.vue'
import { login, getUser, logout } from '@/controllers/UserController'
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'LoginView',
    components: {
        ModalComponent
    },
    data() {
        return {
            logo: require('@/assets/images/logo.png'),
            imgLogin: require('@/assets/images/online_shopping.png'),
            registerModalOpen: false,
            showPassword: false
        }
    },
    methods: {
        ...mapActions(['setUser']),
        registerCostumer () {
            this.$router.push({ name: 'register', params: { userType: 1 } })
        },
        registerSeller () {
            this.$router.push({ name: 'register', params: { userType: 2 } })
        },
        async login () {
            // logout to clear session if user is logged in - review this
            await logout().catch(() => {
                console.log('User is not logged in')
            })

            // log inputs
            const email = this.$refs.email.value
            const password = this.$refs.password.value

            if (email === '' || password === '') {
                this.$toast.open({
                    message: 'Preencha todos os campos obrigatórios',
                    type: 'error',
                    duration: 5000,
                    position: 'top-right'
                });
                return
            }

            await login(email, password).then(async (res) => {
                if (!res.error) {
                    await getUser().then((res) => {
                        console.log(res)
                        const user = {
                            id: res.idUser,
                            name: res.name,
                            email: res.email,
                            role: res.role
                        }
                        this.setUser(user)
                        localStorage.setItem('user', JSON.stringify(user))
                        this.$toast.open({
                            message: 'Bem vind@!',
                            type: 'success',
                            duration: 4000,
                            position: 'top-right'
                        });

                        if (res.role === 'customer') this.$router.push('/')
                        else if (res.role === 'vendor') this.$router.push('/vendor-panel')
                        else if (res.role === 'admin') this.$router.push('/admin-panel')
                    }).catch(async (err) => {
                        console.log(err)
                        this.$toast.open({
                            message: 'Erro ao fazer login. Verifique suas credenciais',
                            type: 'error',
                            duration: 5000,
                            position: 'top-right'
                        });
                    })
                }
            }).catch(async (err) => {
                console.log(err)
                this.$toast.open({
                    message: 'Usuário ou senha incorretos.',
                    type: 'error',
                    duration: 5000,
                    position: 'top-right'
                });
            })
        }
    },
    computed: {
        ...mapGetters(['loggedInUser'])
    },
    mounted() {
    }
}
</script>

<style lang="less">
.login-view {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .logo {
        width: 300px;
        height: 200px;
        object-fit: contain;
        margin-left: 20px;
    }

    .login {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        justify-content: space-evenly;

        img {
            width: 900px;
            height: 700px;
            margin-left: -30px;
        }


        .form {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;
            height: 500px;
            width: 400px;
            margin-bottom: 180px;

            h3 {
                font-size: 35px;
                font-weight: 400;
                margin-bottom: 20px;
                color: #4B4B4B;
            }

            .button {
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
                }
            }

            .input {
                display: flex;
                flex-direction: row;
                align-items: center;
                border-radius: 5px;
                border: 1px solid var(--secondaryColor);
                padding: 10px 10px;
                position: relative;
                margin: 5px 20px;

                //sizing
                height: 50px;
                width: 400px;
                
                input {
                    border: none;
                    outline: none;
                    background-color: transparent;
                    font-size: 25px;
                    font-family: Gellix;
                    width: 100%;
                }

                i {
                    color: gray;
                    font-size: 22px;
                    margin: 0px 10px;
                }
            }

            p {
                align-self: flex-end;
                font-size: 20px;
                margin-top: 3px;

                span {
                    color: var(--primaryColor);
                    cursor: pointer;
                }
            }
        }
    }

    // card options
    .register-options {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;

        .register-option {
            display: flex;
            flex-direction: column;
            align-items: center;
            border-radius: 5px;
            border: 1px solid rgba(0, 0, 0, 0.18);
            box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.25);
            padding: 15px 15px;
            margin: 5px 20px;

            p {
                font-size: 25px;
                font-family: Gellix;
                margin: 5px 10px 10px 10px;
                padding-bottom: 20px;
            }

            i {
                color: var(--primaryColor);
                font-size: 22px;
                padding-top: 20px;
            }
        }
    }
}    
</style>