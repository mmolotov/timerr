import {createWidget, event, prop, widget} from '@zos/ui';
import {log as Logger} from '@zos/utils';
import {vibroCallback} from '../../../utils/index'

const logger = Logger.getLogger('timerr');

function SelectionPage(args) {
    const {
        //data
        storageKey,
        predefinedSpans,
        columnsNumber,
        creationPageUrl,
        nextPageUrl,

        //style
        headerStyle,
        containerStyle,
        addButtonStyle,
        timerButtonStyleFunction,

        //handlers
        creationPageRoutingFunction,
        nextPageRoutingFunction
    } = args

    Page({
        onInit() {
        },
        build() {
            let viewContainer = createWidget(widget.VIEW_CONTAINER, containerStyle)
            this.renderHeader(viewContainer);
            this.renderDefaultSpans(viewContainer, predefinedSpans)
            this.renderCreateButton()
        },
        onDestroy() {
        },
        renderHeader(viewContainer) {
            viewContainer.createWidget(widget.TEXT, headerStyle)
        },
        renderDefaultSpans(viewContainer, predefinedSpans) {
            for (let i = 0, row = 0, column = 0; i < predefinedSpans.length; i++) {
                if (column === columnsNumber) {
                    column = 0
                    row++
                }
                let timeSpan = predefinedSpans[i]
                let timeSpanButtonStyle = timerButtonStyleFunction(timeSpan, row, column++, vibroCallback((button) => {
                    this.saveSelectedValue(button)
                    nextPageRoutingFunction({url: nextPageUrl})
                }));
                let timerButton = viewContainer.createWidget(widget.BUTTON, timeSpanButtonStyle)
                timerButton.setProperty(prop.DATASET, {timeSpan: timeSpan})
            }
        },
        renderCreateButton() {
            let createButton = createWidget(widget.BUTTON, addButtonStyle)
            createButton.addEventListener(event.CLICK_DOWN, vibroCallback(() => {
                creationPageRoutingFunction({url: creationPageUrl})
            }))
        },
        saveSelectedValue(button) {
            let timeSpan = button.getProperty(prop.DATASET).timeSpan;
            logger.debug('select ' + storageKey + ' : ' + timeSpan.valueSeconds)
            getApp()._options.globalData[storageKey] = timeSpan
        }
    });
}

export default SelectionPage
