'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getAuthTypes } from '../auth-helpers/settings'
import { getErrorRedirect, getStatusRedirect, getURL } from '../helpers'
import { createClient } from '../supabase/server'

const isValidEmail = (email: string) => {
  var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
  return regex.test(email)
}

export const redirectToPath = async (path: string) => redirect(path)

export const SignOut = async (formData: FormData) => {
  const pathName = String(formData.get('pathName')).trim()

  const supabase = createClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    return getErrorRedirect(
      pathName,
      'Hmm... Something went wrong.',
      'You could not be signed out.',
    )
  }

  return '/signin'
}

export const signInWithEmail = async (formData: FormData) => {
  const cookieStore = cookies()
  const callbackURL = getURL('/auth/callback')

  const email = String(formData.get('email')).trim()
  let redirectPath: string

  if (!isValidEmail(email)) {
    redirectPath = getErrorRedirect(
      '/signin/email_signin',
      'Invalid email address.',
      'Please try again.',
    )
  }

  const supabase = createClient()
  let options = {
    emailRedirectTo: callbackURL,
    shouldCreateUser: true,
  }

  // If allowPassword is false, do not create a new user
  const { allowPassword } = getAuthTypes()
  if (allowPassword) options.shouldCreateUser = false
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: options,
  })

  if (error) {
    redirectPath = getErrorRedirect(
      '/signin/email_signin',
      'You could not be signed in.',
      error.message,
    )
  } else if (data) {
    cookieStore.set('preferredSignInView', 'email_signin', { path: '/' })
    redirectPath = getStatusRedirect(
      '/signin/email_signin',
      'Success!',
      'Please check your email for a magic link. You may now close this tab.',
      true,
    )
  } else {
    redirectPath = getErrorRedirect(
      '/signin/email_signin',
      'Hmm... Something went wrong.',
      'You could not be signed in.',
    )
  }

  return redirectPath
}

export const requestPasswordUpdate = async (formData: FormData) => {
  const callbackURL = getURL('/auth/reset_password')

  // Get form data
  const email = String(formData.get('email')).trim()
  let redirectPath: string

  if (!isValidEmail(email)) {
    redirectPath = getErrorRedirect(
      '/signin/forgot_password',
      'Invalid email address.',
      'Please try again.',
    )
  }

  const supabase = createClient()

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: callbackURL,
  })

  if (error) {
    redirectPath = getErrorRedirect(
      '/signin/forgot_password',
      error.message,
      'Please try again.',
    )
  } else if (data) {
    redirectPath = getStatusRedirect(
      '/signin/forgot_password',
      'Success!',
      'Please check your email for a password reset link. You may now close this tab.',
      true,
    )
  } else {
    redirectPath = getErrorRedirect(
      '/signin/forgot_password',
      'Hmm... Something went wrong.',
      'Password reset email could not be sent.',
    )
  }

  return redirectPath
}

export const signInWithPassword = async (formData: FormData) => {
  const cookieStore = cookies()
  const email = String(formData.get('email')).trim()
  const password = String(formData.get('password')).trim()
  let redirectPath: string

  const supabase = createClient()
  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    redirectPath = getErrorRedirect(
      '/signin/password_signin',
      'Sign in failed.',
      error.message,
    )
  } else if (data.user) {
    cookieStore.set('preferredSignInView', 'password_signin', { path: '/' })
    redirectPath = getStatusRedirect('/', 'Success!', 'You are now signed in.')
  } else {
    redirectPath = getErrorRedirect(
      '/signin/password_signin',
      'Hmm... Something went wrong.',
      'You could not be signed in.',
    )
  }

  return redirectPath
}

export const handleDownloadRequest = async () => {
  const supabase = createClient()
  let redirectPath: string

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return getErrorRedirect(
      '/',
      'Hmm... Something went wrong.',
      'You could not be signed out.',
    )
  }

  // add file to users donwloaded items in the database
  // save the file to the user's device
  // return redirectPath
}

export const signUp = async (formData: FormData) => {
  const callbackURL = getURL('/auth/callback')

  const email = String(formData.get('email')).trim()
  const password = String(formData.get('password')).trim()
  let redirectPath: string

  if (!isValidEmail(email)) {
    redirectPath = getErrorRedirect(
      '/signin/signup',
      'Invalid email address.',
      'Please try again.',
    )
  }

  const supabase = createClient()
  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: callbackURL,
    },
  })

  if (error) {
    redirectPath = getErrorRedirect(
      '/signin/signup',
      'sign up failed.',
      error.message,
    )
  } else if (data.session) {
    redirectPath = getStatusRedirect('/', 'Success!', 'You are now signed in.')
  } else if (
    data.user &&
    data.user.identities &&
    data.user.identities.length == 0
  ) {
    redirectPath = getErrorRedirect(
      '/signin/signup',
      'sign up failed.',
      'There is already an account associated with this email address. Try resetting your password.',
    )
  } else if (data.user) {
    console.log('data.user', data.user)
    console.log('data.session', data.session)

    // TODO - this isn't working

    const { error } = await supabase.from('users').insert({ id: data.user.id })

    console.log('insert error ', error)

    redirectPath = getStatusRedirect(
      '/',
      'Success!',
      'Please check your email for a confirmation link. You may now close this tab.',
    )
  } else {
    redirectPath = getErrorRedirect(
      '/signin/signup',
      'Hmm... Something went wrong.',
      'You could not be signed up.',
    )
  }

  return redirectPath
}

export const updatePassword = async (formData: FormData) => {
  const password = String(formData.get('password')).trim()
  const passwordConfirm = String(formData.get('passwordConfirm')).trim()
  let redirectPath: string

  // Check that the password and confirmation match
  if (password !== passwordConfirm) {
    redirectPath = getErrorRedirect(
      '/signin/update_password',
      'Your password could not be updated.',
      'Passwords do not match.',
    )
  }

  const supabase = createClient()
  const { error, data } = await supabase.auth.updateUser({
    password,
  })

  if (error) {
    redirectPath = getErrorRedirect(
      '/signin/update_password',
      'Your password could not be updated.',
      error.message,
    )
  } else if (data.user) {
    redirectPath = getStatusRedirect(
      '/',
      'Success!',
      'Your password has been updated.',
    )
  } else {
    redirectPath = getErrorRedirect(
      '/signin/update_password',
      'Hmm... Something went wrong.',
      'Your password could not be updated.',
    )
  }

  return redirectPath
}

export const updateEmail = async (formData: FormData) => {
  // Get form data
  const newEmail = String(formData.get('newEmail')).trim()

  // Check that the email is valid
  if (!isValidEmail(newEmail)) {
    return getErrorRedirect(
      '/account',
      'Your email could not be updated.',
      'Invalid email address.',
    )
  }

  const supabase = createClient()

  const callbackUrl = getURL(
    getStatusRedirect('/account', 'Success!', `Your email has been updated.`),
  )

  const { error } = await supabase.auth.updateUser(
    { email: newEmail },
    {
      emailRedirectTo: callbackUrl,
    },
  )

  if (error) {
    return getErrorRedirect(
      '/account',
      'Your email could not be updated.',
      error.message,
    )
  } else {
    return getStatusRedirect(
      '/account',
      'Confirmation emails sent.',
      `You will need to confirm the update by clicking the links sent to both the old and new email addresses.`,
    )
  }
}

export const updateName = async (formData: FormData) => {
  // Get form data
  const fullName = String(formData.get('fullName')).trim()

  const supabase = createClient()
  const { error, data } = await supabase.auth.updateUser({
    data: { full_name: fullName },
  })

  if (error) {
    return getErrorRedirect(
      '/account',
      'Your name could not be updated.',
      error.message,
    )
  } else if (data.user) {
    return getStatusRedirect(
      '/account',
      'Success!',
      'Your name has been updated.',
    )
  } else {
    return getErrorRedirect(
      '/account',
      'Hmm... Something went wrong.',
      'Your name could not be updated.',
    )
  }
}
