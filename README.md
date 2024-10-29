<h1> Projeto Beauty</h1>
<p>Este projeto é uma aplicação desenvolvida com Fastify e Prisma para gerenciamento de agendamentos. Siga as instruções abaixo para configurar e executar a aplicação.</p>

<h2>Pré-requisitos</h2>
<p>Certifique-se de ter os seguintes itens instalados em seu sistema:</p>
<ul>
    <li><a href="https://nodejs.org/">Node.js</a> (v16 ou superior)</li>
    <li><a href="https://www.npmjs.com/">npm</a> (geralmente já incluído com o Node.js)</li>
</ul>

<h2>Instalação</h2>
<ol>
    <li>
        <strong>Clone o repositório:</strong>
        <pre><code>git clone https://github.com/developer-vitoria-luiza/beauty-api</code></pre>
    </li>
    <li>
        <strong>Instale as dependências:</strong>
        <pre><code>npm install</code></pre>
    </li>
</ol>

<h2>Configuração</h2>
<ol>
    <li>
        <strong>Crie um arquivo <code>.env</code> na raiz do projeto</strong> e adicione suas variáveis de ambiente. Um exemplo pode incluir configurações de banco de dados, como:
        <pre><code>DATABASE_URL="sua_url_do_banco_de_dados"</code></pre>
    </li>
    <li>
        <strong>Inicialize o Prisma:</strong>
        <ol>
        <li>
        <strong>Para gerar os arquivos do cliente Prisma e criar o banco de dados, execute:</strong>
        <pre><code>npx prisma migrate dev</code></pre>
        <p>Este comando não só cria o banco de dados, mas também executa as migrações necessárias e gera dados aleatórios no banco, conforme definido no seu arquivo de semente. Isso permite que você comece a trabalhar com dados de teste imediatamente.</p>
     </li>
        </ol>
    </li>
</ol>

<h2>Execução</h2>
<p>Para iniciar a aplicação em modo de desenvolvimento, use o seguinte comando:</p>
<pre><code>npm run dev</code></pre>
<p>Isso iniciará o servidor com o <code>tsx</code> em modo de observação, reiniciando automaticamente sempre que houver alterações nos arquivos.</p>

<h2>Estrutura do Projeto</h2>
<ul>
    <li><strong>src/</strong>: Contém o código fonte da aplicação.
        <ul>
            <li><strong>server.ts</strong>: O ponto de entrada do servidor Fastify.</li>
        </ul>
    </li>
</ul>

<h2>Scripts</h2>
<ul>
    <li><strong>dev</strong>: Inicia o servidor em modo de desenvolvimento.
        <pre><code>npm run dev</code></pre>
    </li>
    <li><strong>seed</strong>: Semear o banco de dados com dados iniciais.
        <pre><code>npm run seed</code></pre>
    </li>
</ul>

<h2>Dependências</h2>
<p>O projeto utiliza as seguintes dependências:</p>
<ul>
    <li><strong>@prisma/client</strong>: Cliente para interação com o banco de dados.</li>
    <li><strong>bcrypt</strong>: Biblioteca para hashing de senhas.</li>
    <li><strong>dotenv</strong>: Carrega variáveis de ambiente a partir de um arquivo <code>.env</code>.</li>
    <li><strong>fastify</strong>: Framework web rápido para Node.js.</li>
    <li><strong>jsonwebtoken</strong>: Biblioteca para manipulação de JSON Web Tokens.</li>
    <li><strong>prisma</strong>: ORM para Node.js.</li>
</ul>


<h1>Testando a API</h1>
<p>Para interagir com as rotas da API, você precisará primeiro autenticar um usuário e obter um token. Siga os passos abaixo:</p>

<h2>1. Realizar Login</h2>
<p>Antes de acessar as demais rotas, você deve realizar o login de um usuário existente para obter um token de autenticação. Utilize a rota de login conforme demonstrado no arquivo <code>api.http</code>.</p>
<pre>
<code>
Rota: POST http://localhost:3000/login
Corpo da Requisição:
{
  "email": "seu.email@example.com",
  "senha": "suaSenha"
}
</code>
</pre>

<h2>2. Utilizar o Token nas Demais Rotas</h2>
<p>Com o token obtido, você pode acessar as rotas protegidas da API. Para isso, inclua o token no cabeçalho da requisição usando o formato <code>Authorization: Bearer &lt;seu_token_aqui&gt;</code>.</p>
<pre>
<code>
Rota: GET http://localhost:3000/saloes
Cabeçalho: 
Authorization: Bearer &lt;seu_token_aqui&gt;
</code>
</pre>

<h2>3. Acessar as Demais Rotas</h2>
<p>Agora você pode utilizar o token para acessar outras rotas, como:</p>
<ul>
  <li>Listar salões: GET http://localhost:3000/saloes</li>
  <li>Adicionar favoritos: POST http://localhost:3000/favoritos</li>
  <li>Remover salões dos favoritos: DELETE http://localhost:3000/favoritos/:id</li>
  <li>Obter detalhes de salões: GET http://localhost:3000/salao/:id</li>
</ul>
<p>Todas essas rotas requerem autenticação e devem incluir o token no cabeçalho.</p>

<h3>Observações</h3>
<ul>
  <li>Garanta que o servidor esteja em execução em http://localhost:3000 antes de testar as rotas.</li>
  <li>Utilize ferramentas como Postman ou Insomnia para facilitar o teste das rotas da API.</li>
</ul>
