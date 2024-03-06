'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import Button from '@/components/ui/Button'
import { handleRequest } from '@/utils/auth-helpers/client'
import { signInWithPassword } from '@/utils/auth-helpers/server'

import AuthLink from './AuthLink'

// Define prop type with allowEmail boolean
interface PasswordSignInProps {
  allowEmail: boolean
  redirectMethod: string
}

const PasswordSignIn = ({
  allowEmail,
  redirectMethod,
}: PasswordSignInProps) => {
  const router = redirectMethod === 'client' ? useRouter() : null
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true) // Disable the button while the request is being handled
    await handleRequest(e, signInWithPassword, router)
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
              placeholder="Password"
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
            sign in
          </Button>
        </div>
      </form>
      <AuthLink href="/signin/forgot_password" cta="Forgot your password?" />
      {allowEmail && (
        <AuthLink href="/signin/email_signin" cta="Sign in via magic link" />
      )}
      <AuthLink href="/signin/signup" cta="Don't have an account? Sign up" />
    </div>
  )
}

export default PasswordSignIn
