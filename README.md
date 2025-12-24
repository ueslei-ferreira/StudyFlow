# StudyFlow 🚀

Uma plataforma de checklists de estudo para desenvolvedores, focada em organização e acompanhamento de progresso.

> **Objetivo do Projeto:** Demonstrar competências Fullstack (Backend, Frontend e DevOps) criando uma aplicação funcional, moderna e dockerizada.

---

## 🛠️ Tecnologias Utilizadas

### Backend
- **Python & Django REST Framework:** API robusta e escalável.
- **JWT (JSON Web Tokens):** Autenticação segura e stateless.
- **PostgreSQL:** Banco de dados relacional.
- **Gunicorn:** Servidor de aplicação para produção.
- **Swagger/OpenAPI:** Documentação automática da API.

### Frontend
- **React (Vite) & TypeScript:** Desenvolvimento moderno, rápido e tipado.
- **Tailwind CSS:** Estilização responsiva e ágil.
- **React Query (TanStack Query):** Gerenciamento de estado do servidor e cache.
- **React Router:** Navegação SPA (Single Page Application).

### DevOps & Qualidade
- **Docker & Docker Compose:** Ambiente de desenvolvimento consistente e containerizado.
- **Railway:** Plataforma de Cloud (PaaS) para hospedagem do Backend e Banco de Dados.
- **Vercel:** Hospedagem otimizada para o Frontend.
- **GitHub Actions (CI):** Pipeline de integração contínua rodando testes e linting automaticamente.

---

## 🚀 Funcionalidades

-  **Autenticação:** Cadastro e Login de usuários com tokens JWT.
-  **Templates de Estudo:** Geração automática de checklists baseados em áreas (Backend, Frontend, etc.).
-  **Checklists Interativos:** Marcar itens como concluídos e acompanhar o progresso em tempo real.
-  **Dashboard:** Estatísticas de progresso, sequências (streaks) e insights motivacionais.
-  **Internacionalização:** Interface totalmente em Português.

---

## 💻 Como Rodar o Projeto Localmente

### Pré-requisitos
- Docker e Docker Compose instalados.

### Passo a Passo (Via Docker - Recomendado)

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/studyflow.git
   cd studyflow
   ```

2. **Suba os containers:**
   ```bash
   docker-compose up --build
   ```

3. **Acesse a aplicação:**
   - **Frontend:** [http://localhost:3000](http://localhost:3000)
   - **Backend API:** [http://localhost:8000/api/v1/](http://localhost:8000/api/v1/)
   - **Documentação (Swagger):** [http://localhost:8000/api/docs/swagger/](http://localhost:8000/api/docs/swagger/)

> **Nota:** O banco de dados é populado automaticamente com templates iniciais (Junior Backend/Frontend) na primeira execução.

---

## ☁️ Deploy (Produção)

O projeto está configurado para deploy contínuo:

### Backend (Railway)
- O backend é hospedado no **Railway**.
- Utiliza um serviço PostgreSQL gerenciado.
- A configuração de build é definida via `Dockerfile` e `Procfile`.
- Variáveis de ambiente configuradas no painel do Railway (`DATABASE_URL`, `SECRET_KEY`, etc).

### Frontend (Vercel)
- O frontend é hospedado na **Vercel**.
- Conecta-se à API do Railway.

---

## ⚙️ Variáveis de Ambiente (.env)

Para rodar localmente sem Docker ou configurar a produção, as seguintes variáveis são utilizadas:

```env
# Backend
DEBUG=True
SECRET_KEY=sua-chave-secreta
ALLOWED_HOSTS=*
DATABASE_URL=postgres://user:password@localhost:5432/db_name
CORS_ALLOWED_ORIGINS=http://localhost:3000,https://seu-frontend.vercel.app

# Frontend (.env.local)
VITE_API_URL=http://localhost:8000/api/v1
```

---

## 🏗️ Decisões Arquiteturais

- **Separação de Responsabilidades:** Backend apenas como API REST e Frontend como SPA consumindo a API.
- **React Query:** Escolhido para eliminar a complexidade de gerenciamento de estado global (Redux) para dados assíncronos, garantindo cache e atualizações otimistas.
- **Docker:** Utilizado para garantir que o ambiente de desenvolvimento seja idêntico ao de produção.
- **Typagem Estrita:** TypeScript utilizado no frontend para prevenir erros em tempo de compilação.

---

## ✅ Próximos Passos

- [x] Configurar Deploy Automático (Railway/Vercel).
- [ ] Implementar testes de integração (E2E) com Cypress ou Playwright.
- [ ] Adicionar modo escuro/claro (Dark Mode).
- [ ] Permitir que usuários criem seus próprios templates personalizados.