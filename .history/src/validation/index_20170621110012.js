

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
        })
    }

    // Subjects
    if (! (data.subjects && data.subjects.length)) {

        errors.push('No subjects defined')

    }

}