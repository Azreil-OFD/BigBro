import { createApp } from "vue";
import "./styles.css";
import App from "./App.vue";

function disableMenu() {
    document.addEventListener(
        "contextmenu",
        (e) => {
            e.preventDefault();
            return false;
        },
        { capture: true }
    );

    document.addEventListener(
        "selectstart",
        (e) => {
            e.preventDefault();
            return false;
        },
        { capture: true }
    );
}

// disableMenu();

createApp(App)
    .directive("scroll", {
        inserted: function (el, binding) {
            let f = function (evt) {
                if (binding.value(evt, el)) {
                    window.removeEventListener("scroll", f);
                }
            };
            window.addEventListener("scroll", f);
        },
    })
    .mount("#app");
