'use strict';

export async function up(Sequelize) {
  await Sequelize.bulkInsert('Actors', [
    {
      id: 'act_mx_001',
      name: 'Gael García Bernal',
      nationality: 'Mexicano',
      birthYear: 1978,
      birthPlace: 'Guadalajara, Jalisco',
      notableAwards: JSON.stringify(['Premio del Festival de Cannes', '2 Premios BAFTA']),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'act_mx_002',
      name: 'Diego Luna',
      nationality: 'Mexicano',
      birthYear: 1979,
      birthPlace: 'Toluca, Estado de México',
      notableAwards: JSON.stringify(['Premio Marcello Mastroianni', 'Diosa de Plata']),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(Sequelize) {
  await Sequelize.bulkDelete('Actors', null, {});
}
