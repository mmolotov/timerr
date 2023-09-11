import {getText} from '@zos/i18n'

export {getText}

export const CONSTANTS = {
    seconds: {
        mili: 1000,
        min:  60,
        hour: 3600
    },
    i18n:    {
        APP_NAME:               'appName',
        SELECT_TIMER_HEADER:    'select_timer',
        SELECT_INTERVAL_HEADER: 'select_interval',
        TIMER_PROGRESS_HEADER:  'timer_progress',
        CREATE_TIMER_HEADER:    'create_timer',
        CREATE_INTERVAL_HEADER: 'create_interval',
        UNIT_SECOND:            'unit_second',
        UNIT_MINUTE:            'unit_minute',
        UNIT_HOUR:              'unit_hour'

    },
    pages:   {
        SELECT_TIMER:    'page/select_predefined/select_timer',
        SELECT_INTERVAL: 'page/select_predefined/select_interval',
        TIMER_PROGRESS:  'page/timer_progress/timer_progress',
        CREATE_TIMER:    'page/create_timer/create_timer',
        CREATE_INTERVAL: 'page/create_timer/create_interval'
    },
    img:     {
        // bottom rectangle buttons
        PLUS:            'plus_button.png',
        PLUS_PRESSED:    'plus_button_pressed.png',
        CONFIRM:         'confirm_button.png',
        CONFIRM_PRESSED: 'confirm_button_pressed.png',
        STOP:            'stop_button.png',
        STOP_PRESSED:    'stop_button_pressed.png',

        // circle buttons
        CLOCK_BUTTON:         'clock_button.png',
        CLOCK_BUTTON_PRESSED: 'clock_button_pressed.png',
        CANCEL:               'cancel_button.png',
        CANCEL_PRESSED:       'cancel_button_pressed.png',
        PAUSE:                'pause_button.png',
        PAUSE_PRESSED:        'pause_button_pressed.png',
        RESUME:               'resume_button.png',
        RESUME_PRESSED:       'resume_button_pressed.png',

        // create new timer
        GRADIENT_BG_UP:     'gradient_w_1.png',
        GRADIENT_BG_BOTTOM: 'gradient_w_2.png'
    }
}

export class Unit {
    constructor(code, text) {
        this.code = code
        this.text = text
    }
}

export const Units = {
    SEC:  new Unit('SEC', getText('unit_second')),
    MIN:  new Unit('MIN', getText('unit_minute')),
    HOUR: new Unit('HOUR', getText('unit_hour'))
}

export class Timer {
    constructor(value, unit, valueSeconds = 0, args = {}) {
        this.value = value
        this.unit = unit
        this.valueSeconds = valueSeconds
        this.img = CONSTANTS.img.CLOCK_BUTTON
        this.img_pressed = CONSTANTS.img.CLOCK_BUTTON_PRESSED
        const {displayName} = args
        this.displayName = displayName
    }

    getDisplayName() {
        return !this.displayName ? this.value + ' ' + this.unit.text : this.displayName
    }
}

export class TimerModel {
    constructor() {
        this.timer
        this.interval
    }
}

export const zeroPad = (num, places = 2) => String(num).padStart(places, '0')