import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@store/index'
import i18n from '@corets/lang'
import mock from '@mock/index'
import plugin from '@corets/plugin'
import AsyncComputed from 'vue-async-computed'
import VueCodemirror from 'vue-codemirror'
import directives from '@custom/directives'
import * as ElementUI from 'element-ui'

import comConfig from '@custom/config'
import utils from '@corets/utils'

// config
Vue.config.productionTip = false

// reset `$t` directive when isI18n switch is on
if (!comConfig.buildSwitch.isI18n) {
    Vue.prototype.$t = (str: string) => {
        return utils.getLocaleIfI18nOff(str)
    }
}

// custom directives
Object.keys(directives).forEach((item) => {
    // @ts-ignore
    Vue.directive(item, directives[item])
})

// mockjs
if (comConfig.buildSwitch.isMock) {
    Vue.use(mock as any)
}

// init element-ui
Vue.use(ElementUI, {
    i18n: (key: any, value: any) => i18n.t(key, value),
    size: 'small'
})

// async computed
Vue.use(AsyncComputed)
// custom plugin
Vue.use(plugin)

// codemirror
Vue.use(VueCodemirror)

new Vue({
    render: (h) => h(App),
    store,
    router,
    i18n
}).$mount('#app')
