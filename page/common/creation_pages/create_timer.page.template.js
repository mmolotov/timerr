import {createWidget, widget} from '@zos/ui'
import {formatNumberForPicker} from '../../../utils';
import {getText} from '@zos/i18n';
import {CONSTANTS} from '../../constants/constants';
import {log as Logger} from '@zos/utils';
import {TimeSpan} from '../../data/models'
import {LocalStorage} from '@zos/storage'

let hh = 0
let mm = 0
let ss = 0
const logger = Logger.getLogger('timerr');
const storage = new LocalStorage()

function CreationPage(args) {
    const {
        //data
        storageKey,
        pageName,
        nextPageUrl,

        //style
        headerStyle,
        containerStyle,

        //handlers
        nextPageRoutingFunction
    } = args

    Page({
        onInit() {
        },
        build() {
            this.initValues()
            let viewContainer = createWidget(widget.VIEW_CONTAINER, containerStyle)
            this.renderTimerDisplay(viewContainer)
            this.renderHeader(viewContainer);
        },
        onDestroy() {
        },
        initValues() {
            hh = storage.getItem(`${pageName}.hh`, 0) ?? 0
            mm = storage.getItem(`${pageName}.mm`, 0) ?? 0
            ss = storage.getItem(`${pageName}.ss`, 0) ?? 0
            logger.debug('initial picker values:',
                    ` ${pageName}.hh: `, hh,
                    ` ${pageName}.mm: `, mm,
                    ` ${pageName}.ss: `, ss)
        },
        renderTimerDisplay(viewContainer) {
            this.selectTime(viewContainer)
        },
        renderHeader(viewContainer) {
            viewContainer.createWidget(widget.TEXT, headerStyle)
            createWidget(widget.TEXT, headerStyle)
        },
        selectTime(viewContainer) {
            viewContainer.createWidget(widget.WIDGET_PICKER, {
                title:         '',
                nb_of_columns: 3,
                init_col_index: 2,
                data_config:   [
                    {
                        data_array:     new Array(24).fill(0).map((d, index) => formatNumberForPicker(index)),
                        support_loop:   true,
                        init_val_index: hh,
                        connector:      ':',
                        unit:           getText(CONSTANTS.i18n.UNIT_HOUR)
                    },
                    {
                        data_array:     new Array(60).fill(0).map((d, index) => formatNumberForPicker(index)),
                        support_loop:   false,
                        init_val_index: mm,
                        connector:      ':',
                        unit:           getText(CONSTANTS.i18n.UNIT_MINUTE)
                    },
                    {
                        data_array:     new Array(60).fill(0).map((d, index) => formatNumberForPicker(index)),
                        support_loop:   false,
                        init_val_index: ss,
                        unit:           getText(CONSTANTS.i18n.UNIT_SECOND)
                    }
                ],
                picker_cb:     this.pickerCallback
            });
        },
        pickerCallback(picker, event_type, column, valueIndex) {
            function collectTimeSpans() {
                let hourSec = new TimeSpan(getNumber(hh), CONSTANTS.timeUnits.HOUR).valueSeconds
                let minSec = new TimeSpan(getNumber(mm), CONSTANTS.timeUnits.MIN).valueSeconds
                let sec = new TimeSpan(getNumber(ss), CONSTANTS.timeUnits.SEC).valueSeconds
                return new TimeSpan(sec + minSec + hourSec, CONSTANTS.timeUnits.SEC)
            }

            function getNumber(value) {
                return (typeof value === 'number') ? value : 0;
            }

            function putInLocalStorage(storage, pageName, hh, mm, ss) {
                logger.debug('save picker values:',
                        ` ${pageName}.hh: `, hh,
                        ` ${pageName}.mm: `, mm,
                        ` ${pageName}.ss: `, ss)
                storage.setItem(`${pageName}.hh`, hh)
                storage.setItem(`${pageName}.mm`, mm)
                storage.setItem(`${pageName}.ss`, ss)
            }

            function savePikerValues(timeSpan) {
                // remember selected picker values for future
                putInLocalStorage(storage, pageName, hh, mm, ss)
                logger.debug('select ' + storageKey + ' : ' + timeSpan.valueSeconds)
                getApp()._options.globalData[storageKey] = timeSpan
            }

            if (event_type === 1) {
                switch (column) {
                    case 0:
                        hh = valueIndex
                        break;
                    case 1:
                        mm = valueIndex
                        break;
                    case 2:
                        ss = valueIndex
                        break;
                }
            } else if (event_type === 2) {
                let timeSpan = collectTimeSpans();
                savePikerValues(timeSpan)
                nextPageRoutingFunction({url: nextPageUrl})
            }
        }
    })
}

export default CreationPage