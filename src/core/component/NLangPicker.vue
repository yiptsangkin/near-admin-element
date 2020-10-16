<template>
    <div class="n-global-locale" v-if="comConfig.buildSwitch.isI18n">
        <el-dropdown>
            <i class="n-locale-icon icon-earth iconfont"></i>
            <el-dropdown-menu slot="dropdown" class="n-lang-menu">
                <el-dropdown-item v-for="(item, index) in ableLocaleList" :key="item.locale" @click.native="pickLocale({key: item.locale})">
                    <a target="_blank" rel="noopener noreferrer">
                        <template v-if="deviceInfo !== 'Windows'">
                            <span class="n-lang-flag">{{ item.flag }}</span>
                        </template>
                        <template v-else>
                            <span class="n-lang-tag">{{ item.locale.toUpperCase() }}</span>
                        </template>
                        {{ ableLocaleMap[item.locale].localeMap[item.locale] }}
                    </a>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import {mapGetters, mapActions} from 'vuex'
    import CountryFlag from '@corets/countryflag'
    import utils from '@corets/utils'
    import comConfig from '@custom/config'

    interface PickerEvent {
        key: string
    }

    export default Vue.extend({
        name: 'NLangPicker',
        data () {
            return {
                currentSelectedKeys: [],
                deviceInfo: utils.getDeviceInfo('machine'),
                comConfig
            }
        },
        computed: {
            ...mapGetters([
               'locale'
            ]),
            ableLocaleList () {
                const self = this as any as any
                const newAbleList: object[] = []
                const localeObj = self.$i18n.messages
                Object.keys(localeObj).forEach((key) => {
                    newAbleList.push({
                        flag: `${new CountryFlag().getFlagByChar(localeObj[key].country)}`,
                        locale: key
                    })
                })
                return newAbleList
            },
            ableLocaleMap () {
                const self = this as any as any
                return self.$i18n.messages
            }
        },
        methods: {
            ...mapActions([
                'changeLocale'
            ]),
            pickLocale (e: PickerEvent) {
                const self = this as any as any
                self.$i18n.locale = e.key
                self.currentSelectedKeys = [e.key]
                // cache in localStorge
                localStorage.setItem('nearAdminLang', e.key)
                // update vuex state
                self.changeLocale(e.key)
            }
        },
        created () {
            const self = this as any as any
            self.currentSelectedKeys = [self.locale]
        }
    })
</script>

<style lang="scss" scoped>
    @import '~@corescss/auth/langpicker.scss'
</style>
