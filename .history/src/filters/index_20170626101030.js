

export function getLastDate(data, isLatest) {
    let selected = null;

    data.booking.forEach((b) => {
        let date = new Date(b.start)
        if ((! selected) || 
            date.getTime() < selected.getTime()) {
          seleted = date
        }
    })

    return selected
} 

export function getLatest(data) {
    
}