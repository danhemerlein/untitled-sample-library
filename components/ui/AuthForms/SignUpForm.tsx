'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { handleRequest } from '@/utils/auth-helpers/client'
import { signUp } from '@/utils/auth-helpers/server'

import Button from '../Button'

import SignInWithEmailPasswordLink from './SignInWithEmailPasswordLink'

// Define prop type with allowEmail boolean
interface SignUpProps {
  allowEmail: boolean
  redirectMethod: string
}

const SignUpForm = ({ allowEmail, redirectMethod }: SignUpProps) => {
  const router = redirectMethod === 'client' ? useRouter() : null
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true) // Disable the button while the request is being handled
    await handleRequest(e, signUp, router)
    setIsSubmitting(false)
  }

  return (
    <div className="mt-4">
      <form
        noValidate={true}
        className="mb-4"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="grid gap-2">
          <div className="grid gap-2">
            <label htmlFor="email">email</label>
            <input
              id="email"
              placeholder="name@example.com"
              type="email"
              name="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              className="w-full border border-solid border-ink p-3"
            />
            <label htmlFor="password">password</label>
            <input
              id="password"
              placeholder="password"
              type="password"
              name="password"
              autoComplete="current-password"
              className="w-full border border-solid border-ink p-3"
            />
          </div>
          <Button
            variant="slim"
            type="submit"
            className="mt-1"
            loading={isSubmitting}
          >
            sign up
          </Button>
        </div>
      </form>
      <p className="text-sm lowercase">already have an account?</p>
      <SignInWithEmailPasswordLink />
      {allowEmail && (
        <p>
          <Link
            href="/signin/email_signin"
            className="dotted-link text-sm lowercase"
          >
            sign in via magic link
          </Link>
        </p>
      )}
    </div>
  )
}
export default SignUpForm
