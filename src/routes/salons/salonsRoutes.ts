import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../lib/prisma";
import { authMiddleware } from "../../middleware/authMiddleware";

// Rotas relacionadas a salões, favoritos e serviços
declare module 'fastify' {
  interface FastifyRequest {
    user?: {
      id: number; // O tipo que você está usando para o id do usuário
      nome: string; // Adicione outras propriedades conforme necessário
    };
  }
}

export async function salonsRoutes(app: FastifyInstance) {
  // Aplica o middleware de autenticação a todas as rotas
  app.addHook('preHandler', authMiddleware);

  // Listar todos os salões
  app.get("/saloes", async (request: FastifyRequest, reply: FastifyReply) => {
    const saloes = await prisma.salao.findMany({
      select: {
        id: true,
        nome: true,
        logo: true,
        endereco: true,
      },
    });
    return reply.send(saloes);
  });

  // Obter detalhes de um salão específico
  app.get("/salao/:id", async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    const salao = await prisma.salao.findUnique({
      where: { id: parseInt(id) },
      select: {
        nome: true,
        logo: true,
        endereco: true,
        atendente: {
          select: {
            nome: true,
            foto: true,
            bio: true,
          },
        },
      },
    });

    if (!salao) {
      return reply.status(404).send({ message: "Salão não encontrado." });
    }

    return reply.send({
      ...salao,
      nomeAtendente: salao.atendente?.nome || "Atendente não disponível",
      fotoAtendente: salao.atendente?.foto || "foto-padrao.jpg",
      bioAtendente: salao.atendente?.bio || "Bio não disponível",
    });
  });

  // Adicionar salão aos favoritos
  app.post("/favoritos", async (request: FastifyRequest, reply: FastifyReply) => {
    const usuarioId = request.user?.id; // Obtém o ID do usuário autenticado
    const { salaoId } = request.body as { salaoId: number }; // Salão a ser adicionado como favorito

    if (!usuarioId || !salaoId) {
      return reply.status(400).send({ message: "ID do usuário e ID do salão são obrigatórios." });
    }

    try {
      // Verifica se o salão já é favorito
      const existingFavorite = await prisma.favorito.findUnique({
        where: {
          usuarioId_salaoId: {
            usuarioId,
            salaoId,
          },
        },
      });

      if (existingFavorite) {
        return reply.status(400).send({ message: "Este salão já é um favorito." });
      }

      // Adiciona o salão aos favoritos
      const favorito = await prisma.favorito.create({
        data: {
          usuarioId,
          salaoId,
        },
      });

      return reply.send(favorito);
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ message: "Erro ao adicionar salão aos favoritos." });
    }
  });

  // Listar salões favoritos
  app.get("/favoritos", async (request: FastifyRequest, reply: FastifyReply) => {
    const usuarioId = request.user?.id; // Obtém o ID do usuário autenticado
  
    if (!usuarioId) {
      return reply.status(400).send({ message: "ID do usuário é obrigatório." });
    }
  
    try {
      const favoritos = await prisma.favorito.findMany({
        where: { usuarioId: usuarioId },
        select: {
          salao: {
            select: {
              id: true,
              nome: true,
              logo: true,
              endereco: true,
            },
          },
        },
      });
  
      // Se não houver salões favoritos, retornar mensagem apropriada
      if (favoritos.length === 0) {
        return reply.send({ message: "Nenhum salão favorito encontrado." });
      }
  
      // Mapear os salões favoritos para o formato desejado
      const saloesFavoritos = favoritos.map((favorito) => favorito.salao);
  
      return reply.send(saloesFavoritos);
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ message: "Erro ao obter salões favoritos." });
    }
  });

  // Remover salão dos favoritos
  app.delete("/favoritos/:salaoId", async (request: FastifyRequest, reply: FastifyReply) => {
    const usuarioId = request.user?.id; // Obtém o ID do usuário autenticado
    const { salaoId } = request.params as { salaoId: string }; // ID do salão a ser removido
  
    if (!usuarioId) {
      return reply.status(400).send({ message: "ID do usuário é obrigatório." });
    }
  
    try {
      const favorito = await prisma.favorito.deleteMany({
        where: {
          usuarioId,
          salaoId: parseInt(salaoId),
        },
      });
  
      if (favorito.count === 0) {
        return reply.status(404).send({ message: "Favorito não encontrado." });
      }
  
      return reply.send({ message: "Salão removido dos favoritos com sucesso." });
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ message: "Erro ao remover salão dos favoritos." });
    }
  });

  // Listar serviços de um salão
  app.get("/salao/:id/servicos", async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };

    const servicos = await prisma.servico.findMany({
      where: {
        salaoId: parseInt(id),
      },
      select: {
        nome: true,
        descricao: true,
        valor: true,
      },
    });

    if (servicos.length === 0) {
      return reply.status(404).send({ message: "Este salão não possui serviços cadastrados." });
    }

    return reply.send(servicos);
  });
}