import Database from "tauri-plugin-sql-api";

export default async function connectToDB() {
    const db = await Database.load("sqlite:test.db");
    return db;
}
