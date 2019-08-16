import React, {useState} from 'react'
import {ErrorMessage, Field, FieldArray, Form, Formik} from 'formik'
import * as Yup from 'yup'
import {useDispatch, useSelector} from "react-redux"
import {Redirect} from "react-router-dom"
import {Datepicker, Radio} from 'react-formik-ui'
import {eventRegistration} from "../redux/actions"
import CreatableSelect from 'react-select/creatable'

const validationSchema = Yup.object().shape({
    firstName: Yup.string()
        .required('First Name is required')
        .min(2)
        .max(26)
        .matches(/^[a-zA-Z]*$/, 'First name cannot have numbers and special characters'),
    lastName: Yup.string()
        .required('Last Name is required')
        .min(5)
        .max(37)
        .matches(/^[a-zA-Z]*$/, 'Last name cannot have numbers and special characters'),
    email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
    sixmonths: Yup.string()
        .required('You must select one'),
    enjoyIds: Yup.array()
        .required('You must select one'),
    cannot: Yup.boolean(),
    startReading: Yup.date()
        .when("cannot", {
            is: true,
            then: Yup.date().notRequired(),
            otherwise: Yup.date().required('You must enter a date')
        }),
    finishReading:  Yup.date()
        .when("cannot", {
            is: true,
            then: Yup.date().notRequired(),
            otherwise: Yup.date().required('You must enter a date')
        }),
    describe: Yup.string()
        .required('This field is required')
        .min(256)
        .max(4096)
})


const EventRegistration = () => {
    const [redirect, setRedirect] = useState(false)
    const [favBooks, setFavBooks] = useState([])
    const {isLoggedIn, email} = useSelector(store => ({
        isLoggedIn: store.users.isLoggedIn,
        email: store.users.email
    }))

    const initialState = {
        firstName: '',
        lastName: '',
        email: email ? email : localStorage.email ? localStorage.email : '',
        favBooks: [],
        sixmonths: '',
        cannot: false,
        enjoyIds: [],
        startReading: '',
        finishReading: '',
        describe: ''
    }

    const dispatch = useDispatch()

    const _handleSubmit = (values, actions) => {
        // dispatch action to redux
        dispatch(eventRegistration())
        // if API call inside redux action succeeded (even if error is returned)
            .then(success => {
                // if successful redirect to registration page
                if (success === true) setRedirect(true)
                // TODO: if error, display the error

                actions.setSubmitting(false)
            })
            // if API call inside redux action fails
            .catch(error => {
                console.log(error)
                actions.setSubmitting(false)
            })
    }

    const enjoy = [
        {id: "yes", name: "I enjoy reading"},
        {id: "no", name: "I do not enjoy reading"},
        {id: "cannot", name: "I cannot read"}
    ]

    const _handleEnjoyChange = () => {
        const enjoyValues = Array
            .from(document.querySelectorAll('[name=enjoyIds]'))
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.value)

        if (enjoyValues[0] === 'cannot') {
            document.getElementById('startReading').setAttribute('disabled', 'disabled')
            document.getElementById('finishReading').setAttribute('disabled', 'disabled')
            document.getElementById('cannot').value = true
        } else {
            document.getElementById('startReading').removeAttribute('disabled')
            document.getElementById('finishReading').removeAttribute('disabled')
        }
    }

    const _handleExtraValidation = () => {
        if (favBooks.length < 5) alert('You must have at least 5 favorite books')
    }

    if (!isLoggedIn) return (<Redirect to={'/'}/>)

    if (redirect) return (<Redirect to={'/success'}/>)

    return (
        <div className="container">
            <h1>Event Registration</h1>
            <Formik
                initialValues={initialState}
                validationSchema={validationSchema}
                onSubmit={_handleSubmit}
                render={({values, errors, status, touched}) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')}/>
                            <ErrorMessage name="firstName" component="div" className="invalid-feedback"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')}/>
                            <ErrorMessage name="lastName" component="div" className="invalid-feedback"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Field disabled name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}/>
                            <ErrorMessage name="email" component="div" className="invalid-feedback"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="favBooks">Favorite Books</label>
                            <CreatableSelect
                                isMulti
                                onChange={newValue => setFavBooks(newValue)}
                            />
                            <ErrorMessage name="favBooks" component="div" className="invalid-feedback"/>
                        </div>
                        <div className="form-check form-check-inline">
                            <Radio
                                inline
                                name='sixmonths'
                                label='Have you read a book within the last 6 months?'
                                options={[
                                    {value: 'yes', label: 'Yes'},
                                    {value: 'no', label: 'No'}
                                ]}
                            />
                            <ErrorMessage name="sixmonths" component="div" className="invalid-feedback"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="enjoyIds">Mark all that apply:</label>
                            <Field hidden id="cannot" name="cannot" type="text"/>
                            <FieldArray
                                name="enjoyIds"
                                className={'form-control' + (errors.enjoyIds && touched.enjoyIds ? ' is-invalid' : '')}
                                render={arrayHelpers => (
                                    <div>
                                        {enjoy.map(enjoy => (
                                            <div key={enjoy.id}>
                                                <label>
                                                    <input
                                                        name="enjoyIds"
                                                        type="checkbox"
                                                        value={enjoy.id}
                                                        checked={values.enjoyIds.includes(enjoy.id)}
                                                        onChange={e => {
                                                            _handleEnjoyChange(e)
                                                            if (e.target.checked) arrayHelpers.push(enjoy.id)
                                                            else {
                                                                const idx = values.enjoyIds.indexOf(enjoy.id)
                                                                arrayHelpers.remove(idx)
                                                            }
                                                        }}
                                                    />{" "}
                                                    {enjoy.name}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            />
                            <ErrorMessage name="enjoyIds" component="div" className="invalid-feedback"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="startReading">When did you start reading:</label><br/>
                            <Datepicker
                                name="startReading"
                                placeholder="YYYY-MM-DD"
                                dateFormat="yyyy-MM-dd"
                                className={'form-control' + (errors.startReading && touched.startReading ? ' is-invalid' : '')}
                                value={values.startReading}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="finishReading">When did you finish reading:</label><br/>
                            <Datepicker
                                name="finishReading"
                                placeholder="DD/MM/YYYY"
                                dateFormat="dd/MM/yyyy"
                                className={'form-control' + (errors.finishReading && touched.finishReading ? ' is-invalid' : '')}
                                value={values.finishReading}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="describe">Please describe your favorite book</label>
                            <Field
                                name="describe"
                                component="textarea"
                                className={'form-control' + (errors.describe && touched.describe ? ' is-invalid' : '')}
                            />
                            <ErrorMessage name="describe" component="div" className="invalid-feedback"/>
                        </div>

                        <div className="form-group">
                            <button onClick={_handleExtraValidation} type="submit" className="btn btn-primary mr-2">Submit</button>
                        </div>
                    </Form>
                )}
            />
        </div>
    )
}

export default EventRegistration
