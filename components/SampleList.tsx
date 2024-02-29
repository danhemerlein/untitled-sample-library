import { createClient } from '@/utils/supabase/server'

import Download from './ui/icons/Download'
import Play from './ui/icons/Play'
import Plus from './ui/icons/Plus'

const SampleList = async () => {
  const supabase = createClient()

  const { data, error } = await supabase.storage.from('samples').list('', {
    limit: 100,
  })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const DownloadClickHandler = () => {
    if (!user) {
    }
  }

  return (
    <div className="mt-8">
      <ul className="grid grid-cols-5 gap-2">
        {data?.map((sample) => {
          const { data } = supabase.storage
            .from('samples')
            .getPublicUrl(sample.name)
          console.log(data.publicUrl)

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

              <div className="absolute left-4 top-2 flex w-[calc(100%-2rem)] items-center justify-between">
                <p>{sample.name}</p>

                <div>
                  <button>
                    <div className="h-[24px] w-[24px]">
                      <Download />
                    </div>
                  </button>

                  <button>
                    <div className="h-[24px] w-[24px]">
                      <Plus />
                    </div>
                  </button>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default SampleList
