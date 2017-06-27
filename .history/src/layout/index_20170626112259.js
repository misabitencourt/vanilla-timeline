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

function getThDateInterval(interval) {
    let intervalArr = [interval.start]
    
    let cursor = new Date(interval.start+'')
    do {
        cursor.setTime(cursor.getTime() + oneDay)
        intervalArr.push(new Date(cursor+''))
    } while (cursor.getTime() < interval.end.getTime());
    
    intervalArr.push(interval.end)

    return intervalArr.map((date) => {
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

    tbl.innerHTML = `<thead></thead><tbody></tbody>`
    let thead = tbl.getElementsByTagName('thead')[0]
    let tbody = tbl.getElementsByTagName('tbody')[0]

    thead.innerHTML = `
        <tr>
            <th width="${firstThWidth()}"></th>
            ${getThDateInterval(dateInterval)}
        </tr>
    `

    let div = document.createElement('div')
    div.style.width = window.innerWidth > 800 ? '20%' : '38%'
    params.el.appendChild(tbl)

    return div
}

function createSubjectsTable(params) {

}

export function createTable(params) {
    let wrp = params.el
    wrp.style.width = '100%'

    let monthsTbl = createMonthsTable(params)
    let subjectsTbl = createSubjectsTable(params)

    wrp.appendChild(monthsTbl)
    wrp.appendChild(subjectsTbl)
}


