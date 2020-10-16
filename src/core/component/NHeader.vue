<template>
    <div class="n-layout-header">
        <div class="n-header-ham">
            <i class="iconfont icon-menu"></i>
        </div>
        <div class="n-header-sys-name">{{ comConfig.sysInfo.name }}</div>
        <div class="n-header-nav">
            <el-menu mode="horizontal" :default-active="curMenu[0].toString()" @select="changeMenu">
                <el-menu-item :key="index" :index="index.toString()" v-for="(item, index) in menuObj.menuList">
                    <template v-if="(typeof item.icon) === 'string'">
                        <i :class="`iconfont ${item.icon}`" v-if="item.icon"></i>
                    </template>
                    <template v-else>
                        <template v-if="item.icon.type === 'elicon'">
                            <i :class="`el-${item.icon.value}`" v-if="item.icon.value"></i>
                        </template>
                        <template v-else>
                            <i :class="`iconfont icon-${item.icon.value}`" v-if="item.icon.value"></i>
                        </template>
                    </template>
                    {{ $t(item.name) }}
                </el-menu-item>
            </el-menu>
        </div>
        <div class="n-header-right-part">
            <div class="n-com-head-func" @click="setFullScreen">
                <i class="n-fullscreen iconfont icon-fullscreen" v-if="!isFullScreen"></i>
                <i class="n-fullscreen iconfont icon-fullscreen-exit" v-else></i>
            </div>
            <n-lang-picker class="n-com-head-func"></n-lang-picker>
            <el-popover :visible-arrow="false" popper-class="n-header-info">
                <div class="n-user-avatar n-com-head-func" slot="reference">
                    <img :src="userInfo.avatar" alt="">
                </div>
                <div class="n-user-info-pannel">
                    <div class="n-user-info-basic">
                        <div class="n-user-info-avater">
                            <img :src="userInfo.avatar" alt="">
                        </div>
                        <div class="n-user-info-desc">
                            <div class="n-user-info-role">{{ userInfo.roleName }}</div>
                            <div class="n-user-info-name">{{ userInfo.userName }}</div>
                        </div>
                    </div>
                    <div class="n-user-menu-func">
                        <el-menu>
                            <el-menu-item key="logline" @click="toLogline">
                                <i class="iconfont icon-calendar"></i>
                                {{$t(dict.localeObj.personalCenter.frontendLog)}}
                            </el-menu-item>
                            <el-menu-item key="customsetting" @click="toSetting">
                                <i class="iconfont icon-setting"></i>
                                {{$t(dict.localeObj.personalCenter.customSetting)}}
                            </el-menu-item>
                            <el-menu-item key="customclean" @click="toClean">
                                <i class="iconfont icon-delete"></i>
                                {{$t(dict.localeObj.personalCenter.customClean)}}
                            </el-menu-item>
                        </el-menu>
                    </div>
                    <div class="n-user-menu-logout">
                        {{$t(dict.localeObj.personalCenter.logout)}}
                    </div>
                </div>
            </el-popover>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import {mapGetters, mapActions} from 'vuex'
    import dict from '@custom/dict'
    import utils from '@corets/utils'

    const NLangPicker = () => import('@corecp/NLangPicker.vue');

    export default Vue.extend({
        name: 'NHeader',
        computed: {
            ...mapGetters([
                'comConfig',
                'menuObj',
                'curMenu',
                'userInfo',
                'isFullScreen'
            ])
        },
        components: {
            NLangPicker
        },
        data () {
            return {
                dict
            }
        },
        methods: {
            ...mapActions([
                'changeCurMenu',
                'changeFullScreen'
            ]),
            changeMenu (key: any) {
                const self = this as any as any
                self.changeCurMenu([key])
            },
            toLogline () {
                const self = this as any as any
                self.$newpage({
                    title: dict.localeObj.personalCenter.frontendLog,
                    component: dict.commonObj.loglinePath
                })
            },
            toSetting () {
                const self = this as any as any
                self.$newpage({
                    title: dict.localeObj.personalCenter.customSetting,
                    component: dict.commonObj.settingPath
                })
            },
            setFullScreen() {
                const self = this as any as any
                utils.fullScreenCtl(!self.isFullScreen)
            },
            toClean () {
                const self = this as any as any
                dict.commonObj.localStorageKey.forEach((item) => {
                    localStorage.removeItem(item)
                })
                self.$message.success({
                    message: self.$t(dict.localeObj.personalCenter.errorTip.cleanSuccess) as string,
                    onClose () {
                        window.location.reload()
                    }
                }
                )
            }
        }
    });
</script>

<style lang="scss" scoped>
    @import '~@corescss/manage/header.scss'
</style>

<style lang="scss">
    .n-header-info{
        padding: 0;
        margin-top: 5px!important;
    }
</style>
