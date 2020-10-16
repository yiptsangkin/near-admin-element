<template>
    <el-aside class="n-layout-sider" :width="shrinkLeftMenu ? '0px' : '200px'">
        <div class="n-aside-wrp">
            <el-menu
                    class="n-layout-sider-menu"
                    mode="inline"
                    :default-openeds="defaultExpandKeys"
                    :default-active="defaultIndexs[0]"
                    @select="handlerSelect"
            >
                <!-- if child is empty -->
                <template v-for="(item, index) in (menuObj.menuList[curMenu] ? (menuObj.menuList[curMenu].child || []) : [])">
                    <template v-if="item.child && item.child.length > 0">
                        <el-submenu :key="`menu-${index}`" :nav-index="`menu-${index}`" :index="`menu-${index}`">
                            <span slot="title" :title="$t(item.name)">
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
                                <span>{{ $t(item.name) }}</span>
                            </span>
                            <!-- if have group name -->
                            <el-menu-item-group v-if="item.groupName" :key="`group-${index}`" :nav-index="`group-${index}`" :index="`group-${index}`">
                                <template slot="title"><span>{{ $t(item.groupName) }}</span></template>
                                <template v-for="(sitem, sindex) in item.child || []">
                                    <template v-if="sitem.child && sitem.child.length > 0">
                                        <el-submenu :key="`sub-${index}-${sindex}`" :nav-index="`sub-${index}-${sindex}`" :index="`sub-${index}-${sindex}`">
                                            <span slot="title" :title="$t(sitem.name)">
                                                <template v-if="(typeof sitem.icon) === 'string'">
                                                    <i :class="`iconfont ${sitem.icon}`" v-if="sitem.icon"></i>
                                                </template>
                                                <template v-else>
                                                    <template v-if="sitem.icon.type === 'elicon'">
                                                        <i :class="`el-${sitem.icon.value}`" v-if="sitem.icon.value"></i>
                                                    </template>
                                                    <template v-else>
                                                        <i :class="`iconfont icon-${sitem.icon.value}`" v-if="sitem.icon.value"></i>
                                                    </template>
                                                </template>
                                                <span>{{ $t(sitem.name) }}</span>
                                            </span>
                                            <template v-for="(ssitem, ssindex) in sitem.child || []">
                                                <el-menu-item
                                                        :key="`menu-${curMenu}-sub-${index}-${sindex}-${ssindex}`"
                                                        :nav-index="`menu-${curMenu}-sub-${index}-${sindex}-${ssindex}`"
                                                        :index="`menu-${curMenu}-sub-${index}-${sindex}-${ssindex}`"
                                                        :cp-path="ssitem.path"
                                                        :cp-name="ssitem.name"
                                                >
                                                    {{ $t(ssitem.name) }}
                                                </el-menu-item>
                                            </template>
                                        </el-submenu>
                                    </template>
                                    <template v-else>
                                        <el-menu-item
                                                :key="`menu-${curMenu}-sub-${index}-${sindex}`"
                                                :nav-index="`menu-${curMenu}-sub-${index}-${sindex}`"
                                                :index="`menu-${curMenu}-sub-${index}-${sindex}`"
                                                :cp-path="sitem.path"
                                                :cp-name="sitem.name"
                                        >
                                            {{ $t(sitem.name) }}
                                        </el-menu-item>
                                    </template>
                                </template>
                            </el-menu-item-group>
                            <!-- if haven't group name -->
                            <template v-else>
                                <template v-for="(sitem, sindex) in item.child || []">
                                    <template v-if="sitem.child && sitem.child.length > 0">
                                        <el-submenu :key="`sub-${index}-${sindex}`" :nav-index="`sub-${index}-${sindex}`" :index="`sub-${index}-${sindex}`">
                                            <span slot="title" :title="$t(sitem.name)">
                                                <template v-if="(typeof sitem.icon) === 'string'">
                                                    <i :class="`iconfont ${sitem.icon}`" v-if="sitem.icon"></i>
                                                </template>
                                                <template v-else>
                                                    <template v-if="sitem.icon.type === 'elicon'">
                                                        <i :class="`el-${sitem.icon.value}`" v-if="sitem.icon.value"></i>
                                                    </template>
                                                    <template v-else>
                                                        <i :class="`iconfont icon-${sitem.icon.value}`" v-if="sitem.icon.value"></i>
                                                    </template>
                                                </template>
                                                <span>{{ $t(sitem.name) }}</span>
                                            </span>
                                            <template v-for="(ssitem, ssindex) in sitem.child || []">
                                                <el-menu-item
                                                        :key="`menu-${curMenu}-sub-${index}-${sindex}-${ssindex}`"
                                                        :nav-index="`menu-${curMenu}-sub-${index}-${sindex}-${ssindex}`"
                                                        :index="`menu-${curMenu}-sub-${index}-${sindex}-${ssindex}`"
                                                        :cp-path="ssitem.path"
                                                        :cp-name="ssitem.name"
                                                >
                                                    {{ $t(ssitem.name) }}
                                                </el-menu-item>
                                            </template>
                                        </el-submenu>
                                    </template>
                                    <template v-else>
                                        <el-menu-item
                                                :key="`menu-${curMenu}-sub-${index}-${sindex}`"
                                                :nav-index="`menu-${curMenu}-sub-${index}-${sindex}`"
                                                :index="`menu-${curMenu}-sub-${index}-${sindex}`"
                                                :cp-path="sitem.path"
                                                :cp-name="sitem.name"
                                        >
                                            {{ $t(sitem.name) }}
                                        </el-menu-item>
                                    </template>
                                </template>
                            </template>
                        </el-submenu>
                    </template>
                    <template v-else>
                        <el-menu-item
                                :key="`menu-${curMenu}-${index}`"
                                :nav-index="`menu-${curMenu}-${index}`"
                                :index="`menu-${curMenu}-${index}`"
                                :cp-path="item.path"
                                :cp-name="item.name"
                        >
                            {{ $t(item.name) }}
                        </el-menu-item>
                    </template>
                </template>
            </el-menu>
        </div>
        <div class="n-aside-shrink-btn" @click="changeShrink">
            <i :class="`shrink-arrow iconfont icon-${shrinkLeftMenu ? 'right' : 'left'}`"></i>
        </div>
    </el-aside>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { mapGetters, mapActions } from 'vuex'
    import utils from '@corets/utils'

    export default Vue.extend({
        name: 'NAside',
        computed: {
          ...mapGetters([
              'menuObj',
              'curMenu',
              'defaultExpandKeys',
              'defaultIndexs',
              'shrinkLeftMenu'
          ])
        },
        watch: {
            defaultIndexs (n) {
                const self = this as any as any
                utils.handlerMenuSelect(self, n)
            }
        },
        methods: {
            ...mapActions([
                'changeDefaultIndexs',
                'changeShrinkLeftMenu'
            ]),
            handlerSelect (key: any) {
                const self = this as any as any
                self.changeDefaultIndexs([key])
            },
            encodeParams: utils.encodeParams,
            changeShrink () {
                const self = this as any as any
                self.changeShrinkLeftMenu(!self.shrinkLeftMenu)
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '~@corescss/manage/aside.scss'
</style>
