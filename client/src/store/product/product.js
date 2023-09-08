export default {
    state: {
        products: [
            {
                id: 1,
                name: 'Apple Macbook Pro 13',
                description: 'Notebook Apple Macbook Pro 13 polegadas, Chip M1 da Apple com CPU de oito núcleos e GPU de dez núcleos, de 256 GB SSD - Cinza espacial',
                category: ['Computadores e informática'],
                price: 10299,
                img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp-silver-select-202206?wid=1280&hei=1190&fmt=png-alpha&.v=1664497095569'
            },
            {
                id: 2,
                name: 'Engenharia de Software Moderna, por Marco Tulio Valente',
                description: 'O livro destina-se a alunos de cursos de graduação em Ciência da Computação, Sistemas de Informação, Engenharia de Software e Engenharia de Computação, dentre outros. Pode ser usado também por profissionais que buscam atualização em Engenharia de Software.',
                category: ['Livros', 'Educação'],
                price: 101,
                img: 'https://images-na.ssl-images-amazon.com/images/I/81ZE1M+bueL._AC_UL900_SR615,900_.jpg'
            },
            {
                id: 3,
                name: 'Samsung Galaxy Book3 Ultra',
                description: 'Samsung Galaxy Book3 Ultra Intel® Core i9-13900H, Windows 11 Home, 32GB, 1TB SSD, 16" WQXGA+ AMOLED 2x 1.79 kg Grafite',
                category: ['Computadores e informática'],
                price: 19399,
                img: 'https://images.samsung.com/is/image/samsung/p6pim/br/np960xfh-xa1br/gallery/br-galaxy-book3-ultra-16-inch-np960-np960xfh-xa1br-536243194?$650_519_PNG$'
            },
            {
                id: 4,
                name: 'Samsung Galaxy S23 Ultra',
                description: 'Samsung Galaxy S23 Ultra 5G, Tela AMOLED de 6,9 polegadas, 256GB de armazenamento, Câmera Quádrupla, Android 12',
                category: ['Smartphones'],
                price: 13999,
                img: 'https://media.mobilephonesdirect.co.uk/images/handsets/NjQwcGhhbnRvbS1ibGFjaw==/combined.png'
            },
            {
                id: 5,
                name: 'iPhone 14 Pro Max',
                description: 'iPhone 14 Pro Max com tela Super Retina XDR de 6,7 polegadas, Chip A16 Bionic, 256GB de armazenamento, iOS 16',
                category: ['Smartphones'],
                price: 14999,
                img: 'https://cdn.awsli.com.br/2500x2500/761/761012/produto/218353870/editada--5--rcs401z0ta.png'
            },
            {
                id: 6,
                name: 'Console PlayStation 5',
                description: 'Console PlayStation 5 com controle DualSense, 825GB de armazenamento, Suporte a Ray Tracing, 4K Ultra HD Blu-ray',
                category: ['Games'],
                price: 3299,
                img: 'https://images.tcdn.com.br/img/img_prod/1211726/playstation_5_pronta_entrega_1089_1_1614b747a511ebaf2f9da88b590261f6.png'
            },
            {
                id: 7,
                name: 'Amazon Fire TV Stick',
                description: 'Amazon Fire TV Stick com Alexa Voice Remote, Streaming em Full HD, Aplicativos e Conteúdo Exclusivo',
                category: ['Eletrônicos'],
                price: 299,
                img: 'https://m.media-amazon.com/images/I/41IVtjpgH7L._AC_SL1000_.jpg'
            },
            {
                id: 8,
                name: 'Pai Rico Pai Pobre',
                description: 'Livro "Pai Rico Pai Pobre" de Robert T. Kiyosaki, Best-seller de Finanças e Investimentos',
                category: ['Livros', 'Finanças'],
                price: 45,
                img: 'https://aceleraexport.com/wp-content/uploads/2020/08/Pai-Rico-Pai-Pobre.png'
            },
            {
                id: 9,
                name: 'Hábitos Atômicos',
                description: 'Livro "Hábitos Atômicos" de James Clear, Guia para Mudança de Comportamento e Autodesenvolvimento',
                category: ['Livros', 'Autoajuda'],
                price: 32,
                img: 'https://m.media-amazon.com/images/I/51TL4nFsLuL.jpg'
            },
            {
                id: 10,
                name: 'Smart TV LG OLED 4K 65"',
                description: 'Smart TV LG OLED 4K de 65 polegadas com HDR, Dolby Vision, webOS, Controle Remoto Mágico e Inteligência Artificial',
                category: ['Eletrônicos', 'TVs'],
                price: 4999,
                img: 'https://i.zst.com.br/thumbs/12/18/2e/1751031611.jpg'
            },
            {
                id: 11,
                name: 'Canon EOS Rebel T8i',
                description: 'Câmera DSLR Canon EOS Rebel T8i com sensor APS-C de 24,1 MP, gravação de vídeo 4K, Wi-Fi e Bluetooth integrados',
                category: ['Fotografia', 'Câmeras'],
                price: 899,
                img: 'https://m.media-amazon.com/images/I/81AUQk0y5vL._AC_UF894,1000_QL80_.jpg'
            },
            {
                id: 12,
                name: 'Fone de Ouvido Sony WH-1000XM4',
                description: 'Fone de ouvido sem fio Sony WH-1000XM4 com cancelamento de ruído, qualidade de áudio premium e bateria de longa duração',
                category: ['Eletrônicos', 'Áudio'],
                price: 349,
                img: 'https://m.media-amazon.com/images/I/51SKmu2G9FL._AC_UF1000,1000_QL80_.jpg'
            },
            {
                id: 13,
                name: 'Macbook Air M2',
                description: 'Notebook Apple Macbook Air M2 com Chip M2 da Apple, 512GB SSD, tela Retina de 13 polegadas e design ultraportátil',
                category: ['Computadores e informática'],
                price: 12999,
                img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1653084303665'
            },
            {
                id: 14,
                name: 'Kindle Paperwhite',
                description: 'Amazon Kindle Paperwhite com tela de 6 polegadas, iluminação ajustável, à prova d\'água e armazenamento de 8GB',
                category: ['Eletrônicos', 'Leitores de eBooks'],
                price: 299,
                img: 'https://m.media-amazon.com/images/G/32/kindle/journeys/rKNUYh37RAcGDNosiHf4Jv8AudeNj3ryFc57PDW2FPMc3D/ZDFmYjk3MTMt._CB634767969_.jpg'
            },
            {
                id: 15,
                name: 'Xbox Series X',
                description: 'Console Xbox Series X com processador AMD Zen 2, Ray Tracing, SSD de 1TB, 4K Ultra HD e suporte a jogos em 120fps',
                category: ['Games'],
                price: 4299,
                img: 'https://assets.xboxservices.com/assets/fb/d2/fbd2cb56-5c25-414d-9f46-e6a164cdf5be.png?n=XBX_A-BuyBoxBGImage01-D.png'
            },
            {
                id: 16,
                name: 'Smartwatch Apple Watch Series 7',
                description: 'Smartwatch Apple Watch Series 7 com tela sempre ativa, monitor de saúde avançado e compatibilidade com apps de fitness',
                category: ['Eletrônicos', 'Wearables'],
                price: 399,
                img: 'https://support.apple.com/library/APPLE/APPLECARE_ALLGEOS/SP860/series7-480.png'
            }
        ]
    },
    mutations: {
    },
    actions: {
    },
    getters: {
        getProducts: state => state.products
    }
}
