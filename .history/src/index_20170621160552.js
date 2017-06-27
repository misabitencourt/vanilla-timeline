import validate from './validation'

window.createBookingMap = function(params) {

    let errors = validate(params)

    if (errors.length) {
        return errors.forEach((e) => console.error(e))
    }

}