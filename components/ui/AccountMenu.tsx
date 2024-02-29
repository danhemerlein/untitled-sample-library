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
        'transition-cubic-bezier bg-white absolute right-0 top-full z-50 flex w-36 flex-col gap-4 border border-solid border-ink p-4 text-ink opacity-0 transition-opacity',
        menuOpen && 'opacity-100',
      )}
    >
      {user ? (
        <>
          <nav className="">
            <Link href="/account">account</Link>
          </nav>
          <form onSubmit={(e) => handleRequest(e, SignOut, router)}>
            <input type="hidden" name="pathName" value={usePathname()} />
            <button type="submit">sign out</button>
          </form>
        </>
      ) : (
        <Link href="/signin">sign in</Link>
      )}
    </div>
  )
}

export default AccountMenu
