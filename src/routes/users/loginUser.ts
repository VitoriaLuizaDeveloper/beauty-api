import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../lib/prisma";
import { randomBytes } from "crypto";

export async function loginUser(app: FastifyInstance) {
  app.post("/login", async (request: FastifyRequest, reply: FastifyReply) => {
    const { email, senha } = request.body as { email: string; senha: string };

    // Validação simples dos dados
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return reply.status(400).send({ message: "E-mail inválido." });
    }
    if (senha.length < 6) {
      return reply.status(400).send({ message: "Senha deve ter pelo menos 6 caracteres." });
    }

    // Buscar usuário no banco de dados
    const usuario = await prisma.usuario.findUnique({
      where: { email },
    });

    // Verificar se o usuário existe e se a senha está correta
    if (!usuario || usuario.senha !== senha) {
      return reply.status(400).send({ message: "E-mail ou senha incorretos." });
    }

    // Gerar um token aleatório
    const token = randomBytes(16).toString('hex');

    // Atualizar o token no banco de dados
    await prisma.usuario.update({
      where: { email },
      data: { token }, // Armazena o token gerado
    });

    return reply.send({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      token, // Retorna o token gerado
    });
  });
}
