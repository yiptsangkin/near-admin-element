// @ts-nocheck

import api from '@api/manage/apiMethod'
import {mapActions} from 'vuex'
import {MenuList} from '@corets/type';
import utils from '@corets/utils';

export default {
    methods: {
        ...mapActions([
            'changeMenu',
            'changeUserInfo',
            'changeRightPathList'
        ]),
        getUserMenu () {
            const self = this as any as any
            api.getUserMenu({
                success (res) {
                    self.changeMenu(res)
                    self.setRightPath(res)
                }
            })
        },
        getUserInfo () {
            const self = this as any as any
            api.getUserInfo({
                success (res) {
                    self.changeUserInfo(res)
                }
            })
        },
        setRightPath (menuObj) {
            const self = this as any
            // to set right path for visitor, not in the right path will show 403 page
            const rightPathList = utils.getMenuRootCp(menuObj.menuList)
            const uniqueRightPathSet = new Set(rightPathList)
            self.changeRightPathList([...uniqueRightPathSet])
        }
    },
    created () {
        const self = this as any as any
        self.getUserMenu()
        self.getUserInfo()
    }
}
