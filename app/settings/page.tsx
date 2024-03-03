import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

const Account = async () => {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // const { data: userDetails } = await supabase
  //   .from('users')
  //   .select('*')
  //   .single()

  if (!user) {
    return redirect('/signin')
  }

  return (
    <section>
      <div className="mx-auto max-w-6xl">
        <h1 className="text-center text-4xl lowercase text-ink">settings</h1>
        <p>email: {user.email}</p>
      </div>
    </section>
  )
}

export default Account
