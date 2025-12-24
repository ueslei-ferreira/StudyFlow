# StudyFlow 🚀

Uma plataforma de checklists de estudo para desenvolvedores, focada em organização e acompanhamento de progresso.

> **Objetivo do Projeto:** Demonstrar competências Fullstack (Backend, Frontend e DevOps) criando uma aplicação funcional, moderna e dockerizada.

---

## 🛠️ Tecnologias Utilizadas

### Backend
- **Python & Django REST Framework:** API robusta e escalável.
- **JWT (JSON Web Tokens):** Autenticação segura e stateless.
- **PostgreSQL:** Banco de dados relacional (via Docker).
- **Gunicorn:** Servidor de aplicação para produção.

### Frontend
- **React (Vite) & TypeScript:** Desenvolvimento moderno, rápido e tipado.
- **Tailwind CSS:** Estilização responsiva e ágil.
- **React Query (TanStack Query):** Gerenciamento de estado do servidor e cache.
- **React Router:** Navegação SPA (Single Page Application).

### DevOps & Qualidade
- **Docker & Docker Compose:** Ambiente de desenvolvimento consistente e containerizado.
- **Nginx:** Servidor web para servir o frontend e fazer proxy reverso.
- **GitHub Actions (CI):** Pipeline de integração contínua rodando testes e linting automaticamente.
- **ESLint & Prettier:** Padronização de código.

---

## Funcionalidades

-  **Autenticação:** Cadastro e Login de usuários com tokens JWT.
-  **Templates de Estudo:** Geração automática de checklists baseados em áreas (Backend, Frontend, etc.).
-  **Checklists Interativos:** Marcar itens como concluídos e acompanhar o progresso em tempo real.
-  **Dashboard:** Estatísticas de progresso, sequências (streaks) e insights motivacionais.
-  **Internacionalização:** Interface totalmente em Português.

---

## Como Rodar o Projeto

### Pré-requisitos
- Docker e Docker Compose instalados.

### Passo a Passo (Recomendado)

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

##  Decisões Arquiteturais

- **Separação de Responsabilidades:** Backend apenas como API REST e Frontend como SPA consumindo a API.
- **React Query:** Escolhido para eliminar a complexidade de gerenciamento de estado global (Redux) para dados assíncronos, garantindo cache e atualizações otimistas.
- **Docker:** Utilizado para garantir que o ambiente de desenvolvimento seja idêntico ao de produção, eliminando o problema de "na minha máquina funciona".
- **Typagem Estrita:** TypeScript utilizado no frontend para prevenir erros em tempo de compilação e facilitar a manutenção.

---

##  Próximos Passos (Melhorias Futuras)

- [ ] Implementar testes de integração (E2E) com Cypress ou Playwright.
- [ ] Adicionar modo escuro/claro (Dark Mode).
- [ ] Permitir que usuários criem seus próprios templates personalizados.
- [ ] Deploy automático (CD) em plataforma cloud (Render/AWS).

---
