import Vue from "vue";
import VueI18n from "vue-i18n";
import messages from "./../assets/nls/languageSupport.json";
Vue.use(VueI18n);
export const i18n = new VueI18n({
    locale: "fr",
    fallbackLocale: "en",
    messages: messages
});
