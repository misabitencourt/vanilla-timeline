import validate from './validation'
import {createTable} from './layout'

window.createBookingMap = function(params) {

    let errors = validate(params.data)

    if (errors.length) {
        return errors.forEach((e) => console.error(e))
    }

    createTable(params.data)

}