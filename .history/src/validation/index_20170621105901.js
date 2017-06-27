

export default function(data) {
    let errors = []

    if (! (data.subjectCategs && data.subjectCategs.length)) {

        errors.push('No categories defined')        

    } else {

        data.subjectCategs.forEach((categ) => {
            if (! categ.id) {
                errors.push('Category without id!!')
            }
        })
    }

}