// @ts-nocheck

import VueI18n from 'vue-i18n'
import Vue from 'vue'
import {I18nOption} from '@corets/type'
import arEG from 'element-ui/lib/locale/lang/ar'
import bgBG from 'element-ui/lib/locale/lang/bg'
import caES from 'element-ui/lib/locale/lang/ca'
import csCZ from 'element-ui/lib/locale/lang/cs-CZ'
import daDK from 'element-ui/lib/locale/lang/da'
import deDE from 'element-ui/lib/locale/lang/de'
import elGR from 'element-ui/lib/locale/lang/el'
import enUS from 'element-ui/lib/locale/lang/eu'
import esES from 'element-ui/lib/locale/lang/es'
import faIR from 'element-ui/lib/locale/lang/fa'
import fiFI from 'element-ui/lib/locale/lang/fi'
import frFR from 'element-ui/lib/locale/lang/fr'
import hrHR from 'element-ui/lib/locale/lang/hr'
import huHU from 'element-ui/lib/locale/lang/hu'
import hyAM from 'element-ui/lib/locale/lang/hy-AM'
import idID from 'element-ui/lib/locale/lang/id'
import itIT from 'element-ui/lib/locale/lang/it'
import jaJP from 'element-ui/lib/locale/lang/ja'
import koKR from 'element-ui/lib/locale/lang/ko'
import lvLV from 'element-ui/lib/locale/lang/lv'
import nlNL from 'element-ui/lib/locale/lang/nl'
import plPL from 'element-ui/lib/locale/lang/pl'
import ptPT from 'element-ui/lib/locale/lang/pt'
import roRO from 'element-ui/lib/locale/lang/ro'
import ruRU from 'element-ui/lib/locale/lang/ru-RU'
import skSK from 'element-ui/lib/locale/lang/sk'
import slSI from 'element-ui/lib/locale/lang/sl'
import srRS from 'element-ui/lib/locale/lang/sr'
import svSE from 'element-ui/lib/locale/lang/sv-SE'
import taIN from 'element-ui/lib/locale/lang/ta'
import thTH from 'element-ui/lib/locale/lang/th'
import trTR from 'element-ui/lib/locale/lang/tk'
import ukUA from 'element-ui/lib/locale/lang/ua'
import viVN from 'element-ui/lib/locale/lang/vi'
import zhCN from 'element-ui/lib/locale/lang/zh-CN'
import zhTW from 'element-ui/lib/locale/lang/zh-TW'
import customArEG from '@locale/ar_EG.ts'
import customBgBG from '@locale/bg_BG.ts'
import customCaES from '@locale/ca_ES.ts'
import customCsCZ from '@locale/cs_CZ.ts'
import customDaDK from '@locale/da_DK.ts'
import customDeDE from '@locale/de_DE.ts'
import customElGR from '@locale/el_GR.ts'
import customEnUS from '@locale/en_US.ts'
import customEsES from '@locale/es_ES.ts'
import customFaIR from '@locale/fa_IR.ts'
import customFiFI from '@locale/fi_FI.ts'
import customFrFR from '@locale/fr_FR.ts'
import customHrHR from '@locale/hr_HR.ts'
import customHuHU from '@locale/hu_HU.ts'
import customHyAM from '@locale/hy_AM.ts'
import customIdID from '@locale/id_ID.ts'
import customItIT from '@locale/it_IT.ts'
import customJaJP from '@locale/ja_JP.ts'
import customKoKR from '@locale/ko_KR.ts'
import customLvLV from '@locale/lv_LV.ts'
import customNlNL from '@locale/nl_NL.ts'
import customPlPL from '@locale/pl_PL.ts'
import customPtPT from '@locale/pt_PT.ts'
import customRoRO from '@locale/ro_RO.ts'
import customRuRU from '@locale/ru_RU.ts'
import customSkSK from '@locale/sk_SK.ts'
import customSlSI from '@locale/sl_SI.ts'
import customSrRS from '@locale/sr_RS.ts'
import customSvSE from '@locale/sv_SE.ts'
import customTaIN from '@locale/ta_IN.ts'
import customThTH from '@locale/th_TH.ts'
import customTrTR from '@locale/tr_TR.ts'
import customUkUA from '@locale/uk_UA.ts'
import customViVN from '@locale/vi_VN.ts'
import customZhCN from '@locale/zh_CN.ts'
import customZhTW from '@locale/zh_TW.ts'

const CACHE_LOCALE = localStorage.getItem('nearAdminLang') || 'zh-cn'

const globalLocaleObj: GlobalLocale = {
    ['ar']: arEG,
    ['bg']: bgBG,
    ['ca']: caES,
    ['cs']: csCZ,
    ['da']: daDK,
    ['de']: deDE,
    ['el']: elGR,
    ['en']: enUS,
    ['es']: esES,
    ['fa']: faIR,
    ['fi']: fiFI,
    ['fr']: frFR,
    ['hr']: hrHR,
    ['hu']: huHU,
    ['hy']: hyAM,
    ['id']: idID,
    ['it']: itIT,
    ['ja']: jaJP,
    ['ko']: koKR,
    ['lv']: lvLV,
    ['nl']: nlNL,
    ['pl']: plPL,
    ['pt']: ptPT,
    ['ro']: roRO,
    ['ru']: ruRU,
    ['sk']: skSK,
    ['sl']: slSI,
    ['sr']: srRS,
    ['sv']: svSE,
    ['ta']: taIN,
    ['th']: thTH,
    ['tr']: trTR,
    ['uk']: ukUA,
    ['vi']: viVN,
    ['zh-cn']: zhCN,
    ['zh-tw']: zhTW
}

const i18nOpt: I18nOption = {
    locale: CACHE_LOCALE,
    messages: {
        ['ar']: {...customArEG, ...arEG},
        ['bg']: {...customBgBG, ...bgBG},
        ['ca']: {...customCaES, ...caES},
        ['cs']: {...customCsCZ, ...csCZ},
        ['da']: {...customDaDK, ...daDK},
        ['de']: {...customDeDE, ...deDE},
        ['el']: {...customElGR, ...elGR},
        ['en']: {...customEnUS, ...enUS},
        ['es']: {...customEsES, ...esES},
        ['fa']: {...customFaIR, ...faIR},
        ['fi']: {...customFiFI, ...fiFI},
        ['fr']: {...customFrFR, ...frFR},
        ['hr']: {...customHrHR, ...hrHR},
        ['hu']: {...customHuHU, ...huHU},
        ['hy']: {...customHyAM, ...hyAM},
        ['id']: {...customIdID, ...idID},
        ['it']: {...customItIT, ...itIT},
        ['ja']: {...customJaJP, ...jaJP},
        ['ko']: {...customKoKR, ...koKR},
        ['lv']: {...customLvLV, ...lvLV},
        ['nl']: {...customNlNL, ...nlNL},
        ['pl']: {...customPlPL, ...plPL},
        ['pt']: {...customPtPT, ...ptPT},
        ['ro']: {...customRoRO, ...roRO},
        ['ru']: {...customRuRU, ...ruRU},
        ['sk']: {...customSkSK, ...skSK},
        ['sl']: {...customSlSI, ...slSI},
        ['sr']: {...customSrRS, ...srRS},
        ['sv']: {...customSvSE, ...svSE},
        ['ta']: {...customTaIN, ...taIN},
        ['th']: {...customThTH, ...thTH},
        ['tr']: {...customTrTR, ...trTR},
        ['uk']: {...customUkUA, ...ukUA},
        ['vi']: {...customViVN, ...viVN},
        ['zh-cn']: {...customZhCN, ...zhCN},
        ['zh-tw']: {...customZhTW, ...zhTW}
    }
}

Vue.use(VueI18n)
const i18n = new VueI18n(i18nOpt)
const i18nObj = new Vue({
    i18n
})

export default i18n

export {
    i18nObj,
    globalLocaleObj
}
