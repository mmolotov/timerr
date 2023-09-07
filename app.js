import { TimerModel } from "./page/common"

App({
  globalData: {
  },
  onCreate(options) {
    console.log('app on create invoke')
    this.globalData.timerModel = new TimerModel()
  },

  onDestroy(options) {
    console.log('app on destroy invoke')
  }
})