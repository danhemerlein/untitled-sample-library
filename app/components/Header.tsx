import Account from "./Account"

const Header = () => {
  return (
    <div className="flex justify-between py-4">
      <h1>untitled sample library 🍃</h1>
      <div className="h-6 w-6">
        <Account />
      </div>
    </div>
  )
}


export default Header


