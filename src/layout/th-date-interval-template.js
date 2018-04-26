function getMonthName(nr) {
    return window.$timelineTableConfig.monthNames[1*nr]
}

export default date => {
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
}