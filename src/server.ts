import Fastify from 'fastify';
import dotenv from 'dotenv';
import { loginUser } from './routes/users/loginUser';
import { registerUser } from './routes/users/registerUser';
import { salonsRoutes } from './routes/salons/salonsRoutes';

// Carregar variáveis de ambiente
dotenv.config();

// Criar uma instância do Fastify
const app = Fastify({
  logger: true, // Habilitar o logger para depuração
});

// Registrar rotas
app.register(loginUser);
app.register(registerUser);
app.register(salonsRoutes);

// Iniciar o servidor
app.listen({ port: 3000, host: '0.0.0.0' })
  .then(() => {
    console.log("HTTP Server Running on port 3000");
  })
