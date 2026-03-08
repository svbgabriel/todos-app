# Tarefas App (To-do) - Guia de Introdução ao React & TypeScript

Este projeto é uma aplicação de lista de tarefas (To-do) simples, moderna e robusta, projetada para servir como uma introdução prática ao desenvolvimento com **React 19**, **TypeScript**, **Vite** e **pnpm**.

---

## 📚 Como o React & TypeScript funcionam?

O **React** é uma biblioteca JavaScript para construir interfaces baseadas em componentes. O **TypeScript** entra como uma camada de segurança sobre o JavaScript:

1.  **Tipagem Estática**: Definimos "contratos" para nossos dados (veja `src/types.ts`). Se tentarmos usar um dado de forma errada, o editor nos avisa antes mesmo de rodarmos o código.
2.  **Componentização**: A interface é dividida em peças reutilizáveis.
3.  **Estado (State)**: Gerenciamos o que muda na tela com o hook `useState`.
4.  **Virtual DOM**: O React atualiza apenas o que é necessário, garantindo alta performance.

---

## 🛠️ Tecnologias Usadas

-   **[React 19](https://react.dev/)**: Biblioteca principal.
-   **[TypeScript](https://www.typescriptlang.org/)**: Tipagem estática para código mais seguro.
-   **[Vite](https://vitejs.dev/)**: Ferramenta de build ultra-rápida.
-   **[pnpm](https://pnpm.io/)**: Gerenciador de pacotes eficiente.
-   **LocalStorage API**: Persistência de dados no navegador.

---

## 🚀 Como Executar o Projeto

1.  **Instalar pnpm** (se não tiver): `npm install -g pnpm`
2.  **Instalar dependências:**
    ```bash
    pnpm install
    ```
3.  **Rodar em modo de desenvolvimento:**
    ```bash
    pnpm dev
    ```
4.  **Verificar erros de tipo (TypeScript):**
    ```bash
    pnpm exec tsc
    ```
5.  **Criar versão de produção:**
    ```bash
    pnpm build
    ```

---

## 🌐 Como fazer o Deploy

Recomendamos **Vercel** ou **Netlify**. Ambas detectam o Vite automaticamente e suportam TypeScript nativamente no processo de build.

---

## 💡 Estrutura de Arquivos (TypeScript)
-   **`src/types.ts`**: Onde definimos as interfaces globais (como o `TodoType`).
-   **`src/App.tsx`**: Componente principal com a lógica de estado.
-   **`src/components/Todo.tsx`**: Componente de item individual, tipado com as props corretas.
-   **`tsconfig.json`**: Configurações do compilador TypeScript.
