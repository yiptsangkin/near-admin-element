<template>
    <el-breadcrumb class="n-bread-crumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="(item, index) in cpBread" :key="index">
            <el-dropdown class="n-tag-dropdown" v-if="item.child && item.child.length > 0">
                <span>{{ $t(item.name) }}</span>
                <template>
                    <el-dropdown-menu slot="dropdown" class="n-tag-dropdown-menu">
                        <el-dropdown-item
                                v-for="(sitem, sindex) in item.child"
                                :key="sitem.navIndex"
                                :nav-index="sitem.navIndex"
                                :cp-path="sitem.path"
                                :params-detail="encodeParams(sitem.params)"
                                :cp-name="sitem.name"
                                @click.native="handlerSelect([sitem.navIndex])"
                        >
                            <span>{{ $t(sitem.name) }}</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <template v-else>
                {{ $t(item.name) }}
            </template>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script lang="ts">
    import Vue from 'vue'
    import utils from '@corets/utils'

    export default Vue.extend({
        name: 'NBreadCrumb',
        props: {
          cpBread: {
              type: Array
          }
        },
        data () {
            return {}
        },
        methods: {
            encodeParams: utils.encodeParams,
            handlerSelect (n: string[]) {
                console.log(n)
                const self = this as any as any
                utils.handlerMenuSelect(self, n)
            }
        }
    });
</script>

<style lang="scss" scoped>
    @import "~@corescss/manage/breadcrumb.scss"
</style>
