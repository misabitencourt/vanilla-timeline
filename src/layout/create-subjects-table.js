export default function createSubjectsTable(params) {

    let div = document.createElement('div')
    div.style.width = window.innerWidth > 800 ? '20%' : '38%'

    let tbl = document.createElement('table')
    tbl.border = 0
    tbl.dataset.subjectsTable = '1'
    tbl.className = params.tableClass || 'timeline-table-subjects'
    
    let tbody = document.createElement('tbody')
    tbl.appendChild(tbody)
    tbody.innerHTML = params.data.subjects.map((s) => `
        <tr>
            <th data-subject="${s.id}" title="${s.description}"
                class="subject-category-${s.category}">
                ${s.name}
            </th>
        </tr>
    `).join('')

    div.style.height = `${params.sizes.divX - 60}px`
    div.style.overflowY = 'hidden'
    div.appendChild(tbl)

    return div
}