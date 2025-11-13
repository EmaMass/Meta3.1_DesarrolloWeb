'use strict';

export async function up(Sequelize) {
  await Sequelize.bulkInsert('MovieActors', [
    {
      movieId: 'mx_001',
      actorId: 'act_mx_001',
      characterName: 'Julio Zapata',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      movieId: 'mx_001',
      actorId: 'act_mx_002',
      characterName: 'Tenoch Iturbide',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      movieId: 'mx_001',
      actorId: 'act_mx_001',
      characterName: 'Colonel Grande',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(Sequelize) {
  await Sequelize.bulkDelete('MovieActors', null, {});
}
