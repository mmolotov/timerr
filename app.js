import {setStatusBarVisible} from '@zos/ui'

App({
    globalData: {},
    onCreate(options) {
        setStatusBarVisible(false)
    },

    onDestroy(options) {
    }
});
