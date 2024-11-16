
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

// Define task model to make operation on SQLite using sequelize
// async function setupDB() {
//     try {
//         db.Task = sequelize.define('Task', {
//             text: {
//                 type: DataTypes.STRING,
//                 allowNull: false
//             },
//         });
//         // Database initialization
//         await sequelize.sync({ force: true });
//         await db.Task.create({ text: "Item-1-MertKadirGursoy"});
//         await db.Task.create({ text: "Item-2"});
//         await db.Task.create({ text: "Item-3"});
//     } catch (error) {
//         console.error(error);
//     }
// }