const feeds = [
  // Antara
  { name: "Antara Terbaru", url: "https://api-berita-indonesia.vercel.app/antara/terbaru/", category: "general" },
  { name: "Antara Politik", url: "https://api-berita-indonesia.vercel.app/antara/politik/", category: "politics" },
  { name: "Antara Hukum", url: "https://api-berita-indonesia.vercel.app/antara/hukum/", category: "law" },
  { name: "Antara Ekonomi", url: "https://api-berita-indonesia.vercel.app/antara/ekonomi/", category: "economy" },
  { name: "Antara Bola", url: "https://api-berita-indonesia.vercel.app/antara/bola/", category: "sports" },
  { name: "Antara Olahraga", url: "https://api-berita-indonesia.vercel.app/antara/olahraga/", category: "sports" },
  { name: "Antara Humaniora", url: "https://api-berita-indonesia.vercel.app/antara/humaniora/", category: "humanities" },
  { name: "Antara Lifestyle", url: "https://api-berita-indonesia.vercel.app/antara/lifestyle/", category: "lifestyle" },
  { name: "Antara Hiburan", url: "https://api-berita-indonesia.vercel.app/antara/hiburan/", category: "entertainment" },
  { name: "Antara Dunia", url: "https://api-berita-indonesia.vercel.app/antara/dunia/", category: "world" },
  { name: "Antara Tekno", url: "https://api-berita-indonesia.vercel.app/antara/tekno/", category: "technology" },
  { name: "Antara Otomotif", url: "https://api-berita-indonesia.vercel.app/antara/otomotif/", category: "automotive" },

  // CNBC
  { name: "CNBC Terbaru", url: "https://api-berita-indonesia.vercel.app/cnbc/terbaru/", category: "general" },
  { name: "CNBC Investment", url: "https://api-berita-indonesia.vercel.app/cnbc/investment/", category: "business" },
  { name: "CNBC News", url: "https://api-berita-indonesia.vercel.app/cnbc/news/", category: "news" },
  { name: "CNBC Market", url: "https://api-berita-indonesia.vercel.app/cnbc/market/", category: "business" },
  { name: "CNBC Entrepreneur", url: "https://api-berita-indonesia.vercel.app/cnbc/entrepreneur/", category: "business" },
  { name: "CNBC Syariah", url: "https://api-berita-indonesia.vercel.app/cnbc/syariah/", category: "islamic" },
  { name: "CNBC Tech", url: "https://api-berita-indonesia.vercel.app/cnbc/tech/", category: "technology" },
  { name: "CNBC Lifestyle", url: "https://api-berita-indonesia.vercel.app/cnbc/lifestyle/", category: "lifestyle" },
  { name: "CNBC Opini", url: "https://api-berita-indonesia.vercel.app/cnbc/opini/", category: "opinion" },
  { name: "CNBC Profil", url: "https://api-berita-indonesia.vercel.app/cnbc/profil/", category: "profile" },

  // CNN
  { name: "CNN Terbaru", url: "https://api-berita-indonesia.vercel.app/cnn/terbaru/", category: "general" },
  { name: "CNN Nasional", url: "https://api-berita-indonesia.vercel.app/cnn/nasional/", category: "national" },
  { name: "CNN Internasional", url: "https://api-berita-indonesia.vercel.app/cnn/internasional/", category: "international" },
  { name: "CNN Ekonomi", url: "https://api-berita-indonesia.vercel.app/cnn/ekonomi/", category: "economy" },
  { name: "CNN Olahraga", url: "https://api-berita-indonesia.vercel.app/cnn/olahraga/", category: "sports" },
  { name: "CNN Teknologi", url: "https://api-berita-indonesia.vercel.app/cnn/teknologi/", category: "technology" },
  { name: "CNN Hiburan", url: "https://api-berita-indonesia.vercel.app/cnn/hiburan/", category: "entertainment" },
  { name: "CNN Gaya Hidup", url: "https://api-berita-indonesia.vercel.app/cnn/gayaHidup/", category: "lifestyle" },

  // JPNN
  { name: "JPNN Terbaru", url: "https://api-berita-indonesia.vercel.app/jpnn/terbaru/", category: "general" },

  // Kumparan
  { name: "Kumparan Terbaru", url: "https://api-berita-indonesia.vercel.app/kumparan/terbaru/", category: "general" },

  // Merdeka
  { name: "Merdeka Terbaru", url: "https://api-berita-indonesia.vercel.app/merdeka/terbaru/", category: "general" },
  { name: "Merdeka Jakarta", url: "https://api-berita-indonesia.vercel.app/merdeka/jakarta/", category: "local" },
  { name: "Merdeka Dunia", url: "https://api-berita-indonesia.vercel.app/merdeka/dunia/", category: "world" },
  { name: "Merdeka Gaya", url: "https://api-berita-indonesia.vercel.app/merdeka/gaya/", category: "lifestyle" },
  { name: "Merdeka Olahraga", url: "https://api-berita-indonesia.vercel.app/merdeka/olahraga/", category: "sports" },
  { name: "Merdeka Teknologi", url: "https://api-berita-indonesia.vercel.app/merdeka/teknologi/", category: "technology" },
  { name: "Merdeka Otomotif", url: "https://api-berita-indonesia.vercel.app/merdeka/otomotif/", category: "automotive" },
  { name: "Merdeka Khas", url: "https://api-berita-indonesia.vercel.app/merdeka/khas/", category: "special" },
  { name: "Merdeka Sehat", url: "https://api-berita-indonesia.vercel.app/merdeka/sehat/", category: "health" },
  { name: "Merdeka Jateng", url: "https://api-berita-indonesia.vercel.app/merdeka/jateng/", category: "local" },

  // Okezone
  { name: "Okezone Terbaru", url: "https://api-berita-indonesia.vercel.app/okezone/terbaru/", category: "general" },
  { name: "Okezone Celebrity", url: "https://api-berita-indonesia.vercel.app/okezone/celebrity/", category: "entertainment" },
  { name: "Okezone Sports", url: "https://api-berita-indonesia.vercel.app/okezone/sports/", category: "sports" },
  { name: "Okezone Otomotif", url: "https://api-berita-indonesia.vercel.app/okezone/otomotif/", category: "automotive" },
  { name: "Okezone Economy", url: "https://api-berita-indonesia.vercel.app/okezone/economy/", category: "economy" },
  { name: "Okezone Techno", url: "https://api-berita-indonesia.vercel.app/okezone/techno/", category: "technology" },
  { name: "Okezone Lifestyle", url: "https://api-berita-indonesia.vercel.app/okezone/lifestyle/", category: "lifestyle" },
  { name: "Okezone Bola", url: "https://api-berita-indonesia.vercel.app/okezone/bola/", category: "sports" },

  // Republika
  { name: "Republika Terbaru", url: "https://api-berita-indonesia.vercel.app/republika/terbaru/", category: "general" },
  { name: "Republika News", url: "https://api-berita-indonesia.vercel.app/republika/news/", category: "news" },
  { name: "Republika Daerah", url: "https://api-berita-indonesia.vercel.app/republika/daerah/", category: "local" },
  { name: "Republika Khazanah", url: "https://api-berita-indonesia.vercel.app/republika/khazanah/", category: "islamic" },
  { name: "Republika Islam", url: "https://api-berita-indonesia.vercel.app/republika/islam/", category: "islamic" },
  { name: "Republika Internasional", url: "https://api-berita-indonesia.vercel.app/republika/internasional/", category: "international" },
  { name: "Republika Bola", url: "https://api-berita-indonesia.vercel.app/republika/bola/", category: "sports" },
  { name: "Republika Leisure", url: "https://api-berita-indonesia.vercel.app/republika/leisure/", category: "lifestyle" },

  // Sindonews
  { name: "Sindonews Terbaru", url: "https://api-berita-indonesia.vercel.app/sindonews/terbaru/", category: "general" },
  { name: "Sindonews Nasional", url: "https://api-berita-indonesia.vercel.app/sindonews/nasional/", category: "national" },
  { name: "Sindonews Metro", url: "https://api-berita-indonesia.vercel.app/sindonews/metro/", category: "local" },
  { name: "Sindonews Ekbis", url: "https://api-berita-indonesia.vercel.app/sindonews/ekbis/", category: "economy" },
  { name: "Sindonews International", url: "https://api-berita-indonesia.vercel.app/sindonews/international/", category: "international" },
  { name: "Sindonews Daerah", url: "https://api-berita-indonesia.vercel.app/sindonews/daerah/", category: "local" },
  { name: "Sindonews Sports", url: "https://api-berita-indonesia.vercel.app/sindonews/sports/", category: "sports" },
  { name: "Sindonews Otomotif", url: "https://api-berita-indonesia.vercel.app/sindonews/otomotif/", category: "automotive" },
  { name: "Sindonews Tekno", url: "https://api-berita-indonesia.vercel.app/sindonews/tekno/", category: "technology" },
  { name: "Sindonews Sains", url: "https://api-berita-indonesia.vercel.app/sindonews/sains/", category: "science" },
  { name: "Sindonews Edukasi", url: "https://api-berita-indonesia.vercel.app/sindonews/edukasi/", category: "education" },
  { name: "Sindonews Lifestyle", url: "https://api-berita-indonesia.vercel.app/sindonews/lifestyle/", category: "lifestyle" },
  { name: "Sindonews Kalam", url: "https://api-berita-indonesia.vercel.app/sindonews/kalam/", category: "islamic" },

  // Suara
  { name: "Suara Terbaru", url: "https://api-berita-indonesia.vercel.app/suara/terbaru/", category: "general" },
  { name: "Suara Bisnis", url: "https://api-berita-indonesia.vercel.app/suara/bisnis/", category: "business" },
  { name: "Suara Bola", url: "https://api-berita-indonesia.vercel.app/suara/bola/", category: "sports" },
  { name: "Suara Lifestyle", url: "https://api-berita-indonesia.vercel.app/suara/lifestyle/", category: "lifestyle" },
  { name: "Suara Entertainment", url: "https://api-berita-indonesia.vercel.app/suara/entertainment/", category: "entertainment" },
  { name: "Suara Otomotif", url: "https://api-berita-indonesia.vercel.app/suara/otomotif/", category: "automotive" },
  { name: "Suara Tekno", url: "https://api-berita-indonesia.vercel.app/suara/tekno/", category: "technology" },
  { name: "Suara Health", url: "https://api-berita-indonesia.vercel.app/suara/health/", category: "health" },

  // Tempo
  { name: "Tempo Nasional", url: "https://api-berita-indonesia.vercel.app/tempo/nasional/", category: "national" },
  { name: "Tempo Bisnis", url: "https://api-berita-indonesia.vercel.app/tempo/bisnis/", category: "business" },
  { name: "Tempo Metro", url: "https://api-berita-indonesia.vercel.app/tempo/metro/", category: "local" },
  { name: "Tempo Dunia", url: "https://api-berita-indonesia.vercel.app/tempo/dunia/", category: "world" },
  { name: "Tempo Bola", url: "https://api-berita-indonesia.vercel.app/tempo/bola/", category: "sports" },
  { name: "Tempo Cantik", url: "https://api-berita-indonesia.vercel.app/tempo/cantik/", category: "lifestyle" },
  { name: "Tempo Tekno", url: "https://api-berita-indonesia.vercel.app/tempo/tekno/", category: "technology" },
  { name: "Tempo Otomotif", url: "https://api-berita-indonesia.vercel.app/tempo/otomotif/", category: "automotive" },
  { name: "Tempo Seleb", url: "https://api-berita-indonesia.vercel.app/tempo/seleb/", category: "entertainment" },
  { name: "Tempo Gaya", url: "https://api-berita-indonesia.vercel.app/tempo/gaya/", category: "lifestyle" },
  { name: "Tempo Travel", url: "https://api-berita-indonesia.vercel.app/tempo/travel/", category: "travel" },
  { name: "Tempo Difabel", url: "https://api-berita-indonesia.vercel.app/tempo/difabel/", category: "social" },
  { name: "Tempo Creativelab", url: "https://api-berita-indonesia.vercel.app/tempo/creativelab/", category: "creative" },
  { name: "Tempo Inforial", url: "https://api-berita-indonesia.vercel.app/tempo/inforial/", category: "advertorial" },
  { name: "Tempo Event", url: "https://api-berita-indonesia.vercel.app/tempo/event/", category: "events" },

  // Tribun
  { name: "Tribun Terbaru", url: "https://api-berita-indonesia.vercel.app/tribun/terbaru/", category: "general" },
  { name: "Tribun Bisnis", url: "https://api-berita-indonesia.vercel.app/tribun/bisnis/", category: "business" },
  { name: "Tribun Superskor", url: "https://api-berita-indonesia.vercel.app/tribun/superskor/", category: "sports" },
  { name: "Tribun Sport", url: "https://api-berita-indonesia.vercel.app/tribun/sport/", category: "sports" },
  { name: "Tribun Seleb", url: "https://api-berita-indonesia.vercel.app/tribun/seleb/", category: "entertainment" },
  { name: "Tribun Lifestyle", url: "https://api-berita-indonesia.vercel.app/tribun/lifestyle/", category: "lifestyle" },
  { name: "Tribun Travel", url: "https://api-berita-indonesia.vercel.app/tribun/travel/", category: "travel" },
  { name: "Tribun Parapuan", url: "https://api-berita-indonesia.vercel.app/tribun/parapuan/", category: "women" },
  { name: "Tribun Otomotif", url: "https://api-berita-indonesia.vercel.app/tribun/otomotif/", category: "automotive" },
  { name: "Tribun Techno", url: "https://api-berita-indonesia.vercel.app/tribun/techno/", category: "technology" },
  { name: "Tribun Kesehatan", url: "https://api-berita-indonesia.vercel.app/tribun/kesehatan/", category: "health" }
];

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function addFeeds() {
  for (const feed of feeds) {
    try {
      const result = await prisma.rssFeed.create({
        data: feed
      });
      console.log(`Added feed: ${result.name}`);
    } catch (error) {
      if (error && error.code === 'P2002') {
        console.log(`Feed already exists: ${feed.name}`);
      } else {
        console.error(`Error adding feed ${feed.name}:`, error);
      }
    }
  }
  await prisma.$disconnect();
}

addFeeds().catch(error => {
  console.error('Failed to add feeds:', error);
  process.exit(1);
});
