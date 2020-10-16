<template>
    <div class="n-login-by-phone">
        <el-form :model="formModel" ref="formModel" :rules="formModel.rules">
            <el-form-item prop="account.value">
                <el-input v-model="formModel.account.value" autocomplete="autocomplete" name="name" :placeholder="$t(formModel.account.placeholder)">
                    <template slot="prepend">
                        <i class="iconfont primary-color icon-mobile"></i>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item prop="valid.value">
                <el-row :gutter="12">
                    <el-col :span="16">
                        <el-input autocomplete="autocomplete" v-model="formModel.valid.value" :placeholder="$t(formModel.valid.placeholder)">
                            <template slot="prepend">
                                <i class="iconfont primary-color icon-mail"></i>
                            </template>
                        </el-input>
                    </el-col>
                    <el-col class="n-valid-btn" :span="8">
                        <el-button :title="$t(validBtn.btnText)" @click="sendMsg" :disabled="isSendMsg">
                            <template v-if="isSendMsg">
                                {{ lastSeconds }}s
                            </template>
                            <template v-else>
                                {{ $t(validBtn.btnText) }}
                            </template>
                        </el-button>
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import dict from '@custom/dict'
    import {CommonInput} from '@corets/formtype'
    import {mapGetters} from 'vuex'
    import api from '@api/auth/apiMethod'

    interface FormModel {
        account: CommonInput,
        valid: CommonInput,
        rules: any
    }

    interface CheckRules {
        [key: string]: any[]
    }

    interface LoginByPhoneData {
        formModel: FormModel,
        validBtn?: any,
        isSendMsg?: boolean,
        lastSeconds: number,
        validCode: string | undefined | null
    }

    export default Vue.extend({
        name: 'LoginByPhone',
        data () {
            const data: LoginByPhoneData = {
                formModel: {
                    account: {
                        placeholder: dict.localeObj.loginForm.phonePlaceholder,
                        value: '',
                        prefixIconType: 'mobile'
                    },
                    valid: {
                        placeholder: dict.localeObj.loginForm.validPlaceholder,
                        value: '',
                        prefixIconType: 'mail'
                    },
                    rules: {}
                },
                validBtn: {
                    btnText: dict.localeObj.loginForm.validBtn
                },
                isSendMsg: false,
                lastSeconds: dict.commonObj.loginForm.sendMsgGap,
                validCode: null
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
            self.getLastSeconds()
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
                    ['valid.value']: [
                        {
                            required: true,
                            message: self.$t(dict.localeObj.loginForm.validEmptyErr),
                            trigger: 'blur'
                        }
                    ]
                }
            },
            sendMsg () {
                const self = this as any as any
                if (self.isSendMsg) {
                    self.$message.warn(self.$t(dict.localeObj.loginForm.repeatSendMsgWarn))
                } else {
                    localStorage.setItem('msgSendTime', new Date().getTime().toString())
                    self.isSendMsg = true
                    self.startTimer()
                    self.toSendMsg()
                }
            },
            getLastSeconds () {
                const self = this as any as any
                const msgSendTime = localStorage.getItem('msgSendTime')
                if (msgSendTime) {
                    // if have msgSendTime
                    const nowTime = new Date().getTime()
                    const gapTime = nowTime - parseInt(msgSendTime, 10)
                    if (gapTime > dict.commonObj.loginForm.sendMsgGap * 1000) {
                        // able click
                        self.isSendMsg = false
                        localStorage.removeItem('msgSendTime')
                    } else {
                        // count last seconds
                        self.isSendMsg = true
                        self.lastSeconds = dict.commonObj.loginForm.sendMsgGap - parseInt((gapTime / 1000).toString(), 10)
                        self.startTimer()
                    }
                }
            },
            startTimer () {
                const self = this as any as any
                const timer = setInterval(() => {
                    self.lastSeconds--
                    if (self.lastSeconds <= 0) {
                        clearInterval(timer)
                        self.isSendMsg = false
                        localStorage.removeItem('msgSendTime')
                        self.lastSeconds = dict.commonObj.loginForm.sendMsgGap
                    }
                }, 1000)
            },
            async toSendMsg () {
                const self = this as any as any
                await api.getSendMsg({
                    success: (res: any) => {
                        self.$notify({
                            title: self.$t(dict.localeObj.loginForm.getMsgSuccess) as string,
                            message: `${self.$t(dict.localeObj.loginForm.getMsgTip)}：${res.msgCode}`,
                            type: 'success'
                        })
                        self.validCode = res.msgCode
                    }
                })
            }
        }
    })
</script>

<style lang="scss" scoped>
</style>
