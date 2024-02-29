import { createClient } from '@/utils/supabase/server'

import Navlinks from './Navlinks'

const Navbar = async () => {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <nav>
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <Navlinks user={user} />
    </nav>
  )
}

export default Navbar
