import {getLatest} from '../filters'

function getMonthName(nr) {
    return window.$timelineTableConfig.monthNames[1*nr]
}

const firstThStyle = `width: 40%; max-width: 300px`
const oneDay = 864e5

function getThDateInterval(interval) {
    let intervalArr = [interval.start]
    
    let cursor = new Date(interval.start+'')
    do {
        cursor.setTime(cursor.getTime() + oneDay)
        intervalArr.push(cursor)
    } while (cursor.getTime() < interval.end.getTime());

    return intervalArr.map((date) => {
        let month = monthNames(date.getMonth()
        return `
            <th>
                <span class="timeline-table-date-day">
                    ${date.getDate()}
                </span>
                <span class="timeline-table-date-month">
                    ${month}
                </span>
            </th>
        `
    })
}

export function createTable(params) {

    let dateInterval = getDateInterval(params.data)

    let tbl = document.createElement('table')
    table.className = params.tableClass || 'timeline-table'

    tbl.innerHTML = `<thead></thead><tbody></tbody>`
    let thead = tbl.getElementsByTagName('thead')[0]
    let tbody = tbl.getElementsByTagName('tbody')[0]

    thead.innerHTML = `
        <tr>
            <th style="${firstThStyle}"></th>
            ${getThDateInterval(dateInterval)}
        </tr>
    `



}


