import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import EmailSignIn from '@/components/ui/AuthForms/EmailSignIn'
import ForgotPassword from '@/components/ui/AuthForms/ForgotPassword'
import PasswordSignIn from '@/components/ui/AuthForms/PasswordSignIn'
import SignUpForm from '@/components/ui/AuthForms/SignUpForm'
import UpdatePassword from '@/components/ui/AuthForms/UpdatePassword'
import Card from '@/components/ui/Card'
import {
  getAuthTypes,
  getDefaultSignInView,
  getRedirectMethod,
  getViewTypes,
} from '@/utils/auth-helpers/settings'
import { createClient } from '@/utils/supabase/server'

const SignIn = async ({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { disable_button: boolean }
}) => {
  const { allowEmail, allowPassword } = getAuthTypes()
  const viewTypes = getViewTypes()
  const redirectMethod = getRedirectMethod()

  // Declare 'viewProp' and initialize with the default value
  let viewProp: string

  // Assign url id to 'viewProp' if it's a valid string and ViewTypes includes it
  if (typeof params.id === 'string' && viewTypes.includes(params.id)) {
    viewProp = params.id
  } else {
    const preferredSignInView =
      cookies().get('preferredSignInView')?.value || null
    viewProp = getDefaultSignInView(preferredSignInView)
    return redirect(`/signin/${viewProp}`)
  }

  // Check if the user is already logged in and redirect to the account page if so
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user && viewProp !== 'update_password') {
    return redirect('/')
  } else if (!user && viewProp === 'update_password') {
    return redirect('/signin')
  }

  return (
    <div className="height-screen-helper flex justify-center">
      <div className="m-auto flex w-80 max-w-lg flex-col justify-between p-3 ">
        <Card
          title={
            viewProp === 'forgot_password'
              ? 'Reset Password'
              : viewProp === 'update_password'
                ? 'Update Password'
                : viewProp === 'signup'
                  ? 'Sign Up'
                  : 'Sign In'
          }
        >
          {viewProp === 'password_signin' && (
            <PasswordSignIn
              allowEmail={allowEmail}
              redirectMethod={redirectMethod}
            />
          )}
          {viewProp === 'email_signin' && (
            <EmailSignIn
              allowPassword={allowPassword}
              redirectMethod={redirectMethod}
              disableButton={searchParams.disable_button}
            />
          )}
          {viewProp === 'forgot_password' && (
            <ForgotPassword
              allowEmail={allowEmail}
              redirectMethod={redirectMethod}
              disableButton={searchParams.disable_button}
            />
          )}
          {viewProp === 'update_password' && (
            <UpdatePassword redirectMethod={redirectMethod} />
          )}
          {viewProp === 'signup' && (
            <SignUpForm
              allowEmail={allowEmail}
              redirectMethod={redirectMethod}
            />
          )}
        </Card>
      </div>
    </div>
  )
}
export default SignIn
