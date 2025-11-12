'use strict';

export async function up(queryInterface) {
  await queryInterface.bulkInsert('Directors', [
    {
      id: 'dir_mx_001',
      name: 'Alfonso Cuarón',
      nationality: 'Mexicano',
      birthYear: 1961,
      birthPlace: 'Ciudad de México',
      notableAwards: JSON.stringify(['2 Óscares', '3 Premios BAFTA', 'Globo de Oro']),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'dir_mx_002',
      name: 'Director 2',
      nationality: 'Japones',
      birthYear: 2001,
      birthPlace: 'Sao Paulo',
      notableAwards: JSON.stringify(['1 Oscar']),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('Directors', null, {});
}
