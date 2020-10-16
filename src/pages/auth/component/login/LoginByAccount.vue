<template>
    <div class="n-login-by-account">
        <el-form :model="formModel" ref="formModel" :rules="formModel.rules">
            <el-form-item prop="account.value">
                <el-input v-model="formModel.account.value" autocomplete="autocomplete" name="name" :placeholder="$t(formModel.account.placeholder)">
                    <template slot="prepend">
                        <i class="iconfont primary-color icon-user"></i>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item prop="password.value">
                <el-input autocomplete="current-password" v-model="formModel.password.value" :placeholder="$t(formModel.password.placeholder)" :type="formModel.password.inputType">
                    <template slot="prepend">
                        <i class="iconfont primary-color icon-lock"></i>
                    </template>
                </el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import dict from '@custom/dict'
    import {CommonInput} from '@corets/formtype'
    import {mapGetters} from 'vuex'

    interface FormModel {
        account: CommonInput,
        password: CommonInput,
        rules: any
    }

    interface CheckRules {
        [key: string]: any[]
    }

    interface LoginByAccountData {
        formModel: FormModel
    }

    export default Vue.extend({
        name: 'LoginByAccount',
        data () {
            const data: LoginByAccountData = {
                formModel: {
                    account: {
                        placeholder: dict.localeObj.loginForm.accountPlaceholder,
                        value: '',
                        prefixIconType: 'user'
                    },
                    password: {
                        placeholder: dict.localeObj.loginForm.passwordPlaceholder,
                        value: '',
                        inputType: 'password',
                        prefixIconType: 'lock'
                    },
                    rules: {}
                }
            }
            return data
        },
        computed: {
          ...mapGetters([
              'locale'
          ])
        },
        watch: {
            locale () {
                // change locale to initRules for i18n show
                const self = this as any as any
                self.$refs.formModel.clearValidate()
                self.initRules()
            }
        },
        created () {
            const self = this as any as any
            self.initRules()
        },
        methods: {
            initRules () {
                const self = this as any as any
                self.formModel.rules = {
                    ['account.value']: [
                        {
                            required: true,
                            message: self.$t(dict.localeObj.loginForm.accountEmptyErr),
                            trigger: 'blur'
                        }
                    ],
                    ['password.value']: [
                        {
                            required: true,
                            message: self.$t(dict.localeObj.loginForm.passwordEmptyErr),
                            trigger: 'blur'
                        }
                    ]
                }
            }
        }
    })
</script>

<style lang="scss" scoped>
</style>
