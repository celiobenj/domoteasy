# 🚧 Backend Implementation Checklist (Pendências)

Este documento lista as funcionalidades que precisam ser implementadas no Backend para atender estritamente aos requisitos dos Diagramas de Caso de Uso (UC), Diagramas de Estado e Arquitetura MVC do projeto Domoteasy.

Atualmente, o Backend suporta autenticação, listagem básica e criação de itens, mas carece das operações de **Gestão Completa (CRUD)** exigidas pelos perfis Administrativo e Técnico.

---

## 📦 Bloco 1: Gestão de Conteúdo (Dispositivos e Manuais)
**Referência:** [UC12] Gerenciar Conteúdo & Diagrama de Sequência SD12.

O sistema atual permite criar e listar, mas não permite editar ou excluir, o que viola o requisito de gestão completa.

### 1.1. Implementar Exclusão (DELETE)
- **Arquivo:** `entidades/e-dispositivo.js`
  - Criar método `remover(id)`.
  - **Lógica:** Deve executar `DELETE FROM dispositivos WHERE id = ?`.
  - *Atenção:* Garantir integridade referencial (se o manual não tiver `ON DELETE CASCADE`, removê-lo manualmente antes).
- **Arquivo:** `ctrl/ctrl-dispositivo.js`
  - Criar método `remover(req, res)`.
- **Arquivo:** `routes/conteudoRoutes.js`
  - Adicionar rota: `DELETE /admin/dispositivos/:id`.

### 1.2. Implementar Edição (PUT/PATCH)
- **Arquivo:** `entidades/e-dispositivo.js`
  - Criar método `atualizar(id, dados)`.
  - **Lógica:** Executar `UPDATE dispositivos SET ...` apenas para os campos enviados (nome, marca, preço, linkCompra).
  - *Nota:* Se houver dados de manual (`dados.manual`), atualizar também a tabela `manuais`.
- **Arquivo:** `ctrl/ctrl-dispositivo.js`
  - Criar método `atualizar(req, res)`.
- **Arquivo:** `routes/conteudoRoutes.js`
  - Adicionar rota: `PUT /admin/dispositivos/:id`.

---

## 🛠️ Bloco 2: Ciclo de Vida do Técnico (Administrativo)
**Referência:** [UC13] Gerenciar Profissionais & Diagrama de Estados STD02.

O sistema gerencia status (Aprovar/Inativar), mas falha ao não permitir a **Exclusão Definitiva** prevista no diagrama de estados para usuários inativos/rejeitados, e não fornece uma listagem completa para o Admin.

### 2.1. Listagem Completa para Admin
*O endpoint atual `/tecnicos` filtra apenas `status='ativo'`, impedindo o Admin de ver quem está "Pendente" para aprovar.*
- **Arquivo:** `entidades/e-tecnico.js`
  - Criar método `listarTodosAdmin()`.
  - **Query:** `SELECT * FROM tecnicos` (sem cláusula WHERE de status).
- **Arquivo:** `ctrl/ctrl-gestao.js`
  - Criar método `listarTodosTecnicos(req, res)`.
- **Arquivo:** `routes/adminRoutes.js`
  - Adicionar rota: `GET /profissionais`.

### 2.2. Implementar Exclusão de Técnico
*Transição final do Diagrama de Estados (`adminExclui`).*
- **Arquivo:** `entidades/e-tecnico.js`
  - Criar método `remover(id)`.
  - **Query:** `DELETE FROM tecnicos WHERE id = ?`.
- **Arquivo:** `ctrl/ctrl-gestao.js`
  - Adicionar tratamento para exclusão. Pode ser um novo método `excluirProfissional` ou adicionar um `case 'excluir'` no método `gerenciarProfissional` existente.
- **Arquivo:** `routes/adminRoutes.js`
  - Adicionar rota: `DELETE /profissionais/:idTecnico` (ou adaptar a rota POST de status se optar por switch/case, embora DELETE seja semanticamente melhor).

---

## 👤 Bloco 3: Perfil do Técnico (Auto-Gestão)
**Referência:** [UC10] Gerenciar Informações de Contato.

O backend possui a lógica na Entidade, mas ela está "morta" (não acessível via Controller/Rota). O técnico não consegue editar seus próprios dados.

### 3.1. Expor Edição de Perfil
- **Arquivo:** `ctrl/ctrl-tecnico.js`
  - Criar método `atualizarPerfil(req, res)`.
  - **Lógica:**
    1. Extrair `id` do token (`req.usuario.id`).
    2. Receber `telefone` e `especialidade` do `req.body`.
    3. Chamar `tecnico.atualizarDadosContato(id, { ... })` (método já existente na entidade).
- **Arquivo:** `routes/tecnicoRoutes.js`
  - Adicionar rota: `PATCH /meus-dados` (Protegida por `verificarToken`).

---

## 🔌 Bloco 4: Padronização de Dados (Mapeamento)
**Referência:** Diagrama de Classes e Contrato com Frontend.

Para evitar erros de integração, o Backend deve garantir consistência nos nomes dos campos ou o Frontend deve usar adaptadores. Recomenda-se ajustar o Backend para retornar o que o Diagrama de Classes especifica.

### 4.1. Payload de Criação de Dispositivo
O Frontend envia um objeto aninhado. O Backend deve estar preparado para desestruturá-lo corretamente.
- **Verificação em:** `ctrl/ctrl-dispositivo.js` -> método `criar`.
- **Expectativa de Entrada:**
  ```json
  {
    "dispositivo": { "nome": "...", "marca": "...", "preco": 10, "linkCompra": "..." },
    "manual": { "descricao": "...", "linkVideo": "..." }
  }