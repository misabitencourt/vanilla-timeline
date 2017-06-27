

export function getEarlyDate(data) {
    let selected = null;

    data.booking.forEach((b) => {
        let date = new Date(b.start)
        if ((! selected) || 
            date.getTime() < selected.getTime()) {
          selected = date
        }
    })

    return selected
} 

export function getLatestDate(data) {
    let selected = null;

    data.booking.forEach((b) => {
        let date = new Date(b.end)
        if ((! selected) || 
            date.getTime() > selected.getTime()) {
          selected = date
        }
    })

    return selected
} 

export function getDateInterval(data) {
    return {
        start: getEarlyDate(data),
        end: getLatestDate(data)
    }
}