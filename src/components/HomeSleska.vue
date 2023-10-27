<script setup></script>

<template>
    <div class="container center">
        <h1>Welcome to Слежка!</h1>
        <p>
            Меня зовут Большой брат, помоги мне добавить тебя и твое окружение в
            базу для слежки
        </p>

        <div>
            <h2>Инструкция</h2>
            <ol>
                <li>
                    Нажмите кнопку "Подключиться к секретной базе". Если базы не
                    существует, то появится кнопка "Создать". Нажмите ее и база
                    будет создана.
                </li>
                <li>Перейдите во вкладку "Создать пользователя".</li>
            </ol>
        </div>
    </div>
</template>

<style scoped>
.center {
    align-items: center;
}
ol {
    list-style-type: none;
    counter-reset: num;
    position: relative;
    margin: 0 0 0 60px;
    padding: 15px 0 5px 0;
    font-size: 16px;
    width: 400px;
}
ol li {
    position: relative;
    margin: 0 0 0 0;
    padding: 0 0 10px 0;
    line-height: 1.4;
}
ol li:after {
    content: counter(num);
    counter-increment: num;
    display: inline-block;
    position: absolute;
    top: 0;
    left: -45px;
    width: 28px;
    height: 28px;
    line-height: 28px;
    background: #000000;
    color: #ffffff;
    text-align: center;
    font-size: 18px;
    border-radius: 50%;
    border: 1px solid #aeaeae;
}

/* Вертикальная линия */
ol:before {
    content: "";
    position: absolute;
    top: 15px;
    bottom: 15px;
    left: -30px;
    width: 1px;
    border-left: 1px solid #606060;
}
/* Скрытие линии у последнего li */
ol li:last-child:before {
    content: "";
    display: inline-block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: -38px;
    width: 28px;
    background: #000000;
}
</style>
