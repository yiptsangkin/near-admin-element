<template>
    <div class="n-login-form">
        <div class="n-login-tabs-wrp">
            <el-tabs v-model="activatedKey" class="n-login-tabs">
                <el-tab-pane :label="$t(item.name)" :name="item.key" v-for="(item, index) in tabPaneList" :key="item.key">
                    <component :ref="`form-detail-${index+1}`" :is="item.component"></component>
                </el-tab-pane>
            </el-tabs>
            <login-bottom @login="toLogin"></login-bottom>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    const LoginByAccount = () => import('./LoginByAccount.vue')
    const LoginByPhone = () => import('./LoginByPhone.vue')
    const LoginBottom = () => import('./LoginBottom.vue')
    import dict from '@custom/dict'
    import api from '@api/auth/apiMethod'

    export default Vue.extend({
        name: 'LoginForm',
        components: {
            LoginByAccount,
            LoginByPhone,
            LoginBottom
        },
        data () {
            return {
                activatedKey: '1',
                tabPaneList: [
                    {
                        key: '1',
                        name: dict.localeObj.loginForm.byAccountBtn,
                        component: LoginByAccount
                    },
                    {
                        key: '2',
                        name: dict.localeObj.loginForm.byPhoneBtn,
                        component: LoginByPhone
                    }
                ]
            }
        },
        methods: {
            async toLogin () {
                const self = this as any as any
                const formDetail = self.$refs[`form-detail-${self.activatedKey}`]
                if (Array.isArray(formDetail) && formDetail) {
                    const formRef = 'formModel'
                    const formObj = formDetail[0].$refs[formRef]
                    formObj.validate((valid: any) => {
                        if (valid) {
                            // check success
                            if (self.activatedKey === '1') {
                                const username: string = formDetail[0].formModel.account.value
                                const password: string = formDetail[0].formModel.password.value
                                api.checkLoginByAccount({
                                    data: {
                                        username,
                                        password
                                    },
                                    success: (res: any) => {
                                        self.$message.success(
                                            {
                                                message: self.$t(dict.localeObj.loginForm.loginSuccess) as string,
                                                onClose () {
                                                    self.toManage()
                                                }
                                            }
                                        )
                                    },
                                    fail: (res: any) => {
                                        self.$message.error(res.message)
                                    }
                                })
                            } else if (self.activatedKey === '2') {
                                const inputCode: string = formDetail[0].formModel.valid.value
                                api.checkLoginByPhone({
                                    data: {
                                        inputCode,
                                        validCode: formDetail[0].validCode
                                    },
                                    success: (res: any) => {
                                        self.$message.success(
                                            {
                                                message: self.$t(dict.localeObj.loginForm.loginSuccess) as string,
                                                onClose () {
                                                    self.toManage()
                                                }
                                            }
                                        )
                                    },
                                    fail: (res: any) => {
                                        self.$message.error(res.message)
                                    }
                                })
                            }
                        }
                    })
                }
            },
            toManage () {
                window.location.href = '/manage'
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import "~@scss/custom/auth/component/loginform.scss";
</style>
