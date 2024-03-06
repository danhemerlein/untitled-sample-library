import Link from 'next/link'

interface AuthLinkProps {
  href: string
  cta: string
}

const AuthLink = ({ href, cta }: AuthLinkProps) => {
  return (
    <p>
      <Link href={href} className="dotted-link text-sm lowercase">
        {cta}
      </Link>
    </p>
  )
}

export default AuthLink
