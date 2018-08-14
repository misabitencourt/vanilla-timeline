const day = 864e5
const cellWidth = 63
const cellHeight = 60
const bookingPadd = 10
const bookingEls = []
const bookingResizeEls = []
let disableCreateRange = false

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
    rightEl.classList.add('resizable')
    leftEl.classList.add('resizable')
    centerEl.classList.add('draggable')

    let isResizing = null
    let clickTime = null
    let clickedRow = 0
    let clickedPos = 0
    let draggedPos = 0

    const mousedown = (e, direction) => {
        if (e.target.classList.contains('draggable')) {
            let refElement = document.createElement('div')
            refElement.style.position = 'fixed'
            refElement.style.left = `${e.clientX}px`
            refElement.style.top = `${e.clientY}px`
            refElement.style.width = 'auto'
            refElement.textContent = centerEl.textContent
            refElement.classList.add('draggable-ref')
            document.body.appendChild(refElement)

            window.mouseDragging = {params, booking, td}

            return;
        }

        clickTime = new Date().getTime()
        isResizing = direction
        clickedPos = {x: e.x, y: e.y}
        clickedRow = td.dataset.row
    }

    const mouseup = (e) => {
        let now = new Date().getTime()
        let diff = now - (clickTime || 1e7);
        if (disableCreateRange) {
            clickedPos = clickTime = null;
            removeSelection(parent)
            return setTimeout(() => disableCreateRange = false, 300);
        }

        if ((diff < 1e3) && params.onBookingClick) {

            params.onBookingClick(booking)

        } else if (params.onCreateRage) {

            let target = e.target
            let selection;
            if (! target.dataset.dateItem) {
                target = target.parentElement
            }

            selection = Array.from(target.parentElement.querySelectorAll('.timeline-drag-selection'))
            const elStart = selection.slice().shift()
            const elEnd = selection.slice().pop()

            if (elStart && elEnd) {
                let start = new Date()
                let end = new Date()
                start.setTime(elStart.dataset.dateItem)
                end.setTime(elEnd.dataset.dateItem)
                
                params.onCreateRage(start, end, elStart.dataset.subjectItem)
            }
        }
        
        clickedPos = clickTime = null;
        removeSelection(parent)
    }

    const mousemove = (e, direction) => {
        Array.from(document.querySelectorAll('.draggable-ref')).forEach(dragEl => {
            dragEl.style.left = `${e.clientX}px`
            dragEl.style.top = `${e.clientY}px`
        })

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
                    disableCreateRange = true
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
        
        booking.daysDiff = dayDiff
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

    document.addEventListener('mouseup', (e) => {
        Array.from(document.querySelectorAll('.draggable-ref')).forEach(e => 
            e.parentElement.removeChild(e));

        const selection = Array.from(document.querySelectorAll('.timeline-drag-selection'));

        selection.forEach(e => 
            e.classList.remove('timeline-drag-selection'));

        if (window.mouseDragging) {
            const td = window.mouseDragging.td
            const booking = mouseDragging.booking
            
            const date = new Date()
            date.setTime(selection.slice().shift().dataset.dateItem)

            const subject = selection.slice().pop().dataset.subjectItem

            params.onBookingMove && params.onBookingMove(booking, date, subject);
            delete window.mouseDragging;
        }        
    })
}