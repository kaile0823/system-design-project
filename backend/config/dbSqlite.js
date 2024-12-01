
// Set up Sequelize to use SQLite
import { Sequelize }  from 'sequelize';

export const sequelize = new Sequelize ({
    dialect: 'sqlite',
    storage: './db/test1.sqlite',
    logging: false,
})

export const connectSqlite = async () => {
    try {
      await sequelize.authenticate();
      console.log('SQLite connected');
    } catch (error) {
      console.error('SQLite connection error:', error);
      process.exit(1);
    }
  };
