'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import Button from '@/components/ui/Button'
import { handleRequest } from '@/utils/auth-helpers/client'
import { requestPasswordUpdate } from '@/utils/auth-helpers/server'

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
      <p>
        <Link href="/signin/password_signin" className="text-sm lowercase">
          Sign in with email and password
        </Link>
      </p>
      {allowEmail && (
        <p>
          <Link href="/signin/email_signin" className="text-sm lowercase">
            Sign in via magic link
          </Link>
        </p>
      )}
      <p>
        <Link href="/signin/signup" className="text-sm lowercase">
          Don't have an account? Sign up
        </Link>
      </p>
    </div>
  )
}

export default ForgotPassword
