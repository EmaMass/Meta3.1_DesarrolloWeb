'use strict';

export async function up(queryInterface) {
  await queryInterface.bulkInsert('MovieActors', [
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

export async function down(queryInterface) {
  await queryInterface.bulkDelete('MovieActors', null, {});
}
