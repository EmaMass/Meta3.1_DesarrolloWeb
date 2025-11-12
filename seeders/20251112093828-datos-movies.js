'use strict';

export async function up(queryInterface) {
  await queryInterface.bulkInsert('Movies', [
    {
      id: 'mx_001',
      title: 'Y tu mamá también',
      releaseYear: 2001,
      genre: JSON.stringify(['Drama', 'Road Movie', 'Coming of Age']),
      duration: 105,
      rating: 7.7,
      language: 'Español',
      country: 'México',
      directorId: 'dir_mx_001',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'mx_002',
      title: 'Segunda Pelicula',
      releaseYear: 2003,
      genre: JSON.stringify(['Adventure', 'Action']),
      duration: 120,
      rating: 7.7,
      language: 'Español',
      country: 'México',
      directorId: 'dir_mx_001',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('Movies', null, {});
}
