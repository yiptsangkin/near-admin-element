<template>
    <div class="n-common-bar-title">
        <el-row>
            <el-col :span="8">{{ $t(operationObj.title) }}</el-col>
            <el-col class="n-common-bar-btn-ctl" :span="16">
                <el-button class="n-common-bar-btn" :type="item.type || 'primary'" v-for="(item, index) in operationObj.btnList" @click="triggerBtn(item.method)" :key="index">{{ $t(item.name) }}</el-button>
                <el-divider direction="vertical"/>
                <slot name="n-com-function" :is-shrink="isShrink"></slot>
                <el-tooltip :content="$t(isShrink ? dict.localeObj.comTable.unFullscreen : dict.localeObj.comTable.fullscreen)" :placement="isShrink ? 'bottom-end' : 'top-end'">
                    <i :class="`iconfont ${isShrink ? 'icon-shrink' : 'icon-arrawsalt'}`" @click="shrinkContent"></i>
                </el-tooltip>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import {OperationBar} from '@corets/type'
    import utils from '@corets/utils'
    import dict from '@custom/dict'

    export default Vue.extend({
        name: 'NCommonOperationBar',

        props: {
            operationObj: {
                type: Object as () => OperationBar
            }
        },

        data () {
            return {
                dict,
                isShrink: false
            }
        },

        methods: {
            shrinkContent () {
                const self = this as any as any
                self.isShrink = !self.isShrink
                utils.fullScreenCtl(self.isShrink)
                self.$emit('fullscreen', self.isShrink)
            },
            triggerBtn (method: any) {
                const self = this as any as any
                self.$emit('btnevent', method)
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '~@corescss/manage/comoperationbar'
</style>
