# Cabeleleila System - Sistema de Agendamento de Serviços de Cabeleireiro

**Cabeleleila System** é um sistema de agendamento de serviços para o **Cabeleleila Leila**, uma empresa de cabeleireiro da cabeleleila leila. O sistema permite que os clientes agendem serviços de forma prática e eficiente, e que a leila gerencie esses agendamentos.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Tailwind CSS**: Framework CSS para criar interfaces modernas e responsivas.
- **Material UI**: Conjunto de componentes React para interfaces de usuário estilizadas.
- **Redux**: Biblioteca para gerenciamento de estado global da aplicação.
- **JSON Server**: Servidor REST falso para simulação de API.

## Requisitos para Rodar o Projeto

- **Node.js 18 ou superior** (recomendado: Node.js 20+)
- **npm**: Gerenciador de pacotes para JavaScript
- **Git** (opcional, mas recomendado para clonar o repositório)

---

## Passo a Passo para Rodar o JSON Server (Simulação de API)

### 1. Clone o repositório da API:

Primeiro, clone o repositório da API que simula o banco de dados (JSON Server).

```bash
git clone https://github.com/rykelme-stevenn/cabeleleila-leila-api.git
```
### 2. Instale o JSON Server globalmente:

```bash
npm install -g json-server
```

### 3. Inicie o JSON Server para simular uma API:

```bash
json-server --watch db.json --port 3000
```

## Passo a Passo para Rodar o Projeto

### 1. Clone o repositório do projeto principal:
```bash
git clone https://github.com/rykelme-stevenn/cabeleleila-leila.git
```

### 2. Navegue até a pasta do projeto:
```bash
cd cabeleleila-leila
```

### 3. Instale as dependências do projeto:
```bash
npm install
```

### 4. Inicie o servidor de desenvolvimento:
```bash
npm start
# O aplicativo estará acessível em http://localhost:3001 (ou na porta configurada).
```

Obs: Durante a execução, se o terminal pedir para rodar na porta 3001 (ou em outra), tecle yes

## Utilizando o sistema
#### Usuário comum
Para logar-se utilize algum desses dois usuários:

- Usuário: teste@outlook.com 
- Senha: teste123

#### Usuário leila(adm)
- Usuário: leilacabeleleila@outlook.com
- Senha: Corte123
