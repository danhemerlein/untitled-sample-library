import Link from 'next/link'

const SignInWithEmailPasswordLink = ({ href, cta }) => {
  return (
    <p>
      <Link
        href="/signin/password_signin"
        className="dotted-link text-sm lowercase"
      >
        sign in with email and password
      </Link>
    </p>
  )
}

export default SignInWithEmailPasswordLink
