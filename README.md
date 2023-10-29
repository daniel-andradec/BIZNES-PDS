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

### Administrador

- Cargo de Administrador
  - Criar um cargo especial com privilégios de gerenciamento.
 
## Backlog do Produto
  - História #1: Como comprador, eu gostaria de ver todos os produtos de uma determinada loja.
  - História #2: Como comprador, eu gostaria de adicionar e remover itens no meu carrinho.
  - História #3: Como comprador, eu gostaria de fazer uma conta utilizando meu email e criando uma senha.
  - História #4: Como comprador, eu gostaria de visualizar as transações que já fiz.
  - História #5: Como comprador, eu gostaria de pesquisar produtos utilizando palavras-chave.
  - História #6: Como comprador, gostaria de confirmar a compra do meu carrinho.
  - História #7: Como comprador gostaria de selecionar a forma de pagamento antes de realizar a compra.
  - História #8: Como comprador eu gostaria de ver sugestões de produtos da mesma categoria na página de um produto específico.
  - História #9: Como vendedor, eu gostaria de adicionar informações da minha loja como nome da loja, descrição e políticas de devolução.
  - História #10: Como vendedor, gostaria de adicionar produtos na minha loja.
  - História #11: Como vendedor, gostaria de monitorar a situação do meu estoque.
  - História #12: Como vendedor, gostaria de listar os produtos por categoria.
  - História #13: Como vendedor, gostaria de listar os produtos de forma ascendente ou descendente de preço.
  - História #14: Como vendedor, gostaria de visualizar os pedidos recebidos.
  - História #15: Como administrador, gostaria de remover lojas do sistema.
  - História #16: Como administrador, gostaria de remover compradores do sistema.
  - História #17: Como administrador, gostaria de visualizar o fluxo das transações (quantidade de vendas e montante) do aplicativo em um período de tempo.

## Backlog do sprint
### -História #1: Como um administrador do sistema, quero realizar o controle dos demais usuários do sistema, podendo vê-los, editá-los e excluí-los
    Tarefas e responsáveis:
    
    [FE] Tela de controle de usuário - parte visual [Iago]
    
    [FE] Tela de controle de usuário - conexão com o back [Iago]
    
    [BE] Rotas para controle de usuários: [Avelar]
    
### -História #2: Como um usuário do sistema, quero fazer login com e-mail e senha para acessar o sistema, mantendo a segurança dos dados.
    Tarefas e responsáveis:
    
    [FE] Tela de login - parte visual [Iago]
    
    [FE] Tela de login - conexão com o back [Iago]
    
    [BE] Rotas de Login [Avelar]
    
    [BE] Autenticação Login com JWT: [Avelar]

### -História #3: Como um comprador, quero conseguir me cadastrar no sistema
    Tarefas e responsáveis:
    
    [FE] Tela de cadastro de usuário - parte visual [Iago]
    
    [FE] Tela de cadastro de usuário - conexão com o back [Iago]
    
    [BE] Rotas para CRUD do usuário [Arthur]
    
### -História #4: Como um vendedor, quero conseguir cadastrar minha loja no sistema
    Tarefas e responsáveis:
    
    [FE] Tela de cadastro de vendedor - parte visual [Arthur]
    
    [FE] Tela de cadastro de vendedor - conexão com o back [Arthur]
    
    [BE] Rotas para CRUD de vendedor: [Avelar]
    
### -História #5: Como um vendedor, quero conseguir cadastrar, editar e excluir produtos na minha loja
    Tarefas e responsáveis:
    
    [FE] Tela de cadastro de produtos - parte visual [Iago]
    
    [FE] Tela de cadastro de produtos - conexão com o back [Arthur]
    
    [BE] Rotas para cadastro de produtos: [Arthur]
    
### -História #6: Como um comprador, quero conseguir cadastrar, editar e excluir produtos no meu carrinho
    Tarefas e responsáveis:
    
    [FE] Tela do carrinho - parte visual [Iago]
    
    [FE] Tela do carrinho  - conexão com o back [Daniel]
    
    [BE] Rotas para cadastro de produtos no carrinho [Daniel]
    
### -História #7: Como um comprador, quero conseguir pesquisar produtos utilizando palavras-chave, como nome e categoria.
    Tarefas e responsáveis:
    
    [FE] Tela de pesquisa - parte visual [Iago]
    
    [FE] Tela de pesquisa- conexão com o back [Daniel]
    
    [BE] Rotas para listagem de produtos [Daniel]
    
### -História #8: Como um comprador, quero conseguir realizar a compra dos produtos do meu carrinho
    Tarefas e responsáveis:
    
    [FE] Telas de compra - parte visual [Iago]
    
    [FE] Telas de compra - conexão com o back [Arthur]
    
    [BE] Rotas para efetuação de compra [Daniel]
    
# Arquitetura Hexagonal no Sistema

## Introdução

Optamos por utilizar a Arquitetura Hexagonal, também conhecida como "Portas e Adaptadores", em nosso sistema. Esta arquitetura é fundamental para garantir que nosso código de negócio permaneça isolado e desacoplado de detalhes técnicos, como frameworks, bibliotecas e sistemas externos. Assim, conseguimos uma maior flexibilidade e capacidade de manutenção, além de facilitar os testes unitários.

## Por que adotar a Arquitetura Hexagonal?

1. **Desacoplamento**: O núcleo do domínio não tem dependências diretas sobre detalhes de implementação, como acesso a bancos de dados ou serviços externos.
  
2. **Flexibilidade**: Facilita a substituição de componentes da infraestrutura sem afetar o domínio.

3. **Testabilidade**: Como o domínio é desacoplado da infraestrutura, testes unitários tornam-se mais simples e focados.

## Portas e Adaptadores: O que são e seus objetivos

- **Portas (Ports)**: São interfaces que definem os contratos de operações que o domínio precisa para executar sua lógica de negócio. Elas representam as "entradas" e "saídas" da aplicação.

- **Adaptadores (Adapters)**: São implementações concretas das portas. Eles "adaptam" um framework, biblioteca ou sistema externo para que o domínio possa interagir com eles sem conhecê-los diretamente.

### Exemplo:

Nosso domínio deve buscar o endereço de um usuário:

1. **Porta**: Criamos uma classe `AddressService` no domínio com um método `getAddress`.

```typescript
class AddressServiceClass{
    constructor(private addressRepository: AddressRepository) {}

    async create(address: CreationAttributes<AddressInterface>): Promise<AddressInterface> {
        return await this.addressRepository.create(address);
    }

    async getAddress(id: string): Promise<AddressInterface | null> {
        return await this.addressRepository.getAddress(id);
    }

    async update(address: CreationAttributes<AddressInterface>, idUser: string): Promise<AddressInterface> {
        return await this.addressRepository.update(address, idUser);
    }
}
```

2. **Adaptador**: Implementamos essa interface na camada de infraestrutura usando Sequelize.

```typescript
export class SequelizeAddressRepository implements AddressRepository{
    async getAddress(id: string) {
        try {
            const address = await Address.findOne({
                where: {
                    idUser: id,
                }
            });
            return address;
        } catch (error) {
            throw(error);
        }
    }

    //demais metódos da classe
}
```



