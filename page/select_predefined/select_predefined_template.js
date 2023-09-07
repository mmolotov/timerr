import { Vibrator, VIBRATOR_SCENE_SHORT_LIGHT } from '@zos/sensor'
import { createWidget, widget, event, prop } from '@zos/ui'
import { push } from '@zos/router'

import { CONSTANTS, getText } from '../common'
import { COMMON, SELECT_PREDEFINED } from '../style/style'

function SelectPredefinedTimerPage(args) {
    const {
        header = getText(CONSTANTS.i18n.APP_NAME),
        headerStyle = COMMON.HEADER_STYLE(header),
        containerStyle = SELECT_PREDEFINED.TIMERS_CONTAINER_STYLE,
        addButtonStyle = COMMON.STANDARD_BOTTOM_BUTTON_STYLE(CONSTANTS.img.PLUS, CONSTANTS.img.PLUS_PRESSED),
        timerHandler,
        timersList,
        addButtonLink,
    } = args

    Page({
        onInit() {
            getApp()._options.globalData.openMain = false
        },

        build() {
            this.vibro = new Vibrator()
            const viewContainer = createWidget(widget.VIEW_CONTAINER, containerStyle)
            const header = viewContainer.createWidget(widget.TEXT, headerStyle)
            this.renderDefaultTimers(viewContainer, timersList)
            this.createAddButton()
        },

        onDestroy() {
            this.vibro && this.vibro.stop()
        },

        doVibro() {
            this.vibro.stop()
            this.vibro.setMode(VIBRATOR_SCENE_SHORT_LIGHT)
            this.vibro.start()
        },
        wrapWithVibro(fun) {
            return arg => {
                this.doVibro()
                fun(arg)
            }
        },
        renderDefaultTimers(container, timers) {
            for (let i = 0, row = 0, column = 0; i < timers.length; i++) {
                if (column == 2) {
                    column = 0
                    row++
                }
                let timer = timers[i]
                timerButton = container.createWidget(widget.BUTTON, SELECT_PREDEFINED.TIMER_BUTTON_STYLE(timer, row, column++, this.wrapWithVibro(timerHandler)))
                timerButton.setProperty(prop.DATASET, { timer: timer })
            }
        },
        createAddButton() {
            const addButton = createWidget(widget.BUTTON, addButtonStyle)
            addButton.addEventListener(event.CLICK_DOWN, (e) => {
                this.doVibro()
                push({ url: addButtonLink})
            })
        }
    })
}
export default SelectPredefinedTimerPage
