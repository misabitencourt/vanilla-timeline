import thDateIntervalTemplate from './th-date-interval-template'
import createSubjectsTable from './create-subjects-table'
import getArrDateInterval from './arr-date-interval'
import {getDateInterval} from '../filters'
import emptyDrag from './empty-drag'

function firstThWidth() {
    let wWidth = window.innerWidth
    wWidth = wWidth * 0.4
    wWidth = wWidth > 300 ? 300 : wWidth;

    return wWidth
}

function getThDateInterval(interval) {
    return getArrDateInterval(interval).map(thDateIntervalTemplate).join('')
}

function createMonthsTable(params) {
    let dateInterval = getDateInterval(params.data)

    let tbl = document.createElement('table')
    tbl.border = 0
    tbl.className = params.tableClass || 'timeline-table'

    tbl.innerHTML = `<thead></thead>`
    let thead = tbl.getElementsByTagName('thead')[0]

    thead.innerHTML = `
        <tr>
            ${getThDateInterval(dateInterval)}
        </tr>
    `

    let tbl2 = document.createElement('table')
    tbl2.className = params.tableClass || 'timeline-table'
    tbl2.innerHTML = `<tbody></tbody>`
    params.contentTable = tbl2
    let tbody = tbl2.getElementsByTagName('tbody')[0]
    let interval = getArrDateInterval(dateInterval)

    tbody.innerHTML = params.data.subjects.map((s, row) => `
        <tr>
            <td class="subject-category-${s.category}">
                <div style="width: 63px; height: 18px"></div>
            </td>
            ${
                interval.map((d, column) => ((column+1) == interval.length) ? '' : `
                    <td data-subject-item="${s.id}" 
                        data-date-item="${d.getTime()}"
                        data-column="${column}"
                        data-row="${row}"
                        data-type="empty"
                        class="subject-category-${s.category}">
                        <div style="width: 63px; height: 18px"></div>
                    </td>
                `).join('')
            }
        </tr>
    `).join('')

    emptyDrag(Array.from(tbody.querySelectorAll('td[data-type="empty"]')))

    let div = document.createElement('div')
    div.style.width = window.innerWidth > 800 ? '78%' : '50%'

    let headerDiv = document.createElement('div')
    headerDiv.style.height = '60px'
    headerDiv.style.width = '100%'
    headerDiv.style.overflow = 'hidden'
    headerDiv.appendChild(tbl)

    let bookingDiv = document.createElement('div')
    params.bookingDiv = bookingDiv
    bookingDiv.style.height = `${params.sizes.divX - 60}px`
    bookingDiv.style.overflowX = 'auto'
    bookingDiv.appendChild(tbl2)
    bookingDiv.addEventListener('scroll', (e) => {
        tbl.style.marginLeft = `-${e.target.scrollLeft}px`
        let stbl = params.el.querySelector('[data-subjects-table]')
        stbl.style.marginTop = `-${e.target.scrollTop}px`
    })
    
    div.appendChild(headerDiv)
    div.appendChild(bookingDiv)

    Array.from(tbody.querySelectorAll('td')).forEach(td => td.addEventListener('mouseover', e => {
        if (! window.mouseDragging) {
            return;
        }
        Array.from(document.querySelectorAll('.timeline-drag-selection')).forEach(e => 
            e.classList.remove('timeline-drag-selection'));
        const tr = td.parentElement
        const days = window.mouseDragging.booking.daysDiff        
        const currentCol = (td.dataset.column*1) || 0;
        td.classList.add('timeline-drag-selection')
        for (let i=currentCol; i<(currentCol+days+1); i++) {
            const currentTd = tr.querySelector(`[data-column="${i}"]`)
            if (! currentTd) {                
                continue;
            }
            currentTd.classList.add('timeline-drag-selection')
        }
    }))

    return div
}

export function createTable(params) {
    let generalMarginY = window.innerHeight > 520 ? 
                            200 : (window.innerHeight * 0.13);

    let divX = window.innerHeight - generalMarginY
    let wrp = params.el
    wrp.style.width = '100%'
    wrp.style.height = `${divX}px`
    params.sizes = {
        divX
    }

    let subjectsTbl = createSubjectsTable(params)
    let monthsTbl = createMonthsTable(params)

    subjectsTbl.style.float = monthsTbl.style.float = 'left';

    let clearFix = document.createElement('br')
    clearFix.style.clear = 'both'

    wrp.style.overflowX = 'hidden'    
    wrp.appendChild(subjectsTbl)
    wrp.appendChild(monthsTbl)
    wrp.appendChild(clearFix)

    // 1x1 space
    subjectsTbl.style.marginTop = `60px` // FIXME auto
}


