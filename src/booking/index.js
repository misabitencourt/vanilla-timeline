const day = 864e5
const cellWidth = 63
const cellHeight = 60
const bookingPadd = 10

export default function (params) {

    const bookingEls = []
        
    params.data.booking.forEach((booking) => {
        let date = new Date(booking.start),
            outDate = new Date(booking.end),
            timeDiff = outDate.getTime() - date.getTime(),
            dayDiff = parseInt(timeDiff / day),
            startSelector = `[data-subject-item="${booking.subject}"][data-date-item="${date.getTime()}"]`,
            endSelector = `[data-subject-item="${booking.subject}"][data-date-item="${outDate.getTime()}"]`,
            tdStart = params.el.querySelector(startSelector),
            tdEnd = params.el.querySelector(endSelector),
            bookingEl = document.createElement('div');
        
        if (! (tdStart && tdEnd)) {
            return console.warning(`I cant render the booking:`, booking)
        }

        bookingEl.className = `single-booking booking-${booking.id}`
        bookingEl.textContent = booking.name
        bookingEl.dataset.duration = dayDiff
        bookingEl.dataset.columnStart = tdStart.dataset.column
        bookingEl.dataset.columnEnd = tdEnd.dataset.column
        bookingEl.dataset.row = tdStart.dataset.row*1
        tdStart.appendChild(bookingEl)
        bookingEls.push(bookingEl)
    })
    
    function render() {
        let st = params.bookingDiv.scrollTop,
            sl = params.bookingDiv.scrollLeft,
            viewportHeight = params.bookingDiv.offsetHeight,
            viewportWidth = params.bookingDiv.offsetWidth,
            viewportLengthX = sl + viewportWidth,
            viewportLengthY = st + viewportHeight - cellHeight;

        bookingEls.forEach((el) => {
            let colStart = el.dataset.columnStart*1,
                colEnd = el.dataset.columnEnd*1,
                height = cellHeight,
                duration = 1*el.dataset.duration,
                row = 1*el.dataset.row,
                startY = row * cellHeight,
                endY = row + cellHeight,
                width = duration * cellWidth,
                startX = colStart * cellWidth,
                endX = colEnd * cellWidth,
                ml = sl*-1,
                mt = (st*-1) - 24,
                inViewport = true;

            if (startY < st) {
                let diff = st - startY
                mt += diff
                height -= diff
                startY -= diff
                if (height < 30) {
                    inViewport = false
                }
            }
                        
            if (startX < sl) {
                let diff = sl - startX
                ml += diff
                width -= diff
            }

            if (endX > viewportLengthX) {
                let diff = endX - viewportLengthX                
                width -= diff
                endX -= diff               
            }

            inViewport = inViewport && (width > 30)
            inViewport = inViewport && (startY > st) && (startY < viewportLengthY)

            if (inViewport) {
                el.style.display = 'block'
                el.style.marginLeft = `${ml}px`
                el.style.marginTop = `${mt}px`
                el.style.width = `${(width - bookingPadd)}px`
                el.style.height = height     
                return;
            }      
            
            el.style.display = 'none'
        })
    }
    
    window.addEventListener('scroll', render)
    params.bookingDiv.addEventListener('scroll', render)
    render()
}