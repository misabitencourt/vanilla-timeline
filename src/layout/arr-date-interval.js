const oneDay = 864e5

export default function getArrDateInterval(interval) {
    let intervalArr = [interval.start]
    let cursor = new Date(interval.start+'')
    let end = new Date(interval.end+'')

    while (cursor.getTime() <= end.getTime()) {
        cursor.setTime(cursor.getTime() + oneDay)
        intervalArr.push(new Date(cursor+''))
    }

    return intervalArr
}