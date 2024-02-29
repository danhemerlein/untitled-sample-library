import { ReactNode } from 'react'

interface Props {
  title: string
  description?: string
  footer?: ReactNode
  children: ReactNode
}

const Card = ({ title, description, footer, children }: Props) => (
  <div className=" m-auto mt-4 w-full max-w-3xl rounded-md border border-ink">
    <div className="px-5 py-4">
      <h3 className="text-xl font-medium">{title}</h3>
      <p className="text-ink">{description}</p>
      {children}
    </div>
    {footer && (
      <div className="rounded-b-md border-t border-ink bg-ink p-4 text-ink">
        {footer}
      </div>
    )}
  </div>
)

export default Card
