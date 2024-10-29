import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
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

// Middleware para CORS
app.register(fastifyCors, {
  origin: '*', // Permitir todas as origens
});

app.register(loginUser);
app.register(registerUser);
app.register(salonsRoutes);

// Iniciar o servidor
app.listen({
  host: '0.0.0.0',
  port: process.env.PORT ? Number(process.env.PORT) : 3000,
}).then(() => {
  console.log("HTTP Server Running!");
});
