import { GrMoney } from 'react-icons/gr'
import { Link } from 'react-router-dom'
import { connectWallet } from '../services/blockchain'
import { truncate, useGlobalState } from '../store'

const Header = () => {
  const [connectedAccount] = useGlobalState('connectedAccount')

  return (
    <header
      className="flex justify-between items-center
        p-5 bg-white shadow-lg fixed top-0 left-0 right-0"
    >
      <Link
        to="/"
        className="flex justify-start items-center
      text-xl space-x-1 px-6 py-2.5 bg--600
      text-white font-medium  leading-tight uppercase
      rounded-full shadow-md hover:bg-blue-700"
      >
        <span >AUFunds</span>
        <GrMoney />
      </Link>

      <div className="flex space-x-2 justify-center">
        {connectedAccount ? (
          <button
            type="button"
            className="inline-block px-6 py-2.5 bg-blue-600
            text-white font-medium text-xl leading-tight uppercase
            rounded-full shadow-md hover:bg-blue-700"
          >
            {truncate(connectedAccount, 5, 5, 13)}
          </button>
        ) : (
          <button
            type="button"
            className="inline-block px-6 py-2.5 bg-blue-600
            text-white font-medium text-xs leading-tight uppercase
            rounded-full shadow-md hover:bg-blue-700"
            onClick={connectWallet}
          >
            Connect to  Wallet
          </button>
        )}
      </div>
    </header>
  )
}

export default Header
