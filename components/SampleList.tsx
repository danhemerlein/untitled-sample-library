import { createClient } from '@/utils/supabase/server'

import Play from './ui/icons/Play'
import SampleActions from './SampleActions'

const SampleList = async () => {
  const supabase = createClient()

  const { data, error } = await supabase.storage.from('samples').list('', {
    limit: 100,
  })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="mt-8">
      <ul className="grid grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-5">
        {data?.map((sample) => {
          const { data } = supabase.storage
            .from('samples')
            .getPublicUrl(sample.name)

          return (
            <li
              className="relative flex min-h-[260px] flex-col items-center justify-center border border-solid border-ink p-4 text-center"
              key={sample.id}
            >
              <a
                className="block h-[25%] w-[25%]"
                href={data.publicUrl}
                target="_blank"
                rel="noreferrer"
              >
                <Play />
              </a>

              <div className="absolute left-4 top-2 flex w-[calc(100%-2rem)] flex-col items-start md:flex-row md:items-center md:justify-between">
                <p className="text-sm">{sample.name}</p>
                <SampleActions user={user} publicUrl={data.publicUrl} />
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default SampleList
