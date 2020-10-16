<template>
    <div class="customer-entry">
        <el-row>
            <el-col :span="10">
                <template v-if="cacheEntry.length > 0">
                    <n-common-title :title="dict.localeObj.setting.customEntry" no-top></n-common-title>
                    <div class="customer-entry-item-wrp">
                        <span @click="toPage(item)" class="customer-entry-item" v-for="(item, index) in cacheEntry" :key="index" :span="6">
                            <el-tooltip placement="top" :content="$t(item.title)">
                                <span>{{ $t(item.title) }}</span>
                            </el-tooltip>
                        </span>
                    </div>
                </template>
            </el-col>
        </el-row>
        <el-row>
            <n-multi-select
                    v-model="abe"
                    :paging-info="pagingInfo"
                    :options-list="optionsList"
                    :option-columns="optionColumns"
                    show-search
                    value-key="value"
                    @changepage="changePage"
            ></n-multi-select>
        </el-row>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import CoreBase from '@corets/base'
    import Base from '@custom/base'
    import {mapGetters} from 'vuex'
    import NCommonTitle from '@corecp/NCommonTitle.vue'
    import NMultiSelect from '@corecp/NMultiSelect.vue'

    export default Vue.extend({
        name: 'HomePage',
        mixins: [CoreBase, Base],
        components: {
            NCommonTitle,
            NMultiSelect
        },
        computed: {
            ...mapGetters([
                'cacheEntry',
                'userInfo'
            ])
        },
        methods: {
            toPage (page: any) {
                const self = this as any as any
                self.$newpage({
                    title: page.title,
                    component: page.path
                })
            },
            changePage () {
                console.log('')
            }
        },
        data () {
            return {
                optionsList: [
                    {
                        value: 'nihao1',
                        label: 'nihao2'
                    },
                    {
                        value: 'nihao3',
                        label: 'nihao4'
                    }
                ],
                test: '',
                optionColumns: [
                    {
                        title: 'value',
                        field: 'value',
                        width: 240
                    },
                    {
                        title: 'label',
                        field: 'label',
                        width: 240
                    }
                ],
                abe: 'nihao1',
                pagingInfo: {
                    currentPage: 1,
                    pageSize: 10
                }
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '~@scss/custom/manage/homepage.scss'
</style>
