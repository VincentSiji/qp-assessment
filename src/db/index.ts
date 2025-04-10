import { DataSource } from "typeorm";
import { DB_HOST, DB_PASSWORD, DB_PORT, DB_USERNAME } from "../config/envConfig";


export const AppDataSource:any = new DataSource({
    type: "mysql",
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USERNAME,
    password:DB_PASSWORD,
    database: "grocery_data",
    entities: ["dist/models/*.js"],
    synchronize: true,
});
