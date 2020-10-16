<template>
    <div class="setting-wrp">
        <n-common-title :title="dict.localeObj.setting.systemSwitch" no-top></n-common-title>
        <div class="setting-form">
            <el-form class="n-form" ref="n-form" :colon="false" layout="inline" :model="comConfig.buildSwitch">
                <el-row>
                    <el-col :xs="24" :sm="12" :md="6" :lg="4">
                        <el-form-item class="no-btm" :label="$t(dict.localeObj.setting.isMock)" prop="dateRange">
                            <el-switch v-model="comConfig.buildSwitch.isMock"></el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="6" :lg="4">
                        <el-form-item class="no-btm" :label="$t(dict.localeObj.setting.isCache)" prop="dateRange">
                            <el-switch v-model="comConfig.buildSwitch.isCache"></el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="6" :lg="4">
                        <el-form-item class="no-btm" :label="$t(dict.localeObj.setting.isBreadCrumb)" prop="dateRange">
                            <el-switch v-model="comConfig.buildSwitch.isBreadCrumb"></el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="6" :lg="4">
                        <el-form-item class="no-btm" :label="$t(dict.localeObj.setting.isHotKey)" prop="dateRange">
                            <el-switch v-model="comConfig.buildSwitch.isHotKey"></el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="6" :lg="4">
                        <el-form-item class="no-btm" :label="$t(dict.localeObj.setting.isI18n)" prop="dateRange">
                            <el-switch v-model="comConfig.buildSwitch.isI18n"></el-switch>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <n-common-title :title="dict.localeObj.setting.customEntry" no-top></n-common-title>
        <div class="n-transfer">
            <el-transfer
                    :data="sourceData"
                    filterable
                    :titles="titles"
                    v-model="targetData"
                    :props="dataProps"
                    :render-content="renderFunc"
                    @change="handlerChange"
            >
            </el-transfer>
        </div>
    </div>
</template>

<script lang="tsx">
    import Vue from 'vue'
    import CoreBase from '@corets/base'
    import {mapGetters, mapActions} from 'vuex'
    import Base from '@custom/base'
    import utils from '@corets/utils'
    import NCommonTitle from '@corecp/NCommonTitle.vue'

    export default Vue.extend({
        name: 'Setting',
        mixins: [CoreBase, Base],
        components: {
            NCommonTitle
        },
        data () {
            return {
                sourceData: [],
                targetData: [],
                dataProps: {
                    key: 'key',
                    label: 'title'
                },
                titles: ['所有菜单', '快捷入口'],
                renderFunc (h: any, option: any) {
                    const self = this as any
                    return <span>{ self.$t(option.title) }</span>
                }
            }
        },
        computed: {
            ...mapGetters([
                'menuObj',
                'comConfig'
            ])
        },
        created () {
            const self = this as any as any
            self.init()
        },
        watch: {
            'comConfig.buildSwitch': {
                deep: true,
                handler (val, oldval) {
                    localStorage.setItem('nearAdminCacheConfig', JSON.stringify(val))
                }
            },
            'comConfig.buildSwitch.isI18n' () {
                // if isI18n change, refresh page
                window.location.reload()
            }
        },
        methods: {
            ...mapActions([
                'changeCacheEntry'
            ]),
            init () {
                const self = this as any as any
                self.sourceData = utils.getMenuRootCp(self.menuObj.menuList, true)
                console.log(self.sourceData)
                if (self.comConfig.buildSwitch.isCache) {
                    // get cache entry
                    const cacheEntry = localStorage.getItem('nearAdminCustomerEntry')
                    self.targetData = cacheEntry ? JSON.parse(cacheEntry) : []
                }
            },
            handlerChange(targetKeys: any, b: any, c: any) {
                const self = this as any as any
                self.targetData = targetKeys
                if (self.comConfig.buildSwitch.isCache) {
                    localStorage.setItem('nearAdminCustomerEntry', JSON.stringify(targetKeys))
                    const cacheEntry = utils.getMenuRootCp(self.menuObj.menuList, true, undefined, targetKeys)
                    self.changeCacheEntry(cacheEntry)
                }
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '~@corescss/manage/setting.scss'
</style>
