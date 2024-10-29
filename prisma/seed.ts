import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Criação de Atendentes
  await prisma.atendente.createMany({
    data: [
      { nome: 'Ana Silva', foto: 'https://ui-avatars.com/api/?name=Ana+Silva', bio: 'Especialista em corte e coloração' },
      { nome: 'Carlos Pereira', foto: 'https://ui-avatars.com/api/?name=Carlos+Pereira', bio: 'Barbeiro e cabeleireiro masculino' },
      { nome: 'Mariana Lima', foto: 'https://ui-avatars.com/api/?name=Mariana+Lima', bio: 'Especialista em tratamentos capilares' },
      { nome: 'Pedro Oliveira', foto: 'https://ui-avatars.com/api/?name=Pedro+Oliveira', bio: 'Maquiador e cabeleireiro' },
      { nome: 'Joana Souza', foto: 'https://ui-avatars.com/api/?name=Joana+Souza', bio: 'Especialista em unhas e sobrancelhas' },
    ],
  });

  // Criação de Salões
  await prisma.salao.createMany({
    data: [
      { nome: 'Beleza Pura', logo: 'https://picsum.photos/200/300?random=1', endereco: 'Rua das Flores, 123', atendenteId: 1 },
      { nome: 'Corte Certo', logo: 'https://picsum.photos/200/300?random=2', endereco: 'Avenida Central, 45', atendenteId: 2 },
      { nome: 'Estilo Feminino', logo: 'https://picsum.photos/200/300?random=3', endereco: 'Praça das Américas, 789', atendenteId: 3 },
      { nome: 'Barbearia Top', logo: 'https://picsum.photos/200/300?random=4', endereco: 'Rua dos Homens, 56', atendenteId: 4 },
      { nome: 'Unhas Perfeitas', logo: 'https://picsum.photos/200/300?random=5', endereco: 'Shopping Center, 10', atendenteId: 5 },
    ],
  });

  // Criação de Serviços
  await prisma.servico.createMany({
    data: [
      { nome: 'Corte de cabelo', descricao: 'Corte masculino e feminino', valor: 50.0, salaoId: 1 },
      { nome: 'Coloração', descricao: 'Tintura e coloração capilar', valor: 120.0, salaoId: 1 },
      { nome: 'Manicure', descricao: 'Manicure e pedicure completo', valor: 30.0, salaoId: 5 },
      { nome: 'Maquiagem', descricao: 'Maquiagem profissional', valor: 100.0, salaoId: 4 },
      { nome: 'Tratamento Capilar', descricao: 'Hidratação e recuperação capilar', valor: 200.0, salaoId: 3 },
    ],
  });

  // Criação de Usuários
  await prisma.usuario.createMany({
    data: [
      { nome: 'João', email: 'joao@example.com', senha: 'senha123' },
      { nome: 'Maria', email: 'maria@example.com', senha: 'senha123' },
      { nome: 'Carlos', email: 'carlos@example.com', senha: 'senha123' },
      { nome: 'Ana', email: 'ana@example.com', senha: 'senha123' },
      { nome: 'Fernanda', email: 'fernanda@example.com', senha: 'senha123' },
    ],
  });

  // Criação de Favoritos
  await prisma.favorito.createMany({
    data: [
      { usuarioId: 1, salaoId: 1 },
      { usuarioId: 2, salaoId: 2 },
      { usuarioId: 3, salaoId: 3 },
      { usuarioId: 4, salaoId: 4 },
      { usuarioId: 5, salaoId: 5 },
    ],
  });

  // Criação de Horários
  await prisma.horario.createMany({
    data: [
      { servicoId: 1, dataHora: new Date('2024-10-23T09:00:00Z'), disponivel: true },
      { servicoId: 1, dataHora: new Date('2024-10-23T10:00:00Z'), disponivel: true },
      { servicoId: 2, dataHora: new Date('2024-10-23T11:00:00Z'), disponivel: true },
      { servicoId: 3, dataHora: new Date('2024-10-23T14:00:00Z'), disponivel: true },
      { servicoId: 4, dataHora: new Date('2024-10-23T15:00:00Z'), disponivel: true },
      { servicoId: 5, dataHora: new Date('2024-10-23T16:00:00Z'), disponivel: true },
    ],
  });

  console.log('Seed executado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });