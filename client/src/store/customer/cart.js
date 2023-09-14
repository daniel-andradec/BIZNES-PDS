export default {
    state: {
        cart: {
            products: [
                {
                    id: 1,
                    name: 'Apple Macbook Pro 13',
                    description: 'Notebook Apple Macbook Pro 13 polegadas, Chip M1 da Apple com CPU de oito núcleos e GPU de dez núcleos, de 256 GB SSD - Cinza espacial',
                    category: ['Computadores e informática'],
                    price: 10299,
                    img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp-spacegray-select-202206?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1664497359481'
                },
                {
                    id: 2,
                    name: 'Engenharia de Software Moderna, por Marco Tulio Valente',
                    description: 'O livro destina-se a alunos de cursos de graduação em Ciência da Computação, Sistemas de Informação, Engenharia de Software e Engenharia de Computação, dentre outros. Pode ser usado também por profissionais que buscam atualização em Engenharia de Software.',
                    category: ['Livros', 'Educação'],
                    price: 101,
                    img: 'https://images-na.ssl-images-amazon.com/images/I/81ZE1M+bueL._AC_UL900_SR615,900_.jpg'
                },
            ]
        }
    },
    mutations: {
    },
    actions: {
    },
    getters: {
        getCartProducts: state => state.cart.products
    }
}