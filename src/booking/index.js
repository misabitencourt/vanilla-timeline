const day = 864e5
const cellWidth = 63
const cellHeight = 60
const bookingPadd = 10
const bookingEls = []
const bookingResizeEls = []

function removeSelection(table) {
    let oldSelection = table.querySelectorAll('.timeline-drag-selection')
    for (let i=0; i<oldSelection.length; i++) {
        let item = oldSelection[i];
        item.classList.remove('timeline-drag-selection')
    }
}

function createResizeEls(td, params, booking) {
    let leftEl = document.createElement('div'),
        centerEl = document.createElement('div'),
        rightEl = document.createElement('div'),
        parent = td.parentElement.parentElement,
        currentCellWidth = cellWidth * (td.colSpan || 1),
        resizeElWidth = cellWidth/4;

    td.innerHTML = ''
    td.appendChild(leftEl)
    td.appendChild(centerEl)
    td.appendChild(rightEl)
    centerEl.textContent = td.dataset.content
    
    centerEl.style.marginTop = `${cellHeight/4}px`
    centerEl.style.height = `${cellHeight * 0.6}px`
    centerEl.style.width = `${currentCellWidth - (resizeElWidth * 2)}px`

    centerEl.style.float = leftEl.style.float = 'left';
    rightEl.style.float = 'right';
    leftEl.style.height = rightEl.style.height = `${cellHeight}px`;
    leftEl.style.width = rightEl.style.width = `${resizeElWidth}px`;
    leftEl.style.cursor = rightEl.style.cursor = 'ew-resize';
    centerEl.style.overflow = 'hidden'

    let isResizing = null
    let clickTime = null
    let clickedRow = 0
    let clickedPos = 0
    let draggedPos = 0

    const mousedown = (e, direction) => {
        clickTime = new Date().getTime()
        isResizing = direction
        clickedPos = {x: e.x, y: e.y}
        clickedRow = td.dataset.row
    }

    const mouseup = (e) => {
        let now = new Date().getTime();
        let diff = now - (clickTime || 1e7);

        if ((diff < 1e3) && params.onBookingClick) {
            params.onBookingClick(booking)
        }

        clickedPos = clickTime = null;
        removeSelection(parent)
    }

    const mousemove = (e, direction) => {
        if (! (clickedPos && clickedRow)) return;
        draggedPos = {x: e.x - clickedPos.x, y: e.y - clickedPos.y}

        if (direction === 'l') {
            draggedPos.x = draggedPos.x * -1 
        }

        if (draggedPos.x > (cellWidth/4)) {
            window.mouseMoveTimeout && window.clearTimeout(window.mouseMoveTimeout);
            window.mouseMoveTimeout = setTimeout(() => {

                removeSelection(parent)

                if (direction === 'l') {
                    draggedPos.x = draggedPos.x * -1 
                }
                
                let itemsRange = 1;
                let pxRange = draggedPos.x - (cellWidth/4);

                while (pxRange > cellWidth) {
                    pxRange -= cellWidth
                    itemsRange++
                }

                for (let i=0; i<itemsRange; i++) {
                    let nextColNum = td.dataset.column*1;

                    if (direction === 'r') {
                        nextColNum += ((td.colSpan || 1)*1);
                        nextColNum += i;
                    } else {
                        nextColNum -= (i+1);
                    }

                    let nextCol = parent.querySelector(`td[data-row="${clickedRow}"][data-column="${nextColNum}"]`)
                    if (! nextCol) {
                        return;
                    }

                    if (nextCol.colSpan && nextCol.colSpan != 1) {
                        return;
                    }

                    nextCol.classList.add('timeline-drag-selection')
                }

                if (params.onResizeBooking) {
                    params.onResizeBooking(booking, direction === 'r' ? itemsRange : (itemsRange*-1))
                }
            }, 10)
        }
    }

    centerEl.addEventListener('mousedown', (e) => mousedown(e))
    leftEl.addEventListener('mousedown', (e) => mousedown(e, 'l'))
    rightEl.addEventListener('mousedown', (e) => mousedown(e, 'r'))

    parent.addEventListener('mousemove', (e) => mousemove(e, 'l'))
    parent.addEventListener('mousemove', (e) => mousemove(e, 'r'))

    centerEl.addEventListener('mouseup', (e) => mouseup(e))
    parent.addEventListener('mouseup', (e) => mouseup(e, 'l'))
    parent.addEventListener('mouseup', (e) => mouseup(e, 'r'))
}

export default function (params) {

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
        
        tdStart.colSpan = dayDiff+1
        tdStart.style.backgroundColor = '#DDD'
        tdStart.dataset.content = booking.name
        createResizeEls(tdStart, params, booking)

        while(date.getTime() < outDate.getTime()) {
            date.setTime(date.getTime() + day)
            let selector = `[data-subject-item="${booking.subject}"][data-date-item="${date.getTime()}"]`
            let td = params.bookingDiv.querySelector(selector)
            td && killEl(td)
        }              
    })
}