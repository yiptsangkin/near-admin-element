<template>
    <div class="n-login-bottom">
        <div class="n-login-option clear">
            <el-checkbox-group class="inline-checkbox" v-model="formModel.autoLogin.pickedLists">
                <el-checkbox :value="formModel.autoLogin.value" label="autologin">
                    {{ $t(formModel.autoLogin.placeholder) }}
                </el-checkbox>
            </el-checkbox-group>
            <a class="n-login-forget">
                {{ $t(formModel.forgotBtn.placeholder) }}
            </a>
        </div>
        <div class="n-login-submit">
            <el-button class="n-login-submit-btn" type="primary" block size="large" @click="toLogin">{{ $t(formModel.loginBtn.text) }}</el-button>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import dict from '@custom/dict'

    interface FormModel {
        autoLogin: any,
        forgotBtn: any,
        loginBtn: any
    }

    interface LoginBottom {
        formModel: FormModel
    }

    export default Vue.extend({
        name: 'LoginBottom',
        data() {
            const data: LoginBottom = {
                formModel: {
                    autoLogin: {
                        pickedLists: [],
                        value: true,
                        placeholder: dict.localeObj.loginForm.autoLoginPlaceholder
                    },
                    forgotBtn: {
                        placeholder: dict.localeObj.loginForm.forgetBtn
                    },
                    loginBtn: {
                        text: dict.localeObj.loginForm.loginBtn
                    }
                }
            }
            return data
        },
        methods: {
            toLogin () {
                const self = this as any as any
                self.$emit('login')
            }
        }
    });
</script>

<style lang="scss" scoped>
    @import "~@scss/custom/auth/component/loginbottom.scss";
</style>
