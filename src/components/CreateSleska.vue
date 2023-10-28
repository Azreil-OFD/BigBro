<script setup>
import { ref } from "vue";
import { message } from "@tauri-apps/api/dialog";

import connectToDB from "../db.js";
const greetMsg = ref("");
const firstname = ref("");
const lastname = ref("");

async function save() {
    let db = await connectToDB();
    let sac = await db.execute(`
      INSERT INTO sleska (firstname, lastname , create_at)
      VALUES ('${firstname.value}', '${
        lastname.value
    }' ,  '${Date.now().toString()}');`);

    if (sac.rowsAffected == 1) {
        firstname.value = "";
        lastname.value = "";
        const yes = await message(
            "*Низкий поклон* Пользователь создан ",
            "Брат:",
            {
                title: "Tauri",
                type: "warning",
            }
        );
    }
}
</script>

<template>
    <div class="container">
        <p>Не беспокойся все данные конфиденциальны. :) Доверься мне</p>
        <form class="row" @submit.prevent="save">
            <input
                id="greet-input"
                v-model="firstname"
                placeholder="Enter a Имя..."
            />
            <input
                id="greet-input"
                v-model="lastname"
                placeholder="Enter a Фамилия..."
            />
            <button type="submit">Добавить</button>
        </form>

        <p>
            Запись которую я внесу в базу: слежка за - {{ firstname }}
            {{ lastname }} - 24/7
        </p>
        <p>{{ greetMsg }}</p>
    </div>
</template>

<style></style>
