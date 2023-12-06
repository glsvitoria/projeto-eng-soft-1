# sistema_biblioteca

Projeto de um sistema de biblioteca para a disciplina de Engenharia de Software

## Descrição

O sistema de biblioteca consiste no gerenciamento e manutenção de livros disponíveis em uma biblioteca acadêmica. Ele permite que três tipos de usuários (alunos de graduação, alunos de pós-graduação e professores) realizem o empréstimo, devolução e reserva de livros disponíveis.

## Requisitos

- Um livro pode ter vários exemplares
- Cada livro deve possuir um código que o identifique e um título. Além dessas propriedades eles devem ter: editora, autores, edição e ano da publicação.
- Cada usuário deve ter um ID e um nome
- Cada tipo de usuário possui regras específicas para poder pegar livro emprestado
- Pode ser feito a reserva de livros. A reserva dele garante a prioridade no seu empréstimo apenas entre os alunos. PS: A reserva também deve ser mapeada no sistema

## Tipos de usuários

#### Tempo de empréstimo

- Alunos de graduação: 3 dias
- Alunos de pós-graduação: 4 dias
- Professores: 7 dias

## Funcionalidades

### Primeira funcionalidade

- Permitir o empréstimo de livros. Para pegar emprestado o usuário deve informar o comando `emp` seguido do ID dele e do código do livro.
- Caso ele já tenha feito uma reserva previamente, deve remover a reserva e efetivar o empréstimo
- Ao final deve ser enviado uma mensagem de sucesso ou insucesso
- Caso seja de insucesso deve mostrar o motivo do insucesso
- Regra de empréstimo para Aluno

  - Será concretizado o empréstimo se:
  - ( i ) Houver a disponibilidade de algum exemplar daquele livro na biblioteca
  - ( ii ) O usuário não estiver “devedor” de um livro em atraso
  - ( iii ) Forem obedecidas as regras específicas daquele tipo de usuário no que se refere à quantidade máxima de empréstimos
  - ( iv ) a quantidade de reservas existentes do livro for menor do que a quantidade de exemplares disponíveis, caso o usuário não tenha reserva para ele
  - ( v ) a quantidade de reservas for maior ou igual a de exemplares, mas uma das reservas é do usuário
  - ( vi ) o usuário não tiver nenhum empréstimo em curso de um exemplar daquele mesmo livro.

    ##### Quantidade máxima de empréstimos

    - Alunos de graduação: 3 livros
    - Alunos de pós-graduação: 4 livros

- Regra de empréstimo para Professor

  - Será concretizado o empréstimo se:
  - (i) houver a disponibilidade de algum exemplar daquele livro na biblioteca
  - (ii) o usuário não estiver “devedor” de um livro em atraso

  \*\* Note que os professores não tem empréstimo negado caso haja reservas para aquele livro e não tem limite da quantidade de livros que pode pegar emprestado

### Segunda funcionalidade

- Deve permitir a devolução de um livro
- Na hora da devolução deve informar o comando `dev` seguido do ID dele e o ID do exemplar
- Ao final deve ser enviado uma mensagem de sucesso ou insucesso que mencione o nome do usuário e o título do livro
- A mensagem de insucesso deve dizer o motivo. O insucesso só ocorre se não houver empréstimo em aberto daquele livro para aquele usuário

### Terceira funcionalidade

- O sistema deve permitir a reserva de um livro
- O usuário deve digitar o comando `res` seguido do ID dele e o código do livro
- Só será permitida a reserva de apenas 3 livros por usuário
- Ao final deve emitir uma mensagem de sucesso ou insucesso da reserva que mencione o nome do usuário e o título do livro
- A mensagem de insucesso deve dizer o motivo

### Quarta funcionalidade

- O sistema deve permitir que professores registrem que querem observar toda vez que determinado livro tiver mais de duas reservas simultâneas
- Ele se regista como observador
- Toda vez que tiver mais de duas reservas, deve avisar aos observadores
- Implemente essa funcionalidade usando um padrão que permita facilmente essa evolução no futuro com outros cargos
- Para registrar um professor como observador deve digitar `obs` seguido do ID dele e o código do livro
- Não há necessidade de checar se o código do usuário se refere realmente a um professor. ??

### Quinta.1 funcionalidade

- Dado o código de um livro, o sistema deve apresentar suas informações da seguinte forma:
  - ( i ) Título
  - ( ii ) Quantidade de reservas para aquele livro, e, se diferente de zero, devem ser também apresentados o nome dos usuários que realizaram cada reserva
  - ( iii ) Para cada exemplar, deve ser apresentado seu código, seu status (disponível ou emprestado), e em caso do exemplar estar emprestado deverá ser exibido o nome do usuário que realizou o empréstimo, a data de empréstimo e a data prevista para devolução
- Para solicitar a consulta, o usuário deve digitar `liv` seguido do código do livro

### Quinta.2 funcionalidade

- Dado um usuário, o sistema deverá apresentar a lista de todos os seus empréstimos correntes e passados, assim como de suas reservas
- A listagem de cada empréstimo deverá apresentar o título do livro, a data do empréstimo, o status atual daquele empréstimo (em curso ou finalizado) e a data da devolução já realizada ou prevista
- A listagem das reservas deverá apresentar o título do livro reservado e a data da solicitação da reserva
- Para solicitar tal consulta, o usuário deverá digitar o comando `usu` seguido do ID do usuário

### Quinta.3 funcionalidade

- Dado um professor, o sistema deve retornar a quantidade de vezes que ele foi notificado sobre mais de duas reservas simultâneas em livros observados por ele
- Para solicitar tal consulta, o usuário deverá digitar o comando `ntf` seguido do ID do usuário
- Não há necessidade de checar se o código se refere realmente a um professor

### Sexta funcionalidade

- O usuário deve ter a opção de sair do sistema. Para isso, basta digitar o comando `sai`
