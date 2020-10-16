<template>
    <div class="logline-src">
        <!-- search pannel -->
        <n-search-panel @search="getLog" @reset="resetFiled">
            <div class="com-search-ctx" slot="n-search-ctx" slot-scope="{shrinkSwitch}">
                <el-form class="n-form" ref="n-form" :colon="false" layout="inline" :model="loglineForm.model">
                    <el-row>
                        <el-col :xs="24" :sm="12" :md="6" :lg="6" v-if="!shrinkSwitch">
                            <el-form-item :label="$t(dict.localeObj.logline.time.range)" prop="dateRange">
                                <el-select clearable v-model="loglineForm.model.dateRange" :placeholder="$t(dict.localeObj.logline.time.plh)">
                                    <el-option :key="index" v-for="(item, index) in loglineForm.external.dateRangeList" :label="$t(item.name)" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </n-search-panel>
        <!-- result table -->
        <div class="n-logline-table">
            <n-common-table :table-obj="loglineTable" @btnevent="btnEvent">
                <template v-slot:comtable="{sizeClass, selectColumns}">
                    <el-table
                            :data="loglineTable.data"
                            :size="sizeClass"
                            resizable
                            style="width: 100%"
                    >
                        <n-table-column
                                prop="number"
                                :label="$t(dict.localeObj.logline.tableColumns.index)"
                                width="60"
                        >
                            <template slot-scope="{row, $index}">
                                {{ (loglineTable.pagingInfo.currentPage - 1)
                                * loglineTable.pagingInfo.pageSize + $index + 1 }}
                            </template>
                        </n-table-column>
                        <n-table-column
                                prop="descriptor"
                                :label="$t(dict.localeObj.logline.tableColumns.desc)">
                        </n-table-column>
                        <n-table-column
                                prop="level"
                                :label="$t(dict.localeObj.logline.tableColumns.type)"
                                width="100"
                        >
                        </n-table-column>
                        <n-table-column
                                prop="time"
                                :label="$t(dict.localeObj.logline.tableColumns.time)"
                                width="200"
                        >
                            <template slot-scope="{row}">
                                {{ timestampToDateString(row.time, '-', false, false, false) }}
                            </template>
                        </n-table-column>
                        <n-table-column
                                prop="operate"
                                :label="$t(dict.localeObj.logline.tableColumns.op)"
                                width="100"
                        >
                            <template slot-scope="{row}">
                                <el-button class="n-ant-btn-link" type="text" @click="showLogDetail(row)">{{ $t(dict.localeObj.normalBtn.detail) }}</el-button>
                            </template>
                        </n-table-column>
                    </el-table>
                    <div class="n-common-pagination">
                        <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="loglineTable.pagingInfo.currentPage"
                                :page-sizes="loglineTable.pagingInfo.pageSizeOptions"
                                :page-size="loglineTable.pagingInfo.pageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="loglineTable.pagingInfo.totalRows">
                        </el-pagination>
                    </div>
                </template>
            </n-common-table>

            <!-- logline detail -->
            <el-dialog
                    :title="$t(loglineDetail.props.title)"
                    :visible.sync="loglineDetail.props.visible"
                    :width="`${loglineDetail.props.width}px`"
            >
                <n-common-title :title="dict.localeObj.logline.detail"></n-common-title>
                <div class="n-logline-basic-info">
                    <el-form class="n-form" :colon="false" :inline="true" :model="loglineDetail.model">
                        <el-row>
                            <el-col :xs="24" :sm="24" :md="12" :lg="12">
                                <el-form-item :label="$t(dict.localeObj.logline.tableColumns.type)">
                                    <el-input disabled v-model="loglineDetail.model.level"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="12" :lg="12">
                                <el-form-item :label="$t(dict.localeObj.logline.tableColumns.time)">
                                    <el-input disabled :value="timestampToDateString(loglineDetail.model.time, '-', false, false, false)"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="24" :lg="24">
                                <el-form-item :label="$t(dict.localeObj.logline.tableColumns.desc)">
                                    <el-input type="textarea" :auto-size="loglineDetail.props.autoSize" size="small" disabled v-model="loglineDetail.model.descriptor"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
                <n-common-title :title="dict.localeObj.logline.request"></n-common-title>
                <div class="n-logline-detail-info">
                    <n-codemirror :code-data="formateLogData(loglineDetail.model.data)"></n-codemirror>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import CoreBase from '@corets/base'
    import Base from '@custom/base'
    import NSearchPanel from '@corecp/NSearchPanel.vue'
    import NCommonTable from '@corecp/NCommonTable.vue'
    import NCodemirror from '@corecp/NCodemirror.vue'
    import NCommonTitle from '@corecp/NCommonTitle.vue'
    import NTableColumn from '@corecp/NTableColumn.vue'
    import dict from '@custom/dict'
    import utils from '@corets/utils'
    import {ComTable} from '@corets/type'

    export default Vue.extend({
        name: 'Logline',
        mixins: [CoreBase, Base],
        components: {
            NSearchPanel,
            NCommonTable,
            NCodemirror,
            NCommonTitle,
            NTableColumn
        },
        data () {
            return {
                loglineTable: {
                    title: dict.localeObj.logline.list,
                    columns: [],
                    pagingInfo: {
                        ...dict.commonObj.tablePagingInfoOpt
                    },
                    data: [],
                    btnList: [
                        {
                            name: dict.localeObj.logline.btnList.export,
                            method: 'exportLog'
                        },
                        {
                            name: dict.localeObj.logline.btnList.remove,
                            method: 'removeLog'
                        }
                    ]
                } as ComTable,
                loglineDetail: {
                    model: {
                        data: null,
                        descriptor: null,
                        level: null,
                        time: null
                    },
                    props: {
                        title: dict.localeObj.logline.detail,
                        visible: false,
                        width: 800,
                        autoSize: {
                            minRows: 3,
                            maxRows: 3
                        }
                    }
                },
                loglineForm: {
                    model: {
                        dateRange: undefined
                    },
                    external: {
                        dateRangeList: [
                            {
                                name: dict.localeObj.logline.time.halfDay,
                                value: '.5d'
                            },
                            {
                                name: dict.localeObj.logline.time.oneDay,
                                value: '1d'
                            },
                            {
                                name: dict.localeObj.logline.time.weekDay,
                                value: '7d'
                            },
                            {
                                name: dict.localeObj.logline.time.monthDay,
                                value: '30d'
                            }
                        ]
                    }
                }
            }
        },
        methods: {
            exportLog () {
                const self = this as any
                utils.loglineObj.getLog({
                    start: self.loglineForm.model.dateRange,
                    callback: (data: any) => {
                        data = data.reverse()
                        const dataList: object[] = []
                        const columnList = [
                            self.$t(dict.localeObj.logline.tableColumns.index),
                            self.$t(dict.localeObj.logline.tableColumns.desc),
                            self.$t(dict.localeObj.logline.tableColumns.type),
                            self.$t(dict.localeObj.logline.tableColumns.time),
                            self.$t(dict.localeObj.logline.detail)
                        ] as string[]
                        data.forEach((item: any, index: number) => {
                            dataList.push({
                                idx: index + 1,
                                descriptor: item.descriptor,
                                level: item.level,
                                time: utils.timestampToDateString(item.time, '-', false, false, false),
                                data: JSON.stringify(item.data)
                            })
                        })
                        utils.exportExcel(columnList, dataList, self.$t(dict.localeObj.logline.detail) as string)
                    }
                })
            },
            getLog (pageNum = 1) {
                const self = this as any
                self.loglineTable.pagingInfo.currentPage = pageNum
                utils.loglineObj.getLog({
                    start: self.loglineForm.model.dateRange,
                    callback: (data: any) => {
                        data = data.reverse()
                        self.loglineTable.pagingInfo.totalRows = data.length
                        const temData = data.splice(
                            (self.loglineTable.pagingInfo.currentPage - 1) * self.loglineTable.pagingInfo.pageSize,
                            self.loglineTable.pagingInfo.pageSize
                        )
                        temData.forEach((item: any, index: number) => {
                            item.idx = index + 1
                        })
                        self.loglineTable.data = temData
                    }
                })
            },
            pageChange (obj: any) {
                const self = this as any
                self.loglineTable.pagingInfo.pageSize = obj.pageSize
                self.getLog(obj.currentPage)
            },
            timestampToDateString: utils.timestampToDateString,
            showLogDetail (record: any) {
                const self = this as any as any
                self.loglineDetail.model = record
                self.loglineDetail.props.visible = true
            },
            formateLogData (data: any) {
                return JSON.stringify(data, null, 4)
            },
            resetFiled () {
                const self = this as any as any
                self.$refs['n-form'].resetFields()
                self.getLog()
            },
            btnEvent (method: string) {
                const self = this as any as any
                if (self[method]) {
                    self[method]()
                }
            },
            removeLog () {
                const self = this as any
                self.$confirm({
                    content: self.$t(dict.localeObj.logline.error.confirm),
                    onOk () {
                        utils.loglineObj.cleanLog()
                        self.$message.success(self.$t(dict.localeObj.logline.success) as string)
                        self.getLog()
                    },
                    onCancel () {
                        self.$message.info(self.$t(dict.localeObj.logline.error.cancel) as string)
                    }
                })
            },
            handleSizeChange (val: any) {
                const self = this
                self.loglineTable.pagingInfo.pageSize = val
                self.getLog()
            },
            handleCurrentChange (val: any) {
                const self = this
                self.getLog(val)
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '~@corescss/manage/logline.scss'
</style>
