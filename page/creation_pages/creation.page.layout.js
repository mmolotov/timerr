import {createWidget, widget} from '@zos/ui';
import {getText} from '@zos/i18n';

import {COMMON_LAYOUT} from '../common.layout';
import {doShortVibro, formatNumberForPicker, getFromStorage, saveInStorage} from '../../utils';
import {CONSTANTS} from '../common';

const CONTROLS = {
    timePicker(hh = 0, mm = 0, ss = 0, pickerCallback) {
        return {
            title:          '',
            nb_of_columns:  3,
            init_col_index: 2,
            data_config:    [
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
            picker_cb:      pickerCallback
        }
    }
}

function renderPage(pageName = '', confirmCallback) {
    let hh = getFromStorage(`${pageName}.hh`, 0) || 0
    let mm = getFromStorage(`${pageName}.mm`, 0) || 0
    let ss = getFromStorage(`${pageName}.ss`, 0) || 0

    const backgroundContainer = createWidget(widget.VIEW_CONTAINER, COMMON_LAYOUT.CONTAINERS.fullScreenContainer())
    backgroundContainer.createWidget(widget.WIDGET_PICKER, CONTROLS.timePicker(hh, mm, ss, (picker, event_type, column, valueIndex) => {
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
            saveInStorage(`${pageName}.hh`, hh)
            saveInStorage(`${pageName}.mm`, mm)
            saveInStorage(`${pageName}.ss`, ss)
            doShortVibro()
            confirmCallback(hh, mm, ss)
        }
    }))
    const header = backgroundContainer.createWidget(widget.TEXT, COMMON_LAYOUT.HEADERS.header(pageName))
}

function toSeconds(hh = 0, mm = 0, ss = 0) {
    return hh * 360 + mm * 60 + ss
}

export {CONTROLS, renderPage, toSeconds}