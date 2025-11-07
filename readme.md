Inicializar projeto

yarn init -y

Caso o yarn não exista, execute: npm install -g yarn

Instalar dependências

yarn add @types/express express @types/jest jest nodemon pg-promise ts-jest ts-node typescript axios

Criar pastas

src

test

Inicializar TypeScript

npx tsc --init

Modificar tsconfig.json

adicionar "include": ["src", "test"]

Inicializar ts-jest

npx ts-jest config:init

Testar o jest

npx jest

## Como Rodar (Docker - Recomendado)

Este método usa o Docker Compose para subir o backend (Node/Express) e o db (Postgres) juntos.

- Construir e Iniciar os Contêineres:
  (Isso usará o script compose:up do seu package.json)

npm run compose:up

O servidor estará rodando em http://localhost:3000. Graças ao nodemon e ao volume montado, qualquer alteração no diretório src/ reiniciará automaticamente o servidor.

Parar e Remover os Contêineres:
(Isso usará o script compose:down)

npm run compose:down

Acessar o Shell (bash) do Contêiner:
(Isso usará o script compose:exec)

npm run compose:exec

Scripts Adicionais

npm run dev: Inicia o servidor localmente (sem Docker) com nodemon.

npm run build: Compila o código TypeScript para JavaScript na pasta dist/.

npm run start: Inicia o servidor localmente (sem Docker) a partir dos arquivos compilados em dist/.

npm test: Roda os testes com Jest.

Conexão com Banco de Dados

O serviço db (Postgres) está definido no docker-compose.yaml.

Dentro do contêiner backend, o banco de dados está acessível pelo hostname db.

As credenciais padrão (definidas no compose) são:

Host: db

Usuário: admin

Senha: admin

Database: trading_platform
