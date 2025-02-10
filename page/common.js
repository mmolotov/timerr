import {getText} from '@zos/i18n';

export class Page {
    constructor(name, url) {
        this.name = name
        this.url = url
    }

    getUrl() {
        return 'page/' + this.url
    }
}

export class TimeUnit {
    constructor(code, text) {
        this.code = code;
        this.text = text;
    }

    toSeconds() {
        throw new Error('not implemented')
    }
}

export class Second extends TimeUnit {

    constructor() {
        super('SEC', getText('unit_second'));
    }

    toSeconds() {
        return 1;
    }
}

export class Minute extends TimeUnit {
    constructor() {
        super('MIN', getText('unit_minute'));
    }

    toSeconds() {
        return 60;
    }
}

export class Hour extends TimeUnit {
    constructor() {
        super('HOUR', getText('unit_hour'));
    }

    toSeconds() {
        return 60 * 60;
    }
}

export class TimeSpan {

    constructor(value, unit, img = CONSTANTS.images.CLOCK_BUTTON, imgPressed = CONSTANTS.images.CLOCK_BUTTON_PRESSED) {
        this.value = value;
        this.unit = unit;
        this.valueSeconds = value * unit.toSeconds();
        this.img = img
        this.imgPressed = imgPressed
    }

    getDisplayName() {
        return this.value + ' ' + this.unit.text
    }
}

export class ZeroSpan extends TimeSpan {

    constructor(unit, img, imgPressed) {
        super(0, unit, img, imgPressed)
    }

    getDisplayName() {
        return '-'
    }
}

export const CONSTANTS = {
    session:   {
        timer:    'timer',
        interval: 'interval'
    },
    timeUnits: {
        SEC:  new Second(),
        MIN:  new Minute(),
        HOUR: new Hour()
    },
    i18n:      {
        APP_NAME:    'appName',
        UNIT_SECOND: 'unit_second',
        UNIT_MINUTE: 'unit_minute',
        UNIT_HOUR:   'unit_hour'
    },
    pages:     {
        SELECT_TIMER:    new Page('select_timer', 'selection_pages/select_timer.page'),
        SELECT_INTERVAL: new Page('select_interval', 'selection_pages/select_interval.page'),
        CREATE_TIMER:    new Page('create_timer', 'creation_pages/create_timer.page'),
        CREATE_INTERVAL: new Page('create_interval', 'creation_pages/create_interval.page'),
        TIMER_PROGRESS:  new Page('timer_progress', 'timer_progress/timer_progress.page')
    },
    images:    {
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
        RESUME_PRESSED:       'resume_button_pressed.png'
    }
}
