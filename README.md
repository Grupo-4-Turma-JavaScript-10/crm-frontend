Sistema de Gestão CRM

Um sistema de gestão de estudantes e bolsas desenvolvido com React e TailwindCSS, permitindo gerenciar informações de estudantes e controlar bolsas de forma prática e visual.

O frontend consome uma API RESTful externa para persistência de dados.


Funcionalidades

Cadastro, edição e exclusão de estudantes.

Controle do status do estudante (ativo/inativo).

Visualização de quais estudantes possuem bolsa.

Interface intuitiva com cards de estudantes, mostrando informações detalhadas: nome, email, idade, endereço e bolsa.

Ícones interativos para editar e deletar estudantes.


Tecnologias

Frontend: React, TypeScript, TailwindCSS, React Router

Componentes: react-icons (para ícones de edição e exclusão), react-spinners (para loading)

Serviços: Axios para requisições HTTP

Backend: API RESTful externa (Node.js/NestJS/MySQL ou outra)

Como usar

Visualizar estudantes:

A tela inicial mostra uma lista de estudantes com informações básicas: nome, email, idade, endereço e se possui bolsa.

Alterar status do estudante:

Use o select de status no card do estudante para ativar ou inativar o registro.

Editar estudante:

Clique no ícone de lápis para navegar até o formulário de edição do estudante.

Excluir estudante:

Clique no ícone de lixeira para remover o estudante.

Licença

Este projeto está licenciado sob a MIT License – veja o arquivo LICENSE
 para detalhes.

Screenshots

![alt text](image.png)