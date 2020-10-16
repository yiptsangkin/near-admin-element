<template>
    <div ref="ctx-menu" class="n-tag-ctx-menu-wrp" v-if="showCtxMenu" :style="curCtxPosStyle">
        <el-menu class="n-tag-ctx-menu" @select="selectItem">
            <el-menu-item index="cur" key="cur" v-if="curCtxPos.idx !== 0 && !(curTagList[curCtxPos.idx].params && curTagList[curCtxPos.idx].params.isAffix)">
                <a target="_blank" rel="noopener noreferrer">{{ $t(dict.localeObj.tagObj.closeCur) }}</a>
            </el-menu-item>
            <el-menu-item index="right" key="right" v-if="curCtxPos.idx !== curTagList.length - 1">
                <a target="_blank" rel="noopener noreferrer">{{ $t(dict.localeObj.tagObj.closeRight) }}</a>
            </el-menu-item>
            <el-menu-item index="other" key="other" v-if="curTagList.length > 1 && curCtxPos.idx !== 0">
                <a target="_blank" rel="noopener noreferrer">{{ $t(dict.localeObj.tagObj.closeOther) }}</a>
            </el-menu-item>
            <el-menu-item index="all" key="all" v-if="curTagList.length > 1">
                <a target="_blank" rel="noopener noreferrer">{{ $t(dict.localeObj.tagObj.closeAll) }}</a>
            </el-menu-item>
            <el-menu-item index="single" key="single">
                <a target="_blank" rel="noopener noreferrer">{{ $t(dict.localeObj.tagObj.singlePage) }}</a>
            </el-menu-item>
            <el-menu-item index="refresh" key="refresh" v-if="curTagIndex === curCtxPos.idx">
                <a target="_blank" rel="noopener noreferrer">{{ $t(dict.localeObj.tagObj.refreshPage) }}</a>
            </el-menu-item>
            <el-menu-item index="affix" key="affix">
                <a target="_blank" rel="noopener noreferrer">
                    {{ (curTagList[curCtxPos.idx].params && curTagList[curCtxPos.idx].params.isAffix) ? $t(dict.localeObj.tagObj.cancelAffixPage) : $t(dict.localeObj.tagObj.affixPage) }}
                </a>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import {mapGetters} from 'vuex'
    import dict from '@custom/dict'
    import bus from '@corets/eventbus'

    export default Vue.extend({
        name: 'NTagContentMenu',
        data () {
            return {
                dict,
                showCtxMenu: false,
                curCtxPos: {
                    x: 0,
                    y: 0,
                    idx: 0
                }
            }
        },
        computed: {
            ...mapGetters([
                'curTagIndex',
                'shrinkLeftMenu',
                'curTagList'
            ]),
            curCtxPosStyle () {
                const self = this as any as any
                const leftMargin = self.shrinkLeftMenu ? self.curCtxPos.x : self.curCtxPos.x - 200
                return `margin-top: ${self.curCtxPos.y}px; margin-left: ${leftMargin}px`
            }
        },
        methods: {
            initBusEvent () {
                const self = this as any as any
                bus.$off('tagCtxMenu').$on('tagCtxMenu', (val: any) => {
                    self.showCtxMenu = true
                    self.curCtxPos = val
                })
            },
            initGlobalClickClose () {
                const self = this as any as any
                document.addEventListener('click', (e) => {
                    const ctxMenu = self.$refs['ctx-menu']
                    if (!(ctxMenu && ctxMenu.contains(e.target))) {
                        self.showCtxMenu = false
                    }
                })
            },
            selectItem (key: any) {
                const self = this as any as any
                if (['single', 'refresh', 'affix'].indexOf(key) === -1) {
                    self.$closepage({
                        idx: self.curCtxPos.idx,
                        type: key
                    })
                } else {
                    // single page and refresh
                    if (key === 'single') {
                        self.$emit('single', self.curCtxPos.idx)
                    } else if (key === 'refresh') {
                        self.$emit('refresh', self.curCtxPos.idx)
                    } else if (key === 'affix') {
                        self.$emit('affix', self.curCtxPos.idx)
                    }
                }

                self.showCtxMenu = false
            }
        },
        created () {
            const self = this as any as any
            self.initBusEvent()
            self.initGlobalClickClose()
        }
    })
</script>

<style lang="scss" scoped>
    @import '~@corescss/manage/tagmenu.scss'
</style>
