import {getLatest} from '../filters'

function getFirstThStyle() {
    
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
            <th style="${getFirstThStyle()}"></th>
        </tr>
    `



}


