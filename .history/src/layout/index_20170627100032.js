import {getDateInterval} from '../filters'

function getMonthName(nr) {
    return window.$timelineTableConfig.monthNames[1*nr]
}

function firstThWidth() {
    let wWidth = window.innerWidth
    wWidth = wWidth * 0.4
    wWidth = wWidth > 300 ? 300 : wWidth;

    return wWidth
}

const oneDay = 864e5

function getArrDateInterval(interval) {
    let intervalArr = [interval.start]
    
    let cursor = new Date(interval.start+'')
    do {
        cursor.setTime(cursor.getTime() + oneDay)
        intervalArr.push(new Date(cursor+''))
    } while (cursor.getTime() < interval.end.getTime());
    
    intervalArr.push(interval.end)

    return intervalArr
}

function getThDateInterval(interval) {
    return getArrDateInterval(interval).map((date) => {
        let year = (date.getFullYear() + '').substr(2, 4)
        let month = getMonthName(date.getMonth())
        return `
            <th>
                <small class="timeline-table-date-year">
                    ${year}
                </small>
                <span class="timeline-table-date-day">
                    ${date.getDate()}
                </span>
                <span class="timeline-table-date-month">
                    ${month}
                </span>
            </th>
        `
    }).join('')
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
    tbl2.innerHTML = `<tbody></tbody>`
    let tbody = tbl2.getElementsByTagName('tbody')[0]

    tbody.innerHTML = params.data.subjects.map((s) => `
        <tr>
            ${
                getArrDateInterval(dateInterval).map((d) => `
                    <td>X</td>
                `).join('')
            }
        </tr>
    `).join('')

    let div = document.createElement('div')
    div.style.width = window.innerWidth > 800 ? '78%' : '50%'
    div.style.overflowX = 'auto'

    let headerDiv = document.createElement('div')
    headerDiv.height = '60px'
    headerDiv.appendChild(tbl)

    let bookingDiv = document.createElement('div')
    bookingDiv.style.height = `${params.divSi}px`
    
    div.appendChild(headerDiv)

    return div
}

function createSubjectsTable(params) {

    let div = document.createElement('div')
    div.style.width = window.innerWidth > 800 ? '20%' : '38%'

    let tbl = document.createElement('table')
    tbl.border = 0
    tbl.className = params.tableClass || 'timeline-table-subjects'
    
    let tbody = document.createElement('tbody')
    tbl.appendChild(tbody)
    tbody.innerHTML = params.data.subjects.map((s) => `
        <tr>
            <th data-subject="${s.id}" title="${s.description}">
                ${s.name}
            </th>
        </tr>
    `).join('')

    div.appendChild(tbl)

    return div
}

export function createTable(params) {
    let generalMarginY = window.innerHeight > 520 ? 
                            200 : (window.innerHeight * 0.13);

    let divSize = window.innerHeight - generalMarginY
    let wrp = params.el
    wrp.style.width = '100%'
    wrp.style.height = `${divSize}px`
    params.sizes = {
        divX
    }

    let subjectsTbl = createSubjectsTable(params)
    let monthsTbl = createMonthsTable(params)

    subjectsTbl.style.float = monthsTbl.style.float = 'left';

    let clearFix = document.createElement('br')
    clearFix.style.clear = 'both'

    wrp.appendChild(subjectsTbl)
    wrp.appendChild(monthsTbl)
    wrp.appendChild(clearFix)

    // 1x1 space
    let pt = 60 // FIXME auto
    subjectsTbl.innerHTML = `<div style="padding-top: ${pt}px"></div>` + 
                            subjectsTbl.innerHTML;

    

}


