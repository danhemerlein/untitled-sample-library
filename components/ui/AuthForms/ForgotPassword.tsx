'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import Button from '@/components/ui/Button'
import { handleRequest } from '@/utils/auth-helpers/client'
import { requestPasswordUpdate } from '@/utils/auth-helpers/server'

import AuthLink from './AuthLink'

// Define prop type with allowEmail boolean
interface ForgotPasswordProps {
  allowEmail: boolean
  redirectMethod: string
  disableButton?: boolean
}

const ForgotPassword = ({
  allowEmail,
  redirectMethod,
  disableButton,
}: ForgotPasswordProps) => {
  const router = redirectMethod === 'client' ? useRouter() : null
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true) // Disable the button while the request is being handled
    await handleRequest(e, requestPasswordUpdate, router)
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
            <label htmlFor="email">Email</label>
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
          </div>
          <Button
            variant="slim"
            type="submit"
            className="mt-1"
            loading={isSubmitting}
            disabled={disableButton}
          >
            Send Email
          </Button>
        </div>
      </form>
      <AuthLink
        href="/signin/password_signin"
        cta="sign in with email and password"
      />
      {allowEmail && (
        <AuthLink href="/signin/email_signin" cta="sign in via magic link" />
      )}
      <AuthLink href="/signin/signup" cta="don't have an account? sign up" />
    </div>
  )
}

export default ForgotPassword
