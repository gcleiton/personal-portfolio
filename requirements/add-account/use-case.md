# Caso de Uso

> ## Dados
* Usuário
* Nome
* Sobrenome
* Senha
* Email

> ## Fluxo primário
1. Consultar se já existe alguma conta com o username fornecido
2. Consultar se já existe alguma conta com o email fornecido
3. Gerar uma senha criptografada
4. Criar uma conta para o usuário com os dados fornecidos
5. Criar um token de acesso, a partir do ID do usuário, com expiração de 1 minuto
6. Criar um refresh token, a partir do ID do usuário, com expiração após 3 dias à meia noite.
7. Atualizar os dados do usuário com o token de acesso gerado
8. Atualizar os dados do usuário com o token de atualização gerado
9. Retorna o token de acesso, refresh token e sua expiração em milissegundos.
10. Enviar, em fila, um email para o usuário informando seu cadastro no sistema

> ## Fluxo de exceção: Username já existe 
1.  Retornar um erro do username já está associado a uma conta

> ## Fluxo de exceção: Email já existe 
2.  Retornar um erro do email já está associado a uma conta

