'use client'

import Link from 'next/link'
import { SignOut } from '@/utils/auth-helpers/server'
import { handleRequest } from '@/utils/auth-helpers/client'
import { usePathname, useRouter } from 'next/navigation'
import { getRedirectMethod } from '@/utils/auth-helpers/settings'
import s from './Navbar.module.css'
import Account from '@/components/ui/icons/Account'

interface NavlinksProps {
  user?: any
}

export default function Navlinks({ user }: NavlinksProps) {
  const router = getRedirectMethod() === 'client' ? useRouter() : null

  return (
    <div className="align-center relative flex flex-row justify-between py-4 md:py-6">
      <div className="flex flex-1 items-center">
        <h1>
          <Link
            href="/"
            className={s.logo}
            aria-label="untitled sample library"
          >
            untitled sample library
          </Link>
        </h1>
        <nav className="ml-6 space-x-2 lg:block">
          {user && (
            <Link href="/account" className={s.link}>
              Account
            </Link>
          )}
        </nav>
      </div>
      <div className="flex justify-end space-x-8">
        <button
          type="button"
          aria-label="account"
          aria-controls="account-menu"
          className="flex items-center"
        >
          {user && <div className="bg-red mr-2 h-4 w-4 rounded-full"></div>}
          <div className="h-6 w-6">
            <Account />
          </div>
        </button>

        {user ? (
          <form onSubmit={(e) => handleRequest(e, SignOut, router)}>
            <input type="hidden" name="pathName" value={usePathname()} />
            <button type="submit" className={s.link}>
              Sign out
            </button>
          </form>
        ) : (
          <Link href="/signin" className={s.link}>
            Sign In
          </Link>
        )}
      </div>
    </div>
  )
}
