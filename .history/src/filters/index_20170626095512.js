

export function getEarlyDate(data) {
    let selected = null;
    data.booking.forEach((b) => {
        let date = new Date(b.start)
        if ((! selected) || 
            date.getTime() < selected.getTime()) {
          seleted = date
        }
    })
} 

export function getLatest(data) {

}