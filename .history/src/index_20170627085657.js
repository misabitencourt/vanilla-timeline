import validate from './validation'
import {createTable} from './layout'
import defaults from './defaults'

window.$timelineTableConfig = window.$timelineTableConfig || defaults

window.createBookingMap = function(params) {

    let errors = validate(params.data)

    if (errors.length) {
        return errors.forEach((e) => console.error(e))
    }

    createTable(params)

    window.addEventListener('resize', () => {
      window.resizeTimeout && window.clearTimeout(window.resizeTimeout);
      window.resizeTimeout = window.setTimeout(refresh, 800)
    })

    function refresh() {
        params.el.innerHTML = ''
        createBookingMap(params)
    }
}