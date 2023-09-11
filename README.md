# BIZNES

## Membros e Papéis
- Arthur Linhares (Desenvolvedor Fullstack)
- Daniel Andrade (Desenvolvedor Fullstack)
- Avelar Hostalacio (Desenvolvedor Back-end)
- Iago Gabino (Desenvolvedor Front-end)

## Tecnologias Utilizadas
- Node JS com Typescript (Back-end)
- Vue JS com Javascript (Front-end)
- SQLite (Banco de Dados)

## Objetivo do Projeto
O objetivo deste projeto é desenvolver um sistema de e-commerce como uma ferramenta de aprendizagem prática para os participantes. O sistema será uma plataforma simulada que abrange diversas funcionalidades de um e-commerce real, desde autenticação de usuários até a simulação de pagamentos.

## Protótipo no Figma

[BIZNES](https://www.figma.com/file/NX09jS21AnkyySTjGy6kdd/Biznes?type=design&node-id=0%3A1&mode=design&t=x5TJNNlRNOiTc0aV-1)

## Características do Sistema

### Vendedor

- Perfil de Vendedor
  - Criar e gerenciar perfis de vendedores, incluindo informações como nome da loja, descrição e políticas de devolução.
  
- Upload de Fotos de Produto
  - Permitir que os vendedores façam upload de fotos para ilustrar seus produtos.
  
- Listagem de Produtos por Categoria
  - Categorizar produtos para que os compradores possam procurar produtos por categorias.
  
- Gestão de Estoque
  - Monitorar níveis de estoque de produtos e receber notificações quando estoques estiverem baixos.
  
- Processo de Compra
  - Implementação de um fluxo de compra que permite aos compradores adicionar produtos ao carrinho, revisar o carrinho, inserir informações de pagamento e concluir a compra.
  
- Painel de Controle do Vendedor
  - Fornecer um painel de controle para gerenciar produtos, estoque, pedidos recebidos e avaliações.
  
- Relatórios e Análises
  - Oferecer relatórios e análises para os vendedores, incluindo vendas, tendências de produtos e desempenho geral da loja.
  
- Cadastro de Produto
  - Permitir que vendedores cadastrem produtos para venda, incluindo informações como nome, descrição, preço, categoria e outros detalhes relevantes.

### Comprador

- Perfil de Comprador
  - Criar e atualizar perfis de compradores, fornecendo informações como nome, endereço e detalhes de contato.
  
- Visualização de Transações
  - Acessar histórico de transações, mostrando vendas ou compras passadas e informações relacionadas.
  
- Pesquisa de Produtos
  - Implementação de um mecanismo de pesquisa para procurar produtos por palavras-chave, categorias ou outros critérios relevantes.
  
- Processo de Compra
  - Fluxo de compra que permite aos compradores adicionar produtos ao carrinho, revisar o carrinho, inserir informações de pagamento e concluir a compra.
  
- Avaliações e Comentários
  - Avaliar e deixar comentários sobre produtos comprados, fornecendo feedback para outros compradores e vendedores.
  
- Aba de Favoritos
  - Marcar produtos como favoritos e salvá-los em uma aba dedicada.

### Administrador

- Cargo de Administrador
  - Criar um cargo especial com privilégios de gerenciamento.
 
## Backlog do Produto
    -História #1: Como um administrador do sistema, quero realizar o controle dos demais usuários do sistema, podendo vê-los, editá-los e excluí-los
    
    -História #2: Como um usuário do sistema, quero fazer login com e-mail e senha para acessar o sistema, mantendo a segurança dos dados.
    
    -História #3: Como um comprador, quero conseguir me cadastrar no sistema
    
    -História #4: Como um vendedor, quero conseguir cadastrar minha loja no sistema

    -História #5: Como um vendedor, quero conseguir cadastrar, editar e excluir produtos na minha loja

    -História #6: Como um comprador, quero conseguir cadastrar, editar e excluir produtos no meu carrinho
    
    -História #7: Como um comprador, quero conseguir pesquisar produtos utilizando palavras-chave, como nome e categoria.
    
    -História #8: Como um comprador, quero conseguir realizar a compra dos produtos do meu carrinho
    
    -História #9: Como um vendedor, quero conseguir monitorar o estoque da minha loja
    
    -História #10: Como um vendedor, quero conseguir monitorar os pedidos efetuados pelos compradores
    
    -História #11: Como um administrador, quero visualizar o fluxo das transações (quantidade de vendas e montante) do aplicativo em um período de tempo
    
    -História #12: Como um administrador, quero visualizar o fluxo das transações (quantidade de vendas e montante) do aplicativo em um período de tempo
    
    -História #13: Como um comprador, quero conseguir monitorar as minhas compras já efetuadas
    
    -História #14: Como um comprador, quero conseguir dar avaliações para os produtos que eu já comprei, assim como ver as avaliações de outros usuários
    
    -História #15: Como um comprador,  quero pesquisar produtos de forma ordenada por preço/nota

## Backlog do sprint
### -História #1: Como um administrador do sistema, quero realizar o controle dos demais usuários do sistema, podendo vê-los, editá-los e excluí-los
    Tarefas e responsáveis:
    
    [FE] Tela de cadastro de usuário - parte visual
    
    [FE] Tela de cadastro de usuário - conexão com o back
    
    [BE] Rotas para controle de usuários: [Avelar]
    
    [BE] Testes automatizados: [Avelar]

### -História #2: Como um usuário do sistema, quero fazer login com e-mail e senha para acessar o sistema, mantendo a segurança dos dados.
    Tarefas e responsáveis:
    
    [FE] Tela de login - parte visual
    
    [FE] Tela de login - conexão com o back
    
    [BE] Rotas de Login [Avelar]
    
    [BE] Autenticação Login com JWT: [Avelar]

### -História #3: Como um comprador, quero conseguir me cadastrar no sistema
    Tarefas e responsáveis:
    
    [FE] Tela de cadastro de usuário - parte visual
    
    [FE] Tela de cadastro de usuário - conexão com o back
    
    [BE] Rotas para CRUD do usuário [Daniel]
    
    [BE] Testes automatizados [Daniel]

### -História #4: Como um vendedor, quero conseguir cadastrar minha loja no sistema
    Tarefas e responsáveis:
    
    [FE] Tela de cadastro de vendedor - parte visual
    
    [FE] Tela de cadastro de vendedor - conexão com o back
    
    [BE] Rotas para CRUD de vendedor: [Avelar]
    
    [BE] Testes automatizados: [Avelar]

### -História #5: Como um vendedor, quero conseguir cadastrar, editar e excluir produtos na minha loja
    Tarefas e responsáveis:
    
    [FE] Tela de cadastro de produtos - parte visual
    
    [FE] Tela de cadastro de produtos - conexão com o back
    
    [BE] Rotas para cadastro de produtos: [Avelar]
    
    [BE] Testes automatizados: [Avelar]

### -História #6: Como um comprador, quero conseguir cadastrar, editar e excluir produtos no meu carrinho
    Tarefas e responsáveis:
    
    [FE] Tela do carrinho - parte visual
    
    [FE] Tela do carrinho  - conexão com o back
    
    [BE] Rotas para cadastro de produtos no carrinho [Daniel]
    
    [BE] Testes automatizados [Daniel]

### -História #7: Como um comprador, quero conseguir pesquisar produtos utilizando palavras-chave, como nome e categoria.
    Tarefas e responsáveis:
    
    [FE] Tela de pesquisa - parte visual
    
    [FE] Tela de pesquisa- conexão com o back
    
    [BE] Rotas para listagem de produtos [Daniel]
    
    [BE] Testes automatizados [Daniel]

### -História #8: Como um comprador, quero conseguir realizar a compra dos produtos do meu carrinho
    Tarefas e responsáveis:
    
    [FE] Telas de compra - parte visual
    
    [FE] Telas de compra - conexão com o back
    
    [BE] Rotas para efetuação de compra [Avelar]
    
    [BE] Testes automatizados [Avelar]


