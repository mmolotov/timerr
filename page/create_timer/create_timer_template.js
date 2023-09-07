import { Vibrator, VIBRATOR_SCENE_SHORT_LIGHT } from '@zos/sensor'
import { createWidget, deleteWidget, widget, event, prop } from '@zos/ui'
import { back } from '@zos/router'

import { CONSTANTS, getText, Timer, Units, zeroPad } from '../common'
import { COMMON, CREATE_TIMER } from '../style/style'

const REEL_VALUES = []
for (let i = 0; i < 60; i++) {
    REEL_VALUES.push({ text: zeroPad(i, 2), src: '', value: i })
}
const REEL_TYPES = { HH: 'HH', MM: 'MM', SS: 'SS' }

function CreateNewTimerPage(args) {
    const {
        header = getText(CONSTANTS.i18n.APP_NAME),
        headerStyle = COMMON.HEADER_STYLE(header),
        confirmButtonStyle = COMMON.STANDARD_BOTTOM_BUTTON_STYLE(CONSTANTS.img.CONFIRM, CONSTANTS.img.CONFIRM_PRESSED),
        confirmHandler,
    } = args

    Page({
        onInit() {
            if (getApp()._options.globalData.openMain) {
                back()
            }
        },
        build() {
            this.hh = 0
            this.mm = 0
            this.ss = 0
            this.vibro = new Vibrator()
            const header = createWidget(widget.TEXT, headerStyle)
            this.createConfirmButton()
            this.createTimerDisplay()
        },
        onDestroy() {
            this.vibro && this.vibro.stop()
        },
        createTimerDisplay() {
            this.createDisplayTextHH()
            this.createDisplayTextMM()
            this.createDisplayTextSS()
        },
        createDisplayTextHH() {
            const hhDisplayText = createWidget(widget.TEXT, CREATE_TIMER.DISPLAY_TEXT(this.hh, 0))
            const title = createWidget(widget.TEXT, CREATE_TIMER.DISPLAY_TEXT_SUB(getText(CONSTANTS.i18n.UNIT_HOUR), 0))
            hhDisplayText.addEventListener(event.CLICK_DOWN, (e) => {
                deleteWidget(hhDisplayText)
                deleteWidget(title)
                this.resetActiveReel()
                this.activeReel = this.createReelHH()
            })
        },
        createDisplayTextMM() {
            const mmDisplayText = createWidget(widget.TEXT, CREATE_TIMER.DISPLAY_TEXT(this.mm, 1))
            const title = createWidget(widget.TEXT, CREATE_TIMER.DISPLAY_TEXT_SUB(getText(CONSTANTS.i18n.UNIT_MINUTE), 1))
            mmDisplayText.addEventListener(event.CLICK_DOWN, (e) => {
                deleteWidget(mmDisplayText)
                deleteWidget(title)
                this.resetActiveReel()
                this.activeReel = this.createReelMM()
            })
        },
        createDisplayTextSS() {
            const ssDisplayText = createWidget(widget.TEXT, CREATE_TIMER.DISPLAY_TEXT(this.ss, 2))
            const title = createWidget(widget.TEXT, CREATE_TIMER.DISPLAY_TEXT_SUB(getText(CONSTANTS.i18n.UNIT_SECOND), 2))
            ssDisplayText.addEventListener(event.CLICK_DOWN, (e) => {
                deleteWidget(ssDisplayText)
                deleteWidget(title)
                this.resetActiveReel()
                this.activeReel = this.createReelSS()
            })
        },
        resetActiveReel() {
            if (this.activeReel) {
                deleteWidget(this.activeReel.reel)
                deleteWidget(this.activeReel.gradient.up)
                deleteWidget(this.activeReel.gradient.bottom)
                switch (this.activeReel.type) {
                    case REEL_TYPES.HH:
                        this.createDisplayTextHH()
                        break
                    case REEL_TYPES.MM:
                        this.createDisplayTextMM()
                        break
                    case REEL_TYPES.SS:
                        this.createDisplayTextSS()
                        break
                }
            }
        },
        createReelHH() {
            const data = [REEL_VALUES[23]].concat(REEL_VALUES.slice(0, 23))
            const reel = {
                reel: this.createReelWidget(data, 0, this.hh, (list, index) => { this.hh = this.getValueFromCycleList(list, index) }),
                gradient: this.createGradients(0),
                type: REEL_TYPES.HH
            }
            return reel
        },
        createReelMM() {
            const data = [REEL_VALUES[59]].concat(REEL_VALUES.slice(0, 59))
            const reel = {
                reel: this.createReelWidget(data, 1, this.mm, (list, index) => { this.mm = this.getValueFromCycleList(list, index) }),
                gradient: this.createGradients(1),
                type: REEL_TYPES.MM
            }
            return reel
        },
        createReelSS() {
            const data = [REEL_VALUES[59]].concat(REEL_VALUES.slice(0, 59))
            const reel = {
                reel: this.createReelWidget(data, 2, this.ss, (list, index) => { this.ss = this.getValueFromCycleList(list, index) }),
                gradient: this.createGradients(2),
                type: REEL_TYPES.SS
            }
            return reel
        },
        createReelWidget(data, position, listTop, handler) {
            const reelWidget = createWidget(widget.CYCLE_IMAGE_TEXT_LIST, CREATE_TIMER.REEL_STILE(data, position, handler))
            reelWidget.setProperty(prop.LIST_TOP, listTop)
            return reelWidget
        },
        createGradients(position) {
            const up = createWidget(widget.IMG, CREATE_TIMER.GRADIENT_UP(position))
            const bottom = createWidget(widget.IMG, CREATE_TIMER.GRADIENT_BOTTOM(position))
            return { up: up, bottom: bottom }
        },
        createConfirmButton() {
            const button = createWidget(widget.BUTTON, confirmButtonStyle)
            button.addEventListener(event.CLICK_DOWN, (e) => {
                this.doVibro()
                confirmHandler(this.getTimerObject())
            })
        },
        getValueFromCycleList(list, index) {
            return index == 0 ? 0 : list[index].value + 1
        },
        getTimerObject() {
            const valueSeconds = this.hh * CONSTANTS.seconds.hour + this.mm * CONSTANTS.seconds.min + this.ss
            return new Timer(0, Units.SEC, valueSeconds)
        },
        doVibro() {
            this.vibro.stop()
            this.vibro.setMode(VIBRATOR_SCENE_SHORT_LIGHT)
            this.vibro.start()
        },
    })
}
export default CreateNewTimerPage