import validate from './validation'
import {createTable} from './layout'
import defaults from './defaults'

window.$timelineTableConfig = window.$timelineTableConfig || defaults

window.createBookingMap = function(params) {

    let errors = validate(params.data)

    if (errors.length) {
        return errors.forEach((e) => console.error(e))
    }

    let tbl = createTable(params)
    params.el.appendChild(tbl)

}