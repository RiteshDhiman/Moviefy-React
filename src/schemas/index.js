import * as yup from 'yup'

const passwordRule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/


export const loginSchema = yup.object().shape({
    email : yup.string().email('Please enter a valid email').required('Required'),
    password : yup.string().min(5).matches(passwordRule, {message : 'Enter a stronger password'}).required('Required')
})