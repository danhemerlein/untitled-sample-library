'use client'

import cn from 'classnames'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { handleRequest } from '@/utils/auth-helpers/client'
import { SignOut } from '@/utils/auth-helpers/server'
import { getRedirectMethod } from '@/utils/auth-helpers/settings'

interface AccountMenuProps {
  user?: any
  menuOpen?: boolean
}

const AccountMenu = ({ user, menuOpen }: AccountMenuProps) => {
  const router = getRedirectMethod() === 'client' ? useRouter() : null

  return (
    <div
      id="account-menu"
      aria-hidden={!menuOpen}
      className={cn(
        'transition-cubic-bezier absolute right-0 top-full z-50 flex w-36 flex-col gap-4 border border-solid border-ink bg-ink p-4 text-reverse opacity-0 transition-opacity',
        menuOpen && 'opacity-100',
      )}
    >
      {user ? (
        <>
          <nav className="flex flex-col gap-4 ">
            <Link href="/profile">profile</Link>
            <Link href="/settings">settings</Link>
          </nav>
          <form onSubmit={(e) => handleRequest(e, SignOut, router)}>
            <input type="hidden" name="pathName" value={usePathname()} />
            <button type="submit">sign out</button>
          </form>
        </>
      ) : (
        <>
          <Link href="/signin">sign in</Link>
          <Link href="/signin/signup">sign up</Link>
        </>
      )}
    </div>
  )
}

export default AccountMenu
