 import { DataSource } from "typeorm";
import path from "path";


export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "cruduser",
  password: "crudpassword",
  database: "crud",
  synchronize: true,
  logging: true,
  entities: [path.join(process.cwd(), "src/entities/*.ts")],
  migrations: ["src/migrations/**/*.ts"],
  subscribers: []
});

export const checkConnection = async () => {
  try {
    await AppDataSource.initialize();
    console.log("db connected successfully");
  } catch (error) {
    
    console.log("cannot connect to db",error);
  }
};

