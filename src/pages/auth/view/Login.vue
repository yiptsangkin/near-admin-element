<template>
    <div class="n-login-ctx">
        <el-row class="n-login-lang-wrp">
            <n-lang-picker></n-lang-picker>
        </el-row>
        <el-row class="n-login-main-ctx">
            <el-row class="n-login-logo-wrp" :gutter="18">
                <el-col class="n-sys-logo">
                    <img :src="comConfig.sysInfo.logo" alt="">
                </el-col>
                <el-col class="n-sys-name">{{ comConfig.sysInfo.name }}</el-col>
            </el-row>
            <el-row class="n-login-logo-description">
                {{ $t(comConfig.sysInfo.description) }}
            </el-row>
            <el-row class="n-login-form-wrp">
                <login-form></login-form>
            </el-row>
        </el-row>
        <el-row class="n-login-copyright-wrp">
            <copy-right></copy-right>
        </el-row>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    const LoginForm = () => import('../component/login/LoginForm')
    const NLangPicker = () => import('@corecp/NLangPicker.vue')
    const CopyRight = () => import('../component/common/CopyRight')
    export default {
        name: 'Login',
        components: {
            LoginForm,
            NLangPicker,
            CopyRight
        },
        computed: {
            ...mapGetters([
                'comConfig'
            ])
        }
    }
</script>

<style scoped lang="scss">
    @import '~@scss/custom/auth/login.scss'
</style>
