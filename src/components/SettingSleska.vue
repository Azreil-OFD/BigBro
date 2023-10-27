<script setup>
import { ref } from "vue";
import connectToDB from "../db.js";
import { writeFile } from "@tauri-apps/api/fs";
async function deleteDB() {
    let db = await connectToDB();
    await db.execute(`DROP TABLE sleska ;`);
    location.reload();
}
</script>

<template>
    <div class="container">
        <h1>Параметры базы данных</h1>
        <button @click="deleteDB">Удалить базу данных</button>
    </div>
</template>
