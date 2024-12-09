export const sequelize1 = new Sequelize({
    dialect: 'sqlite',
    storage: './db/test1.sqlite',
    logging: false,
  })

  
const migrate = async () => {
    const sourceData = await ProductSqliteModel1.findAll();
    // console.log(sourceData, 'damn');
    for (const data of sourceData) {
        try {
            const rawData = data.toJSON(); // Extract raw data
            console.log(rawData);
            await ProductSqliteModel.create(rawData);
        }
        catch (error) { console.log(error); }
    }
}
await migrate();