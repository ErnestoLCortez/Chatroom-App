import Sequelize from 'sequelize';
import {
  databaseUrl,
  databaseName,
  databasePass,
  databasePort,
  databaseUser
}
from '../config';

export const sequelize = new Sequelize(databaseName, databaseUser, databasePass, {
  host: databaseUrl,
  port: databasePort,
  dialect: 'postgres',
  pool: {
    max: 20,
    min: 0,
    idle: 10000,
  },
});
