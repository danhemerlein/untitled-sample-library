import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

const Account = async () => {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: userDetails } = await supabase
    .from('users')
    .select('*')
    .single()

  if (!user) {
    return redirect('/signin')
  }

  return (
    <section className="mx-auto max-w-6xl">
      <h1 className="text-center text-4xl lowercase text-ink">profile</h1>
      <ul className="mt-4 flex flex-col gap-4">
        <li>upload</li>
        <li>my samples</li>
        <li>downloaded samples</li>
        <li>packs</li>
      </ul>
    </section>
  )
}

export default Account
