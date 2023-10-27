import Database from "tauri-plugin-sql-api";

export default async function connectToDB() {
    const db = await Database.load("postgres://marin:FNaF1122@localhost/marin");
    return db;
}
