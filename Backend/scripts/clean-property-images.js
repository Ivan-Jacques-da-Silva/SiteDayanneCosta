
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function cleanPropertyImages() {
  try {
    console.log('🧹 Limpando imagens incorretas das propriedades...');
    
    // Buscar todas as propriedades com imagens
    const properties = await prisma.property.findMany({
      include: {
        images: true
      }
    });

    for (const property of properties) {
      for (const image of property.images) {
        // Verificar se o arquivo da imagem realmente existe
        const imagePath = path.join(__dirname, '..', image.url);
        
        if (!fs.existsSync(imagePath)) {
          console.log(`❌ Removendo imagem inexistente: ${image.url} da propriedade ${property.title}`);
          
          // Remover a referência da imagem do banco
          await prisma.propertyImage.delete({
            where: { id: image.id }
          });
        }
      }
    }

    console.log('✅ Limpeza concluída!');
  } catch (error) {
    console.error('❌ Erro na limpeza:', error);
  } finally {
    await prisma.$disconnect();
  }
}

cleanPropertyImages();
