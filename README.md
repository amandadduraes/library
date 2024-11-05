# Marie Library

Este é um projeto da biblioteca Marie onde os usuários podem favoritar, alugar e devolver livros.

## Funcionalidades

- Listar livros
- Favoritar livros
- Reservar e devolver livros
- Sistema de autenticação de usuários

## Tecnologias Utilizadas

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [React Context API](https://reactjs.org/docs/context.html)

## Como Rodar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/username/library.git
.
   - Entre no arquivo:cd library
   - Instale suas dependências : npm install
   - Crie seu arquivo .env e coloque as informações de seu banco de dados. No projeto utilizei o Postgree versão 16.
   - Após feito todos estes passo rode o projeto com:  npm run dev
   - Acesse a aplicaçãc: http://localhost:3000/auth

## Principais Funcionalidades

### Sistema de Autenticação
- Permite que usuários se registrem e façam login.
- Armazena informações do usuário durante a sessão.

O projeto implementa um sistema de autenticação que permite que os usuários se cadastrem, façam login e logout. Isso é gerenciado pela Context API do React, que armazena o estado de autenticação e informações do usuário. 

Funções:
login(username: string, password: string): Realiza a autenticação do usuário e armazena as informações do usuário ao fazer login. Não precisa ter email basta colocar seu username, onde deve conter mais que três caracteres para username e seis caracteres para a senha.
logout(): Limpa as informações do usuário e redireciona para a página de login.

### Gerenciamento de Favoritos
- Adiciona e remove livros da lista de favoritos.
- Os favoritos são armazenados no `localStorage` para persistência.

  Os usuários podem favoritar livros, que são armazenados em um contexto de favoritos utilizando o FavoritesContext. Isso permite que os usuários visualizem facilmente seus livros favoritos.

Funções:
addFavorite(book: Favorite): Adiciona um livro aos favoritos, armazenando-o no localStorage.
removeFavorite(bookId: number): Remove um livro da lista de favoritos, atualizando também o localStorage.
setFavorites(favorites: Favorite[]): Permite definir os favoritos, por exemplo, ao carregar os favoritos do usuário ao fazer login.

### Listagem e Interação com Livros
- Exibe uma lista de livros disponíveis.
- Permite reservar e devolver livros.

- A aplicação permite que os usuários visualizem uma lista de livros disponíveis, com a capacidade de reservar e devolver livros.

Funções:
getAll: Recupera todos os livros disponíveis no banco de dados através de uma consulta TRPC, realizando chamadas para obter livros, adicionar favoritos e realizar operações de reserva e devolução de livros.
handleFavoriteToggle(book: Book): Adiciona ou remove um livro da lista de favoritos, dependendo do estado atual.
handleReserve(book: Book): Reserva um livro se estiver disponível, atualizando o estado do livro e persistindo a alteração no banco de dados.
handleReturn(book: Book): Devolve um livro, atualizando seu estado e persistindo a mudança.

### Componentização
- Utiliza componentes reutilizáveis para facilitar a manutenção do código.
- O componente `BookCard` exibe informações sobre os livros , com nome, descrição, imagem do livro, nome do autor

### Persistência de Dados
- Utiliza `localStorage` para garantir que os dados dos favoritos sejam mantidos entre sessões.
   
