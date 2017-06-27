import {getDateInterval} from '../filters'

function getMonthName(nr) {
    return window.$timelineTableConfig.monthNames[1*nr]
}

function firstThStyle() {
    let wWidth = window.innerWidth
    wWidth = wWidth * 0.4
    wWidth = wWidth > 300 ? 300 : wWidth;

    return wWidth}

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

export function createTable(params) {

    let dateInterval = getDateInterval(params.data)

    let tbl = document.createElement('table')
    tbl.border = 0
    tbl.className = params.tableClass || 'timeline-table'

    tbl.innerHTML = `<thead></thead><tbody></tbody>`
    let thead = tbl.getElementsByTagName('thead')[0]
    let tbody = tbl.getElementsByTagName('tbody')[0]

    thead.innerHTML = `
        <tr>
            <th style="${firstThStyle()}"></th>
            ${getThDateInterval(dateInterval)}
        </tr>
    `

    return tbl
}


