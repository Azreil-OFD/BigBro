<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { ref } from "vue";
import CreateSleska from "./components/CreateSleska.vue";
import ViewSleska from "./components/ViewSleska.vue";
import HomeSleska from "./components/HomeSleska.vue";
import connectToDB from "./db.js";
import { message } from "@tauri-apps/api/dialog";

const mode = ref("home");
const disable = ref(true);
const connector = ref(true);
const create = ref(false);

const connect = async () => {
    const db = await connectToDB();
    const data = await db.select(
        "SELECT * FROM sqlite_master WHERE type='table' AND name='sleska';"
    );
    if (data.length === 0) {
        connector.value = false;
        create.value = true;
        await message("Необходимо создать базу данных", "Брат:", {
            title: "Tauri",
            type: "warning",
        });
    } else {
        connector.value = false;
        disable.value = false;
        await message("Система подключена к базе данных", "Брат:", {
            title: "Tauri",
            type: "warning",
        });
    }
};
const creator = async () => {
    const db = await connectToDB();
    const data = await db.execute(
        `
        CREATE TABLE IF NOT EXISTS sleska 
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            firstname TEXT,
            lastname TEXT
        );
        `
    );
    await message("База данных создана", "Брат:", {
        title: "Tauri",
        type: "warning",
    });
    create.value = false;
};
</script>

<template>
    <div class="tab" v-if="!disable">
        <button
            v-bind:class="{ active: mode == 'home' }"
            @click="mode = 'home'"
        >
            Главная
        </button>
        <button
            v-bind:class="{ active: mode == 'create' }"
            @click="mode = 'create'"
        >
            Добавить пользователя
        </button>
        <button
            v-bind:class="{ active: mode == 'view' }"
            @click="mode = 'view'"
        >
            Просмотреть список
        </button>
    </div>
    <div class="container">
        <HomeSleska v-if="mode == 'home'" />
        <CreateSleska v-if="mode == 'create'" />
        <ViewSleska v-if="mode == 'view'" />
        <button v-if="connector" @click="connect">Подключиться к базе</button>
        <button v-if="create" @click="creator">Создать базу данных</button>
    </div>
</template>

<style scoped>
.active {
    border-bottom: #303030 solid 3px;
}
.tab {
    display: flex;
    gap: 10px 20px;
    justify-content: center;
    flex-direction: row;
}
.tab button {
    flex-grow: 4;
}
.logo.vite:hover {
    filter: drop-shadow(0 0 2em #747bff);
}

.logo.vue:hover {
    filter: drop-shadow(0 0 2em #249b73);
}
</style>
