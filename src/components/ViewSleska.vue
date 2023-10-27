<script setup>
import { ref } from "vue";
import connectToDB from "../db.js";
import { onClickOutside } from "@vueuse/core";

const greetMsg = ref("");
const currect_id = ref(-1);
const new_firstname = ref("");
const new_lastname = ref("");
const items = ref([]);
const isModalOpened = ref(false);

const handleScroll = (evt, el) => {
    if (window.scrollY > 50) {
        el.setAttribute(
            "style",
            "opacity: 1; transform: translate3d(0, -10px, 0)"
        );
    }
    return window.scrollY > 100;
};

const openModal = (id) => {
    currect_id.value = id;
    let item = items.value.find((item) => item.id === currect_id.value);
    console.log(item);
    new_firstname.value = item.firstname;
    new_lastname.value = item.lastname;
    isModalOpened.value = true;
};
const closeModal = () => {
    isModalOpened.value = false;
};

const submitHandler = async () => {
    updateDB();

    isModalOpened.value = false;

    await reloadData();
};
async function reloadData() {
    let db = await connectToDB();

    items.value = await db.select("SELECT * FROM  sleska");
}

async function deleteEleent(id) {
    let db = await connectToDB();
    await db.execute(`DELETE FROM  sleska WHERE id = ${id};`);
    await reloadData();
}

async function updateDB() {
    let db = await connectToDB();
    let sac = await db.execute(`
    UPDATE  sleska SET firstname = '${new_firstname.value}',lastname = '${new_lastname.value}'  WHERE id = ${currect_id.value};`);

    if (sac.rowsAffected == 1) {
        new_firstname.value = "";
        new_lastname.value = "";
    }
    await reloadData();
}
const target = ref(null);
onClickOutside(target, () => closeModal());
reloadData();
</script>

<template>
    <div class="container center__view" v-scroll="handleScroll">
        <button @click="reloadData()">Обновить</button>

        <table class="table-auto w-full">
            <thead>
                <tr>
                    <th class="px-4 py-2">Имя</th>
                    <th class="px-4 py-2">Фамилия</th>
                    <th class="px-4 py-2">Действие</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in items" :key="item.id">
                    <td class="border px-4 py-2">{{ item.firstname }}</td>
                    <td class="border px-4 py-2">{{ item.lastname }}</td>
                    <td class="border px-4 py-2 table__btn">
                        <button
                            class="delete__btn"
                            @click="deleteEleent(item.id)"
                        >
                            Удалить
                        </button>
                        <button class="delete__btn" @click="openModal(item.id)">
                            Обновить
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div v-if="isModalOpened" class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container" ref="target">
                    <div class="modal-header">
                        <h1>Введите новый данные</h1>
                    </div>
                    <div class="modal-body">
                        <div class="modal-view">
                            <input
                                id="greet-input"
                                v-model="new_firstname"
                                placeholder="Enter a Имя..."
                            />
                            <input
                                id="greet-input"
                                v-model="new_lastname"
                                placeholder="Enter a Фамилия..."
                            />
                            <button @click.stop="submitHandler">Submit</button>
                        </div>
                    </div>
                    <div class="modal-footer"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.table__btn {
    display: flex;
    justify-content: center;
    flex-direction: row;
    gap: 0 9px;
}
.center__view {
    margin: 0 20px;
}

.delete__btn {
    color: rgba(192, 0, 0, 0.895);
}

table {
    table-layout: fixed;

    border-top: 1px solid #6a6a6a;
    padding: 0;
    margin-top: 20px;
    border-spacing: 0;
}

td {
    vertical-align: top;
    padding: 0;
    margin: 0;
}
table td:nth-of-type(1) {
    width: 300px;
}
table td:nth-of-type(2) {
    width: 300px;
}

.modal-view {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 10px 20px;
}

.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-container {
    width: 300px;
    margin: 150px auto;
    padding: 20px 30px;
    background-color: #000000;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}
</style>
