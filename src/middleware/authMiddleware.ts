import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../lib/prisma";

export const authMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
  // Obtendo o token do cabeçalho Authorization
  const authHeader = request.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer TOKEN"

  if (!token) {
    return reply.status(401).send({ message: "Token não fornecido." });
  }

  try {
    // Buscando o usuário com base no token
    const usuario = await prisma.usuario.findFirst({
      where: { token },
      select: { id: true, nome: true, email: true }, // Selecionando os campos que você precisa
    });

    if (!usuario) {
      return reply.status(403).send({ message: "Token inválido." });
    }

    // Adiciona o usuário ao objeto de requisição
    request.user = usuario;
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Erro ao verificar o token." });
  }
};
