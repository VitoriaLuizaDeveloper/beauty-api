import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../lib/prisma";

export async function registerUser(app: FastifyInstance) {
  app.post("/cadastro", async (request: FastifyRequest, reply: FastifyReply) => {
    const { nome, email, senha } = request.body as { nome: string; email: string; senha: string };

    // Validação simples dos dados
    if (nome.length < 3) {
      return reply.status(400).send({ message: "Nome deve ter pelo menos 3 caracteres." });
    }
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return reply.status(400).send({ message: "E-mail inválido." });
    }
    if (senha.length < 6) {
      return reply.status(400).send({ message: "Senha deve ter pelo menos 6 caracteres." });
    }

    // Verificar se o usuário já existe
    const existingUser = await prisma.usuario.findUnique({
      where: { email },
    });

    if (existingUser) {
      return reply.status(400).send({ message: "Este e-mail já está registrado." });
    }

    // Criar novo usuário
    const novoUsuario = await prisma.usuario.create({
      data: { nome, email, senha },
    });

    return reply.status(201).send({
      id: novoUsuario.id,
      nome: novoUsuario.nome,
      email: novoUsuario.email,
    });
  });
}
