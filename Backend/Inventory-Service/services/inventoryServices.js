const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createInventory = async (inventoryData) => {
  return await prisma.inventory.create({
    data: inventoryData,
  });
};
