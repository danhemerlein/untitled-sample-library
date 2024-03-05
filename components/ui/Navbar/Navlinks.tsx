'use client'

import { useCallback, useRef, useState } from 'react'
import Link from 'next/link'

import AccountMenu from '@/components/ui/AccountMenu'
import Account from '@/components/ui/icons/Account'
import UseClickOutside from '@/hooks/UseClickOutside'

interface NavlinksProps {
  user?: any
}

const NavLinks = ({ user }: NavlinksProps) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleModal = () => setMenuOpen(!menuOpen)
  const closeMenu = () => setMenuOpen(false)

  const headerRef = useRef()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleClickOutside = useCallback(() => closeMenu(), [headerRef])

  UseClickOutside(headerRef, handleClickOutside)

  return (
    <div
      className="align-center relative flex flex-row justify-between py-4 md:py-6"
      ref={headerRef}
    >
      <div className="flex flex-1 items-center">
        <h1>
          <Link href="/" aria-label="untitled sample library">
            untitled sample library 🍃
          </Link>
        </h1>
      </div>

      <div className="flex items-center justify-end gap-4">
        <Link href="/blog" aria-label="">
          blog
        </Link>

        <Link href="/about" aria-label="">
          about
        </Link>

        <button
          type="button"
          aria-label="account"
          aria-controls="account-menu"
          className="flex items-center"
          onClick={toggleModal}
        >
          {user && <div className="mr-2 h-4 w-4 rounded-full bg-red"></div>}
          <div className="h-6 w-6">
            <Account />
          </div>
        </button>
        <AccountMenu user={user} menuOpen={menuOpen} />
      </div>
    </div>
  )
}

export default NavLinks
