import Link from 'next/link'

const linkStyle = {
  marginRight: 15
}

export default function Header() {
  return (
    <div>
      <Link as={process.env.localBasePath} href="/">
        <a style={linkStyle}>Home</a>
      </Link>
      <Link as={process.env.localBasePath + '/about'} href="/about">
        <a style={linkStyle}>About</a>
      </Link>
    </div>
  )
}
