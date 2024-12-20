import CreationPage from '../../../common/creation_pages/create_timer.page.template'
import {replace} from '@zos/router';
import {CONSTANTS} from '../../../constants/constants';
import * as layout from './creation.page.layout';
import {log as Logger} from '@zos/utils';

const logger = Logger.getLogger('timerr');

let pageName = CONSTANTS.pages.CREATE_INTERVAL.name;
CreationPage({
    //data
    storageKey:  CONSTANTS.session.interval,
    pageName:    pageName,
    nextPageUrl: CONSTANTS.pages.TIMER_PROGRESS.getUrl(layout.DEVICE_FAMILY),

    //style
    headerStyle:    layout.HEADER_STYLE(pageName),
    containerStyle: layout.STANDARD_CONTAINER_STYLE,

    //handlers
    nextPageRoutingFunction: replace
})