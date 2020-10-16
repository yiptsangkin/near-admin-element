<template>
    <div :class="['n-common-table-wrp', isShrink ? 'n-full-common-table' : '']">
        <n-common-operation-bar ref="op-bar" :operation-obj="tableObj" @btnevent="triggerEvent" @fullscreen="setFullScreen">
            <template slot="n-com-function">
                <el-dropdown overlay-class-name="n-border-none" v-model="dropdownVisible">
                    <el-tooltip placement="top" :content="$t(dict.localeObj.comTable.columns.title)">
                        <i class="iconfont icon-setting"></i>
                    </el-tooltip>
                    <el-dropdown-menu slot="dropdown">
                        <el-menu class="com-table-menu" multiple :selectedKeys="[]">
                            <el-menu-item>
                                <el-row type="flex" justify="space-between">
                                    <el-col>
                                        <el-checkbox @change="changeAllCheck" v-model="checkAll">{{ $t(dict.localeObj.comTable.columns.all) }}</el-checkbox>
                                    </el-col>
                                    <el-col class="n-table-btn-wrp">
                                        <el-button class="n-ant-btn-link" type="text" @click="changeAllCheck(true)">{{ $t(dict.localeObj.comTable.columns.reset) }}</el-button>
                                    </el-col>
                                </el-row>
                            </el-menu-item>
                        </el-menu>
                        <el-divider class="n-h-divider"/>
                        <el-menu class="com-table-menu" multiple :selectedKeys="[]">
                            <el-menu-item v-for="(item, index) in selectedColumns" :key="index">
                                <el-row type="flex" justify="space-between">
                                    <el-col>
                                        <el-checkbox @change="changeColumns" v-model="item.isChecked">{{ $t(item.label) }}</el-checkbox>
                                    </el-col>
                                    <el-col class="n-pin-wrp">
                                        <el-tooltip placement="top" :content="$t(dict.localeObj.comTable.columns.fixedLeft)">
                                            <i class="iconfont icon-pushpin c-pin l-pin" @click="fixedAction(index, 'left')" v-if="item.fixed !== 'left'"></i>
                                        </el-tooltip>
                                        <el-tooltip placement="top" :content="$t(dict.localeObj.comTable.columns.fixedRight)">
                                            <i class="iconfont icon-pushpin c-pin" @click="fixedAction(index, 'right')" v-if="item.fixed !== 'right'"></i>
                                        </el-tooltip>
                                        <el-tooltip placement="top" :content="$t(dict.localeObj.comTable.columns.cancelFixed)">
                                            <i class="iconfont icon-vertical-align-middl c-pin" @click="fixedAction(index, 'cancel')" v-if="item.fixed === 'right' || item.fixed === 'left'"></i>
                                        </el-tooltip>
                                    </el-col>
                                </el-row>
                            </el-menu-item>
                        </el-menu>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-divider direction="vertical"/>
                <el-dropdown placement="bottomRight" @command="changeSizePicked">
                    <el-tooltip placement="top" :content="$t(dict.localeObj.comTable.size.title)">
                        <i class="iconfont icon-colum-height"></i>
                    </el-tooltip>
                    <el-dropdown-menu slot="dropdown" class="n-tag-dropdown-menu">
                        <el-dropdown-item v-for="(item, index) in sizeMap" :key="index" :command="index">
                            {{ $t(item.name) }}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-divider direction="vertical"/>
            </template>
        </n-common-operation-bar>
        <div class="n-common-table">
            <slot name="comtable"
                  :size-class="sizeMap[sizePicked[0]].class"
                  :select-columns="tbColumns"
            ></slot>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import CoreBase from '@corets/base'
    import Base from '@custom/base'
    import utils from '@corets/utils'
    import dict from '@custom/dict'
    import NCommonOperationBar from '@corecp/NCommonOperationBar.vue'

    export default Vue.extend({
        name: 'NCommonTable',
        mixins: [CoreBase, Base],
        props: {
            tableObj: {
                type: Object
            }
        },
        components: {
            NCommonOperationBar
        },
        data () {
            return {
                sizeMap: {
                    mini: {
                        name: dict.localeObj.comTable.size.small,
                        class: 'mini'
                    },
                    small: {
                        name: dict.localeObj.comTable.size.normal,
                        class: 'small'
                    },
                    normal: {
                        name: dict.localeObj.comTable.size.large,
                        class: 'normal'
                    }
                },
                sizePicked: ['small'],
                columnsPicked: [],
                selectedColumns: [],
                tbColumns: {},
                checkAll: false,
                dropdownVisible: false,
                isShrink: false
            }
        },
        mounted () {
            const self = this as any
            self.init(true)
        },
        methods: {
            init (isChecked: boolean) {
                const self = this as any as any
                const newList: any[] = []
                const columnList: any[] = []
                const columnsMap: any = {}
                if (self.$scopedSlots.comtable) {
                    self.$scopedSlots.comtable()[0].componentOptions.children.forEach((item: any, index: number) => {
                        if (item.data.attrs['custom-show'] !== false) {
                            columnList.push(item.data.attrs)
                            columnsMap[item.data.attrs.prop] = item.data.attrs
                        }
                    })
                }
                columnList.forEach((item: any) => {
                    const pk = self.tbColumns[item.prop] ? self.tbColumns[item.prop].pk : utils.randomCharacter(6)
                    newList.push({
                        ...item,
                        isChecked,
                        pk
                    })
                    columnsMap[item.prop].isChecked = isChecked
                    columnsMap[item.prop].pk = pk
                })
                self.selectedColumns = newList
                self.tbColumns = columnsMap
                self.checkAll = isChecked
            },
            changeColumns () {
                const self = this as any as any
                const pickedList = self.selectedColumns.filter((item: any) => {
                    return item.isChecked
                })
                const pickedPropList: any[] = []
                pickedList.forEach((item: any) => {
                    pickedPropList.push(item.prop)
                })
                if (pickedList.length === 0) {
                    self.checkAll = false
                } else if (pickedList.length < self.selectedColumns.length) {
                    self.checkAll = false
                } else {
                    self.checkAll = true
                }
                for (const key of Object.keys(self.tbColumns)) {
                    if (pickedPropList.indexOf(key) === -1) {
                        self.tbColumns[key].isChecked = false
                    } else {
                        self.tbColumns[key].isChecked = true
                    }
                }
            },
            changeAllCheck (e: any) {
                const self = this as any
                const keyList = Object.keys(self.tbColumns)
                for (const key of keyList) {
                    self.$set(self.tbColumns[key], 'isChecked', e)
                }
                self.selectedColumns.forEach((item: any, index: number) => {
                    self.$set(self.selectedColumns[index], 'isChecked', e)
                })
                self.checkAll = e
            },
            fixedAction (idx: number, ftype: string) {
                const self = this as any as any
                const curPk = self.selectedColumns[idx].pk
                const keyList = Object.keys(self.tbColumns)
                for (const key of keyList) {
                    const item = self.tbColumns[key]
                    if (item.pk === curPk) {
                        if (ftype !== 'cancel') {
                            if (item.fixed === ftype) {
                                self.$set(self.tbColumns[key], 'fixed', '')
                            } else {
                                self.$set(self.tbColumns[key], 'fixed', ftype)
                            }
                        } else {
                            self.$set(self.tbColumns[key], 'fixed', '')
                        }
                    }
                }
                self.selectedColumns.forEach((item: any, index: number) => {
                    if (item.pk === curPk) {
                        if (ftype !== 'cancel') {
                            if (item.fixed === ftype) {
                                self.$set(self.selectedColumns[index], 'fixed', '')
                            } else {
                                self.$set(self.selectedColumns[index], 'fixed', ftype)
                            }
                        } else {
                            self.$set(self.selectedColumns[index], 'fixed', '')
                        }
                    }
                })
            },
            triggerEvent (method: any) {
                const self = this as any as any
                self.$emit('btnevent', method)
            },
            setFullScreen (isShrink: boolean) {
                const self = this as any as any
                self.isShrink = isShrink
            },
            changeSizePicked (key: string) {
                const self = this
                self.sizePicked = [key]
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '~@corescss/manage/commontable.scss'
</style>
