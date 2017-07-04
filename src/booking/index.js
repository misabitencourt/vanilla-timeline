const day = 864e5
const cellWidth = 63
const cellHeight = 60
const bookingPadd = 10

export default function (params) {

    const bookingEls = []

    function killEl(el) {
        if (el.parentElement) {
            el.parentElement.removeChild(el)
        }
    }
        
    params.data.booking.forEach((booking) => {
        let date = new Date(booking.start),
            outDate = new Date(booking.end),
            timeDiff = outDate.getTime() - date.getTime(),
            dayDiff = parseInt(timeDiff / day),
            startSelector = `[data-subject-item="${booking.subject}"][data-date-item="${date.getTime()}"]`,
            endSelector = `[data-subject-item="${booking.subject}"][data-date-item="${outDate.getTime()}"]`,
            tdStart = params.el.querySelector(startSelector),
            tdEnd = params.el.querySelector(endSelector);
        
        if (! (tdStart && tdEnd)) {
            return console.warning(`I cant render the booking:`, booking)
        }

        tdStart.colSpan = dayDiff+1
        tdStart.style.backgroundColor = '#DDD'
        tdStart.textContent = booking.name

        while(date.getTime() < outDate.getTime()) {
            date.setTime(date.getTime() + day)
            let selector = `[data-subject-item="${booking.subject}"][data-date-item="${date.getTime()}"]`
            let td = params.bookingDiv.querySelector(selector)
            td && killEl(td)
        }              
    })
}