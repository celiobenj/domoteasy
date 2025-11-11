### Rotas de Autenticação de Usuários (/usuario)
  #### p/ cadastro: POST /usuario/cadastro:
  req = {"nome": "fulano de tal", "email": "algum@email.com", "senha": "******"} <br>
  res = {"token": "jwt.token.aqui"} <br>
  res (erro) = {"erro": "Este e-mail já está cadastrado."}
  > verifica se existe email igual. caso não, realiza o cadastro e responde com um token de acesso (JWT).
  
  #### p/ login: POST /usuario/login:
  req = {"email": "algum@email.com", "senha": "******"} <br>
  res = {"token": "jwt.token.aqui"} <br>
  res (erro) = {"erro": "Email ou senha inválidos."}
  > verifica se existe o email. se existe, verifica se a senha bate. se bater, responde com um token de acesso (JWT).

### Rotas de Gerenciamento de Perfil (/usuario) (Requer Header: "Authorization: Bearer \<token>\")
  #### p/ atualizar dados: PATCH /usuario/atualizar:
  req = {"dados": {"senha": "nova_senha_123"}} <br>
  res = {"id": 1, "nome": "fulano", "email": "algum@email.com", "tipoAssinatura": "Comum"} <br>
  res (erro) = {"erro": "Token inválido ou expirado."} ou {"erro": "Token de acesso não fornecido."} <br>
  > Pega o 'id' do usuário de dentro do token JWT (ignora o body). <br>
  > Atualiza os dados. (Obs: O controller atual só está tratando a dados.senha). <br>
  > Retorna os dados públicos do usuário atualizado (sem o hash da senha).
