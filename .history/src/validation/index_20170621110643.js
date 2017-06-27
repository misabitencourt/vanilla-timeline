
function findDuplicate(list, item) {
    return !! data.subjectCategs.find((i) => i !== item && i.id === item.id)
}

export default function(data) {
    let errors = []

    // Categories
    if (! (data.subjectCategs && data.subjectCategs.length)) {

        errors.push('No categories defined')     

    } else {

        data.subjectCategs.forEach((categ) => {
            if (! categ.id) {
                errors.push('Category without id!!')
            }
            if (! categ.name) {
                errors.push('Category without name!!')
            }
            let exists = findDuplicate(subjectCategs, categ)
            if (exists) {
                errors.push('Category with duplicate id')
            }
        })
    }

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
        })
    }

    return errors
}