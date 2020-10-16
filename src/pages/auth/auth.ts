import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@store/index'
import i18n from '@corets/lang'
import mock from '@mock/index'
import * as ElementUI from 'element-ui'

import comConfig from '@custom/config';
import utils from '@corets/utils';

// config
Vue.config.productionTip = false

// reset `$t` directive when isI18n switch is on
if (!comConfig.buildSwitch.isI18n) {
    Vue.prototype.$t = (str: string) => {
        return utils.getLocaleIfI18nOff(str)
    }
}

// mockjs
if (comConfig.buildSwitch.isMock) {
    Vue.use(mock as any)
}

// init element-ui
Vue.use(ElementUI, {
    i18n: (key: any, value: any) => i18n.t(key, value)
})

new Vue({
    render: (h) => h(App),
    store,
    router,
    i18n
}).$mount('#app')
