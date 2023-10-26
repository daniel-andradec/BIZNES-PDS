export default {
    state: {
        categories: [
            {
                id: 1,
                name: 'Computadores e Informática',
                icon: 'fa fa-laptop'
            },
            {
                id: 2,
                name: 'Livros',
                icon: 'fa fa-book'
            },
            {
                id: 3,
                name: 'Smartphones',
                icon: 'fa fa-mobile'
            },
            {
                id: 4,
                name: 'Games e Consoles',
                icon: 'fa fa-gamepad'
            },
            {
                id: 5,
                name: 'TV e Áudio',
                icon: 'fa fa-plug'
            },
            {
                id: 6,
                name: 'Fotografia e Câmeras',
                icon: 'fa fa-camera'
            },
            {
                id: 7,
                name: 'Smartwatches e Acessórios',
                icon: 'fa fa-clock'
            },
            {
                id: 8,
                name: 'Bolsas e Mochilas',
                icon: 'fa fa-suitcase'
            },
            {
                id: 9,
                name: 'Esporte e Lazer',
                icon: 'fa fa-futbol'
            },
            {
                id: 10,
                name: 'Roupas e Calçados',
                icon: 'fa fa-tshirt'
            }
        ]
    },
    mutations: {
    },
    actions: {
    },
    getters: {
        getCategories: state => state.categories,
        getCategory: state => categoryName => {
            return state.categories.find(category => category.name === categoryName)
        }
    },
}