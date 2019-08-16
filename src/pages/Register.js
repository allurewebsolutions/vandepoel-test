import React, {useState} from 'react'
import {ErrorMessage, Field, Form, Formik} from 'formik'
import * as Yup from 'yup'
import {useDispatch, useSelector} from "react-redux"
import {register} from "../redux/actions"
import {Redirect} from "react-router-dom"

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 4 characters')
        .matches(/(?=.*\d)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, 'Password must contain at least one number and one capital letter')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required')
})

const initialState = {
    email: '',
    password: '',
    confirmPassword: ''
}

const RegistrationForm = () => {
    const [redirect, setRedirect] = useState(false)
    const {isLoggedIn, redirectURL} = useSelector(store => ({
        isLoggedIn: store.users.isLoggedIn,
        redirectURL: store.users.redirectURL
    }))
    const dispatch = useDispatch()

    const _handleSubmit = (values, actions) => {
        // dispatch action to redux
        dispatch(register(values))
        // if API call inside redux action succeeded (even if error is returned)
            .then(success => {
                // if successful redirect to registration page
                if (success === true) setRedirect(true)
                // TODO: if error, display the error
            })
            // if API call inside redux action fails
            .catch(error => console.log(error.message))
    };

    // if a user is logged in and redirect url is set or redirect is triggered, redirect to redirectURL
    if ((isLoggedIn && redirectURL) || redirect) return <Redirect to={redirectURL}/>

    return (
        <div className="container">
            <h1>Register</h1>
            <Formik
                initialValues={initialState}
                validationSchema={validationSchema}
                onSubmit={_handleSubmit}
                render={({errors, status, touched}) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}/>
                            <ErrorMessage name="email" component="div" className="invalid-feedback"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')}/>
                            <ErrorMessage name="password" component="div" className="invalid-feedback"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')}/>
                            <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback"/>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary mr-2">Register</button>
                            <button type="reset" className="btn btn-secondary">Reset</button>
                        </div>
                    </Form>
                )}
            />
        </div>
    )
}

export default RegistrationForm
