# Caso de Uso

> ## Dados
* Usuário
* Nome
* Sobrenome
* Senha
* Email

> ## Fluxo primário
1. ✅ Consultar se já existe alguma conta com o username fornecido
2. ✅ Consultar se já existe alguma conta com o email fornecido
3. ✅ Gerar uma senha criptografada
4. ✅ Criar uma conta para o usuário com os dados fornecidos
5. Autenticar o usuário
6. Retornar o token de acesso, refresh token e sua expiração em milissegundos.
7. Enviar, em fila, um email para o usuário informando seu cadastro no sistema

> ## Fluxo de exceção: Username já existe 
1. ✅ Retornar um erro do username já está associado a uma conta

> ## Fluxo de exceção: Email já existe 
2. ✅ Retornar um erro do email já está associado a uma conta
