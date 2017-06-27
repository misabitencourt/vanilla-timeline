import validate from './validation'

export default function(params) {

    let errors = validate(params)

    if (errors.length) {
        return errors.forEach((e) => console.error(e))
    }

}