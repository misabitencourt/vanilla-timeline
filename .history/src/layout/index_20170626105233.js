import {getDateInterval} from '../filters'

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
        intervalArr.push(new Date(cursor+''))
    } while (cursor.getTime() < interval.end.getTime());
    
    intervalArr.push(interval.end)

    return intervalArr.map((date) => {
        let month = getMonthName(date.getMonth())
        return `
            <th>
                <small class="timeline-table-date-year">
                    ${month}
                </small>
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
    tbl.className = params.tableClass || 'timeline-table'

    tbl.innerHTML = `<thead></thead><tbody></tbody>`
    let thead = tbl.getElementsByTagName('thead')[0]
    let tbody = tbl.getElementsByTagName('tbody')[0]

    thead.innerHTML = `
        <tr>
            <th style="${firstThStyle}"></th>
            ${getThDateInterval(dateInterval)}
        </tr>
    `


    return tbl
}


