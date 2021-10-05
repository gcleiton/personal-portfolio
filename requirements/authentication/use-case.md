# Caso de Uso

> ## Dados
* Usuário
* Senha

> ## Fluxo primário
1. Consultar se existe alguma conta com o username e senha fornecidos
2. Criar um token de acesso, a partir do ID do usuário, com expiração de 30 minutos
3. Criar um refresh token, a partir do ID do usuário, com expiração de 30 dias.
4. Atualizar os dados do usuário com o token de atualização gerado
5. Retornar o token de acesso e o refresh token.

> ## Fluxo de exceção: Usuário não existe
1. ✅ Retornar um erro de autenticação
