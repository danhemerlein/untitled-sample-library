'use client'
import { useState } from 'react'

import { createClient } from '@/utils/supabase/client'

const UploadSample = async () => {
  const [file, setFile] = useState()
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const handleOnChange = async (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList
    }

    const sampleFile = target.files[0]
    const { data, error } = await supabase.storage
      .from('samples')
      .upload(`${target.files[0].name}`, sampleFile, {
        cacheControl: '3600',
        upsert: false,
      })

    const insertData = { user_id: user.id, sample_id: data.id, name: data.path }
    const insertResponse = await supabase.from('sampleMeta').insert(insertData)
  }

  return (
    <input
      onChange={handleOnChange}
      type="file"
      name="sample"
      multiple
      accept="audio/*"
    />
  )
}

export default UploadSample
