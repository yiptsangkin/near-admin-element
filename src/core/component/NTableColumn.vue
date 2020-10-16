<template>
    <el-table-column
        v-bind="$attrs"
        v-if="getTableColumnAttr(selectColumns, $attrs.prop, 'isChecked', true)"
        :fixed="getTableColumnAttr(selectColumns, $attrs.prop, 'fixed', undefined)"
    >
        <template slot-scope="{row, $index, column}">
            <slot :row="row" :$index="$index" :column="column">
                {{ row[$attrs.prop] }}
            </slot>
        </template>
    </el-table-column>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        name: 'NTableColumn',
        data () {
            return {
                selectColumns: {}
            }
        },
        methods: {
            getTableColumnAttr (columns: any, attr: string, target: string, defaultValue: any) {
                if (columns && columns[attr]) {
                    return columns[attr][target]
                } else {
                    return defaultValue
                }
            }
        },
        mounted () {
            const self = this as any
            self.$nextTick(() => {
                self.selectColumns = self.$parent.$parent.tbColumns
            })
        }
    })
</script>

<style lang="scss" scoped>
</style>
