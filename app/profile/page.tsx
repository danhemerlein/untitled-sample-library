import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { redirect } from 'next/navigation'

import UploadSample from '@/components/UploadSample'
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

  const userSamples = await supabase
    .from('sampleMeta')
    .select('*')
    .eq('user_id', user.id)

  console.log(userSamples.data)

  return (
    <section className="mx-auto max-w-6xl">
      <h1 className="text-center text-4xl lowercase text-ink">profile</h1>
      <div className="mt-8 flex justify-between">
        <ul className="mt-4 flex flex-col gap-4 border border-solid border-ink p-4">
          <li>upload</li>
          <li>my samples</li>
          <li>downloaded samples</li>
          <li>packs</li>
        </ul>
        <div>
          <UploadSample />
          <div>
            my uploaded samples
            <ul>
              {userSamples.data?.map((sample) => {
                return <li>{sample.name}</li>
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Account
