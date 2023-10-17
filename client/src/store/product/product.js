export default {
    state: {
        products: [
//             {
//     idProduct: 1,
//     name: 'Apple Macbook Pro 13',
//     description: 'Notebook Apple Macbook Pro 13 polegadas, Chip M1 da Apple com CPU de oito núcleos e GPU de dez núcleos, de 256 GB SSD - Cinza espacial',
//     category: ['Computadores e informática'],
//     price: 10299,
//     photo: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp-spacegray-select-202206?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1664497359481',
//     options: ['Cinza espacial', 'Prata', 'Dourado']
// },
// {
//     idProduct: 2,
//     name: 'Engenharia de Software Moderna, por Marco Tulio Valente',
//     description: 'O livro destina-se a alunos de cursos de graduação em Ciência da Computação, Sistemas de Informação, Engenharia de Software e Engenharia de Computação, dentre outros. Pode ser usado também por profissionais que buscam atualização em Engenharia de Software.',
//     category: ['Livros', 'Educação'],
//     price: 101,
//     photo: 'https://images-na.ssl-images-amazon.com/images/I/81ZE1M+bueL._AC_UL900_SR615,900_.jpg',
//     options: []
// },
// {
//     idProduct: 3,
//     name: 'Samsung Galaxy Book3 Ultra',
//     description: 'Samsung Galaxy Book3 Ultra Intel® Core i9-13900H, Windows 11 Home, 32GB, 1TB SSD, 16" WQXGA+ AMOLED 2x 1.79 kg Grafite',
//     category: ['Computadores e informática'],
//     price: 19399,
//     photo: 'https://images.samsung.com/is/image/samsung/p6pim/br/np960xfh-xa1br/gallery/br-galaxy-book3-ultra-16-inch-np960-np960xfh-xa1br-536243194?$650_519_PNG$',
//     options: ['Grafite', 'Prata']
// },
// {
//     idProduct: 4,
//     name: 'Samsung Galaxy S23 Ultra',
//     description: 'Samsung Galaxy S23 Ultra 5G, Tela AMOLED de 6,9 polegadas, 256GB de armazenamento, Câmera Quádrupla, Android 12',
//     category: ['Smartphones'],
//     price: 13999,
//     photo: 'https://media.mobilephonesdirect.co.uk/images/handsets/NjQwcGhhbnRvbS1ibGFjaw==/combined.png',
//     options: ['Preto', 'Branco', 'Azul']
// },
// {
//     idProduct: 5,
//     name: 'iPhone 15 Pro Max',
//     description: 'iPhone 15 Pro Max. Forjado em titânio e com o incomparável chip A17 Pro, botão de Ação configurável e o sistema de câmera mais poderoso em um iPhone. Tudo isso em um design incrível.',
//     category: ['Smartphones'],
//     price: 9899.10,
//     photo: 'https://www.fastshop.com.br//wcsstore/FastShopCAS/images/catalog/AEMU7A3BEAAZL_PRD/AEMU7A3BEAAZL_PRD_447_1.jpeg',
//     options: ['Preto', 'Branco', 'Azul Escuro']
// },
// {
//     idProduct: 6,
//     name: 'Console PlayStation 5',
//     description: 'Console PlayStation 5 com controle DualSense, 825GB de armazenamento, Suporte a Ray Tracing, 4K Ultra HD Blu-ray',
//     category: ['Games'],
//     price: 3299,
//     photo: 'https://images.tcdn.com.br/img/img_prod/1211726/playstation_5_pronta_entrega_1089_1_1614b747a511ebaf2f9da88b590261f6.png',
//     options: []
// },
// {
//     idProduct: 7,
//     name: 'Amazon Fire TV Stick',
//     description: 'Amazon Fire TV Stick',
//     category: ['Eletrônicos'],
//     price: 299,
//     photo: 'https://m.media-amazon.com/images/I/41IVtjpgH7L._AC_SL1000_.jpg',
//     options: []
// },
// {
//     idProduct: 8,
//     name: 'Pai Rico Pai Pobre',
//     description: 'Livro "Pai Rico Pai Pobre" de Robert T. Kiyosaki, Best-seller de Finanças e Investimentos',
//     category: ['Livros', 'Finanças'],
//     price: 45,
//     photo: 'https://aceleraexport.com/wp-content/uploads/2020/08/Pai-Rico-Pai-Pobre.png',
//     options: []
// },
// {
//     idProduct: 9,
//     name: 'Hábitos Atômicos',
//     description: 'Livro "Hábitos Atômicos" de James Clear, Guia para Mudança de Comportamento e Autodesenvolvimento',
//     category: ['Livros', 'Autoajuda'],
//     price: 32,
//     photo: 'https://m.media-amazon.com/images/I/51TL4nFsLuL.jpg',
//     options: []
// },
// {
//     idProduct: 10,
//     name: 'Smart TV LG OLED 4K 65"',
//     description: 'Smart TV LG OLED 4K de 65 polegadas com HDR, Dolby Vision, webOS, Controle Remoto Mágico e Inteligência Artificial',
//     category: ['Eletrônicos', 'TVs'],
//     price: 4999,
//     photo: 'https://i.zst.com.br/thumbs/12/18/2e/1751031611.jpg',
//     options: []
// },
// {
//     idProduct: 11,
//     name: 'Canon EOS Rebel T8i',
//     description: 'Câmera DSLR Canon EOS Rebel T8i com sensor APS-C de 24,1 MP, gravação de vídeo 4K, Wi-Fi e Bluetooth integrados',
//     category: ['Fotografia', 'Câmeras'],
//     price: 899,
//     photo: 'https://m.media-amazon.com/images/I/81AUQk0y5vL._AC_UF894,1000_QL80_.jpg',
//     options: []
// },
// {
//     idProduct: 12,
//     name: 'Fone de Ouvido Sony WH-1000XM4',
//     description: 'Fone de ouvido sem fio Sony WH-1000XM4 com cancelamento de ruído, qualidade de áudio premium e bateria de longa duração',
//     category: ['Eletrônicos', 'Áudio'],
//     price: 349,
//     photo: 'https://m.media-amazon.com/images/I/51SKmu2G9FL._AC_UF1000,1000_QL80_.jpg',
//     options: ['Preto', 'Branco', 'Rosa']
// },
// {
//     idProduct: 13,
//     name: 'Macbook Air M2',
//     description: 'Notebook Apple Macbook Air M2 com Chip M2 da Apple, 512GB SSD, tela Retina de 13 polegadas e design ultraportátil',
//     category: ['Computadores e informática'],
//     price: 12999,
//     photo: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1653084303665',
//     options: ['Cinza espacial', 'Prata', 'Dourado']
// },
// {
//     idProduct: 14,
//     name: 'Kindle Paperwhite',
//     description: 'Amazon Kindle Paperwhite com tela de 6 polegadas, iluminação ajustável, à prova d\'água e armazenamento de 8GB',
//     category: ['Eletrônicos', 'Leitores de eBooks'],
//     price: 299,
//     photo: 'https://m.media-amazon.com/images/G/32/kindle/journeys/rKNUYh37RAcGDNosiHf4Jv8AudeNj3ryFc57PDW2FPMc3D/ZDFmYjk3MTMt._CB634767969_.jpg',
//     options: []
// },
// {
//     idProduct: 15,
//     name: 'Xbox Series X',
//     description: 'Console Xbox Series X com processador AMD Zen 2, Ray Tracing, SSD de 1TB, 4K Ultra HD e suporte a jogos em 120fps',
//     category: ['Games'],
//     price: 4299,
//     photo: 'https://assets.xboxservices.com/assets/fb/d2/fbd2cb56-5c25-414d-9f46-e6a164cdf5be.png?n=XBX_A-BuyBoxBGImage01-D.png',
//     options: []
// },
// {
//     idProduct: 16,
//     name: 'Smartwatch Apple Watch Series 7',
//     description: 'Smartwatch Apple Watch Series 7 com tela sempre ativa, monitor de saúde avançado e compatibilidade com apps de fitness',
//     category: ['Eletrônicos', 'Smartwatches'],
//     price: 399,
//     photo: 'https://support.apple.com/library/APPLE/APPLECARE_ALLGEOS/SP860/series7-480.png',
//     options: ['Preto', 'Branco', 'Rosa']
// },
// {
//     idProduct: 17,
//     name: 'Batedeira KitchenAid Stand Mixer',
//     description: 'Batedeira Stand Mixer da KitchenAid, design icônico e alta performance para suas receitas. Acompanha três batedores.',
//     category: ['Eletrodomésticos'],
//     price: 1999,
//     photo: 'https://m.media-amazon.com/images/I/61WJrVNsajL._AC_UF894,1000_QL80_.jpg',
//     options: ['Preto', 'Branco', 'Rosa']
// },
// {
//     idProduct: 18,
//     name: 'Tênis Nike Air Force 1',
//     description: 'Nike Air Force 1, design clássico com conforto premium. Ideal para o dia a dia.',
//     category: ['Calçados'],
//     price: 499,
//     photo: 'https://droper-media.us-southeast-1.linodeobjects.com/922023175750967.webp',
//     options: ['Preto', 'Branco', 'Verde']
// },
// {
//     idProduct: 19,
//     name: 'Cafeteira Nespresso Essenza Mini',
//     description: 'Cafeteira Nespresso Essenza Mini, compacta e eficiente. Prepara espressos e lungos deliciosos.',
//     category: ['Eletrodomésticos'],
//     price: 399,
//     photo: 'https://i.zst.com.br/thumbs/12/4/35/196951040.jpg',
//     options: []
// },
// {
//     idProduct: 20,
//     name: 'Bicicleta Mountain Bike GT Avalanche',
//     description: 'Bicicleta Mountain Bike GT Avalanche, ideal para trilhas e terrenos acidentados.',
//     category: ['Esportes', 'Ciclismo'],
//     price: 2499,
//     photo: 'https://static.bikepointsc.com.br/public/bikepointsc/imagens/produtos/bicicleta-gt-avalanche-comp-29-6441c801a7b7c.jpg',
//     options: []
// },
// {
//     idProduct: 21,
//     name: 'Perfume Chanel No.5',
//     description: 'Perfume Chanel No.5, uma fragrância icônica e atemporal para mulheres.',
//     category: ['Perfumaria'],
//     price: 799,
//     photo: 'https://fraguru.com/mdimg/perfume/375x500.40069.jpg',
//     options: []
// },
// {
//     idProduct: 22,
//     name: 'Violão Taylor Acústico',
//     description: 'Violão Taylor Acústico, excelente sonoridade e acabamento premium.',
//     category: ['Instrumentos Musicais'],
//     price: 5299,
//     photo: 'https://www.musitechinstrumentos.com.br/files/pro_37649_g.jpg',
//     options: ['Preto', 'Marrom']
// },
// {
//     idProduct: 23,
//     name: 'Champagne Veuve Clicquot Brut',
//     description: 'Champagne Veuve Clicquot Brut, ideal para comemorações e momentos especiais.',
//     category: ['Bebidas', 'Vinhos e Espumantes'],
//     price: 399,
//     photo: 'https://cdn.dooca.store/479/products/champagne-veuve-clicquot-brut.png?v=1606816206',
//     options: []
// },
// {
//     idProduct: 24,
//     name: 'Perfume Bleu de Chanel',
//     description: 'Perfume Bleu de Chanel, uma fragrância masculina elegante e sofisticada.',
//     category: ['Perfumaria'],
//     price: 799,
//     photo: 'https://m.media-amazon.com/images/I/61rv8u2aRuL._AC_UF1000,1000_QL80_.jpg',
//     options: []
// },
// {
//     idProduct: 25,
//     name: 'Galaxy Watch 6 BT 40mm',
//     description: 'Galaxy Watch 6 BT 40mm, monitoramento de saúde avançado e design premium - Grafite com 1,31", Bluetooth e 16GB ',
//     category: ['Eletrônicos', 'Smartwatches'],
//     price: 799,
//     photo: 'https://images.samsung.com/is/image/samsung/p6pim/br/2307/gallery/br-galaxy-watch6-r935-sm-r930nzepzto-537403033?$650_519_PNG$',
//     options: ['Preto', 'Branco', 'Rosa']
// },
// {
//     idProduct: 26,
//     name: 'AirPods Pro',
//     description: 'AirPods Pro com cancelamento de ruído, modo ambiente e equalização adaptativa',
//     category: ['Eletrônicos', 'Áudio'],
//     price: 1899,
//     photo: 'https://m.media-amazon.com/images/I/71zny7BTRlL._AC_UF1000,1000_QL80_.jpg',
//     options: []
// }
]
    },
    mutations: {
        sortProducts(state, option) {
            switch (option) {
                case 'lowestPrice':
                    state.products.sort((a, b) => a.price - b.price)
                    break
                case 'highestPrice':
                    state.products.sort((a, b) => b.price - a.price)
                    break
                case 'name':
                    state.products.sort((a, b) => a.name.localeCompare(b.name))
                    break
                case 'category':
                    state.products.sort((a, b) => a.category[0].localeCompare(b.category[0]))
                    break
                case 'bestSellers':
                    state.products.sort((a, b) => a.id - b.id) // todo - sort by best sellers
                    break
                default:
                    break
            }
        },
        setProducts(state, products) {
            state.products = products
        },
        fetchProducts(state) {
            const products = localStorage.getItem('products')
            if (products) {
                state.products = JSON.parse(products)
            }
        }
    },
    actions: {
        sortProducts({ commit }, option) {
            commit('sortProducts', option)
        },
        setProducts({ commit }, products) {
            commit('setProducts', products)
        },
        fetchProducts({ commit }) {
            commit('fetchProducts')
        }
    },
    getters: {
        getProducts: state => state.products,
        // get the product with the given id, and put product.seller = 'Seller Name'
        // getProduct: state => id => state.products.find(product => product.id == id)
        getProduct: state => id => {
            let product = state.products.find(product => product.idProduct == id)
            product.seller = 'Seller Name' // todo - get seller name from database
            return product
        },
        getCategoryProducts: state => (categories, id) => {
            console.log(categories);
            // get other products from the same category but not the one with the given id
            return state.products.filter(product => product.category.split(',').some(category => categories?.includes(category)) && product.id != id)
        },
        getSearchProducts: state => (search) => {
            // get products that contain the search term in the name or description or category
            console.log(search)
            return state.products.filter(product => product.name.toLowerCase().includes(search.toLowerCase()) || product.description.toLowerCase().includes(search.toLowerCase()) || product.category.split(',').some(category => category.toLowerCase().includes(search.toLowerCase())))
        },
        // best sellers products - by now, just return the products from index 3 to 7
        getBestSellers: state => {
            return state.products.slice(3, 7)
        }
    }
}
