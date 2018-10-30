const oneDay = 864e5

export function getEarlyDate(data) {
    let selected = null;

    data.booking.forEach((b) => {
        let date = new Date(b.start)
        date = new Date(date.getTime())
        console.log(date);
        if ((! selected) || 
            date.getTime() < selected.getTime()) {
          selected = date
        }
    })

    selected.setTime(selected.getTime() - oneDay)

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

    selected.setTime(selected.getTime() + (oneDay*2))

    return selected
} 

export function getDateInterval(data) {
    return {
        start: getEarlyDate(data),
        end: getLatestDate(data)
    }
}