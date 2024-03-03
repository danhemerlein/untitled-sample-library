'use client'

import { useRouter } from 'next/navigation'

import { handleRequest } from '@/utils/auth-helpers/client'
import { handleDownloadRequest } from '@/utils/auth-helpers/server'

import Download from './ui/icons/Download'
import Plus from './ui/icons/Plus'
import { useToast } from './ui/Toasts/use-toast'
interface SampleActionsProps {
  user: any
}

const SampleActions = ({ user, id }: SampleActionsProps) => {
  const { toast, toasts } = useToast()
  const router = useRouter()

  const handleDownloadClick = async (e) => {
    if (!user) {
      toast({
        title: 'error!',
        description: 'you have to be signed in to download samples.',
        variant: 'destructive',
      })
      return
    }

    await handleRequest(e, handleDownloadRequest, router)
  }

  const handleAddToPack = () => {
    if (!user) {
      toast({
        title: 'error!',
        description: 'you have to be signed in to add samples to packs.',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="flex items-center justify-center gap-1">
      <form onSubmit={(e) => handleDownloadClick(e)}>
        <button type="submit" className="block cursor-pointer">
          <div className="h-[24px] w-[24px]">
            <Download />
          </div>
        </button>
      </form>

      <button onClick={handleAddToPack}>
        <div className="h-[24px] w-[24px]">
          <Plus />
        </div>
      </button>
    </div>
  )
}

SampleActions.propTypes = {}

export default SampleActions
