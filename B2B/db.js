const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('defaultdb', 'avnadmin', 'AVNS_lFbhfivSXv6mGKL_n8t', {
  host: 'pg-f0042f4-vijaykadamati-86b3.b.aivencloud.com',
  port: 27380,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,   
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the PostgreSQL database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;
