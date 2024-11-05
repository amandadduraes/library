// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.book.createMany({
    data: [
      {
        title: "A menina que roubava livros",
        author: "Markus Zusak",
        description: "A menina que roubava livros é um romance de Markus Zusak que conta a história de Liesel Meminger, uma menina alemã que sobrevive à Segunda Guerra Mundial lendo livros roubados",
        imageUrl: "/amenina.jpeg", 
        isAvailable: true,
      },
      {
        title: "A paciente silenciosa",
        author: "Alex Michaelides",
        description: "A paciente silenciosa é um thriller psicológico escrito por Alex Michaelides que conta a história de Alicia Berenson, uma pintora que mata o marido, Gabriel, e se recusa a falar sobre o crime",
        imageUrl: "/pacienteSilenciosa.jpeg",
        isAvailable: true,
      },
      {
        title: "Mundo de Sofia",
        author: "Jostein Gaarder",
        description: "O Mundo de Sofia é uma obra multifacetada que aborda uma ampla gama de temas filosóficos enquanto narra a jornada de autoconhecimento e descoberta da protagonista, Sofia Amundsen",
        imageUrl: "/sophia.jpeg",
        isAvailable: true,
      },
      {
        title: "A culpa é das estrelas",
        author: "John Green",
        description: "Com humor, doçura e melancolia, John Green narra o romance de dois adolescentes que se conhecem em um Grupo de Apoio para Crianças com Câncer. Hazel é uma paciente terminal cuja vida vem sendo prolongada por uma nova droga. Augustus foi jogador de basquete até perder uma perna para o osteossarcoma. Como Hazel, Gus gosta de ironizar os clichês do mundo do câncer – sua principal arma para encarar a doença que abrevia seus dias.",
        imageUrl: "/culpa.jpg",
        isAvailable: true,
      },
      {
        title: "O Pequeno Príncipe",
        author: "Antoine de Saint-Exupéry",
        description: "Nesta história que marcou gerações de leitores em todo o mundo, um piloto cai com seu avião no deserto do Saara e encontra um pequeno príncipe, que o leva a uma aventura filosófica e poética através de planetas que encerram a solidão humana.",
        imageUrl: "/pequeno.jpg",
        isAvailable: true,
      },
      {
        title: "A Garota do Lago",
        author: "Charlie Donlea",
        description: "Summit Lake, uma pequena cidade entre montanhas, é esse tipo de lugar, bucólico e com encantadoras casas dispostas à beira de um longo trecho de água intocada.Duas semanas atrás, a estudante de direito Becca Eckersley foi brutalmente assassinada em uma dessas",
        imageUrl: "/garota.jpg",
        isAvailable: true,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
