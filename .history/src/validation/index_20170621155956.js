
function findDuplicate(list, item) {
    return !! data.subjectCategs.find((i) => i !== item && i.id === item.id)
}

function validateWithIdAndName(listName, list, errors) {
    if (! (list && list.length)) {

        errors.push(`No ${listName} defined`)

    } else {

        list.forEach((categ) => {
            if (! categ.id) {
                errors.push(`${listName} has item without id!!`)
            }
            if (! categ.name) {
                errors.push(`${listName} has item without name!!`)
            }
            let exists = findDuplicate(list, categ)
            if (exists) {
                errors.push(`${listName} has item with duplicate id`)
            }
        })
    }
}

function isValidIsoDate(date) {
    if (! date) {
        return false
    }
    if (typeof(date) !== 'string') {
        return false
    }

    let splDate = date.split('-')

    if (splDate.length !== 3) {
        return false
    }

    let dateObj = new Date(date)

    return `${dateObj}` !== 'Invalid Date'
}

export default function(data) {
    let errors = []

    // Categories
    validateWithIdAndName('categories', data.subjectCategs, errors)

    // Subjects
    if (! (data.subjects && data.subjects.length)) {

        errors.push('No subjects defined')

    } else {

        data.subjects.forEach((sbj) => {
            if (! sbj.id) {
                errors.push('Subject without id!!')
            }
            if (! sbj.name) {
                errors.push('Subject without name!!')
            }
            if (! sbj.category) {
                errors.push('Subject without category!!')
            }
            let exists = findDuplicate(data.subjects, sbj)
            if (exists) {
                errors.push('subject with duplicate id')
            }
        })
    }

    // Statuses
    validateWithIdAndName('statuses', data.statuses, errors)

    // Booking
    if (! (data.booking && data.booking.length)) {

        errors.push('No booking!!')

    } else {

        data.booking.forEach((booking) => {
            if (! booking.id) {
                errors.push('Booking without id!!')
            }
            if (! booking.name) {
                errors.push('Booking without name!!')
            }
            if (! booking.start) {
                errors.push('Booking without start date!!')
            }
            if (! booking.end) {
                errors.push('Booking without end date!!')
            }
            if (! booking.subject) {
                errors.push('Booking without subject!!')
            } else {
                let exists = (data.subjects || []).find((s) => s.id === booking.subject)
                if (! exists) {
                    errors.push(`Booking subject ${booking.subject} isnt exists!!`)
                }
            }
        })
    }

    return errors
}