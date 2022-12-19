import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { object, string, ref } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { LockClosedIcon } from '@heroicons/react/solid'
import { useAuth } from '../context'

import { Spinner } from './'

const nameRegex =
  /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
const capitalizeRegex = /^[A-ZÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð]/

const schema = object({
  firstName: string()
    .required('First name is required')
    .matches(capitalizeRegex, 'First letter must be uppercase')
    .matches(nameRegex, 'First name is invalid'),
  lastName: string()
    .required('Last name is required')
    .matches(capitalizeRegex, 'First letter must be uppercase')
    .matches(nameRegex, 'Last name is invalid'),
  email: string()
    .required('Email address is required')
    .matches(
      /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/,
      'Please provide a valid email address'
    ),
  password: string()
    .required('Password is required')
    .min(8, 'Password must contain at least 8 characters'),
  passwordConfirm: string()
    .required('Password confirmation is required')
    .min(8, 'Password must contain at least 8 characters')
    .oneOf([ref('password'), null], 'Passwords must match'),
})

const Register = () => {
  const { register: registerUser, loading } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async ({ firstName, lastName, email, password }) => {
    await registerUser(firstName, lastName, email, password)
    reset()
    toast('Registered successfully! Now you can sign in')
  }

  return (
    <div className="pb-32">
      <motion.form
        className="max-w-[290px] flex flex-col items-center border-2 
    border-gray-500 rounded-xl mx-auto mt-24 p-8 gap-4 shadow-md"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 100 }}
      >
        <LockClosedIcon className="h-7 text-indigo-400" />

        <h4 className="text-3xl font-light text-gray-100 mb-4">
          {loading ? 'Signing up...' : 'Sign up'}
        </h4>

        {loading ? (
          <Spinner color="text-indigo-500" />
        ) : (
          <>
            <div className="flex gap-4">
              <div className="relative mt-2 w-full">
                <input
                  id="firstName"
                  name="firstName"
                  className={`peer w-full h-11 border-b-2 bg-transparent border-gray-400
              ${errors?.firstName?.message && 'focus:border-red-800'}
              focus:outline-none focus:border-indigo-600 placeholder-transparent`}
                  type="text"
                  placeholder="First name"
                  {...register('firstName')}
                />
                <label htmlFor="firstName" className="form-label">
                  First name
                </label>

                <span className="text-red-800 inline-block pt-2">
                  {errors?.firstName?.message}
                </span>
              </div>

              <div className="relative mt-2 w-full">
                <input
                  id="lastName"
                  name="lastName"
                  className={`peer w-full h-11 border-b-2 bg-transparent border-gray-400
              ${errors?.lastName?.message && 'focus:border-red-800'}
              focus:outline-none focus:border-indigo-600 placeholder-transparent`}
                  type="text"
                  placeholder="Last name"
                  {...register('lastName')}
                />
                <label htmlFor="lastName" className="form-label">
                  Last name
                </label>

                <span className="text-red-800 inline-block pt-2">
                  {errors?.lastName?.message}
                </span>
              </div>
            </div>

            <div className="relative mt-2 w-full">
              <input
                id="email"
                name="email"
                className={`peer w-full h-11 border-b-2 bg-transparent border-gray-400
            ${errors?.email?.message && 'focus:border-red-800'}
            focus:outline-none focus:border-indigo-600 placeholder-transparent`}
                type="text"
                placeholder="Email address"
                {...register('email')}
              />
              <label htmlFor="email" className="form-label">
                Email address
              </label>

              <span className="text-red-800 inline-block pt-2">
                {errors?.email?.message}
              </span>
            </div>

            <div className="relative mt-2 w-full">
              <input
                id="password"
                name="password"
                className={`peer w-full h-11 border-b-2 bg-transparent border-gray-400
            ${errors?.password?.message && 'focus:border-red-800'}
            focus:outline-none focus:border-indigo-600 placeholder-transparent`}
                type="password"
                placeholder="Password"
                {...register('password')}
              />
              <label htmlFor="password" className="form-label">
                Password
              </label>

              <span className="text-red-800 inline-block pt-2">
                {errors?.password?.message}
              </span>
            </div>

            <div className="relative mt-2 w-full">
              <input
                id="passwordConfirm"
                name="passwordConfirm"
                className={`peer w-full h-11 border-b-2 bg-transparent border-gray-400
            ${errors?.passwordConfirm?.message && 'focus:border-red-800'}
            focus:outline-none focus:border-indigo-600 placeholder-transparent`}
                type="password"
                placeholder="Confirm password"
                {...register('passwordConfirm')}
              />
              <label htmlFor="passwordConfirm" className="form-label">
                Confirm password
              </label>

              <span className="text-red-800 inline-block pt-2">
                {errors?.passwordConfirm?.message}
              </span>
            </div>

            <button
              className="btn-primary--filled mt-6 px-12"
              disabled={loading}
            >
              Register
            </button>

            <div className="flex gap-2 items-center">
              <span className="flex-1 text-gray-500 text-sm">
                Already registered?{' '}
              </span>
              <Link to="/login">
                <span className="text-indigo-600 cursor-pointer">Sign in</span>
              </Link>
            </div>
          </>
        )}
      </motion.form>
    </div>
  )
}

export default Register
