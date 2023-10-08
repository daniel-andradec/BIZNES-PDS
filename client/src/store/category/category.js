export default {
    state: {
        categories: [
            {
                id: 1,
                name: 'Computadores e informática',
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
                name: 'Consoles',
                icon: 'fa fa-gamepad'
            },
            {
                id: 5,
                name: 'Educação',
                icon: 'fa fa-graduation-cap'
            },
            {
                id: 6,
                name: 'Finanças',
                icon: 'fa fa-money-bill'
            },
            {
                id: 7,
                name: 'Autoajuda',
                icon: 'fa fa-heart'
            },
            {
                id: 8,
                name: 'Eletrônicos',
                icon: 'fa fa-plug'
            },
            {
                id: 9,
                name: 'TVs',
                icon: 'fa fa-tv'
            },
            {
                id: 10,
                name: 'Fotografia',
                icon: 'fa fa-camera'
            },
            {
                id: 11,
                name: 'Câmeras',
                icon: 'fa fa-camera-retro'
            },
            {
                id: 12,
                name: 'Áudio',
                icon: 'fa fa-headphones'
            },
            {
                id: 13,
                name: 'Leitores de eBooks',
                icon: 'fa fa-book-reader'
            },
            {
                id: 14,
                name: 'Smartwatches',
                icon: 'fa fa-clock'
            },
            {
                id: 15,
                name: 'Games',
                icon: 'fa fa-gamepad'
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