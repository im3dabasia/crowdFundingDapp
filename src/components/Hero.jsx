import { setGlobalState, useGlobalState } from '../store'
const Hero = () => {
  const [stats] = useGlobalState('stats')

  return (
    <div className="flex flex-row text-center bg-white text-gray-800 py-24 px-6">
      <div className='flex flex-col'>
        <h1
          className="text-5xl md:text-6xl xl:text-7xl font-bold
      tracking-tight mb-12"
        >
          <span className="capitalize">Your gateway to funding the next big thing</span>
          <br />
          <span className="uppercase text-blue-600">AuFunds.</span>
        </h1>
        <div className="flex justify-center items-center space-x-2">
          <button
            type="button"
            className="inline-block px-6 py-2.5 bg-blue-600
        text-white font-medium text-xs leading-tight uppercase
        rounded-full shadow-md hover:bg-blue-700"
            onClick={() => setGlobalState('createModal', 'scale-100')}
          >
            Add Project
          </button>

          <button
            type="button"
            className="inline-block px-6 py-2.5 border border-blue-600
        font-medium text-xs leading-tight uppercase text-blue-600
        rounded-full shadow-md bg-transparent hover:bg-blue-700
        hover:text-white"
          >
            Back Projects
          </button>
        </div>
      </div>

      <div className='w-1/2 flex justify-center items-center'>
        <div className="flex flex-col w-1/2 justify-center items-center mt-10">
          <div
            className="flex flex-row justify-center items-center
          h-20 border shadow-md w-full"
          >
            <span
              className="text-2xl font-bold text-blue-900
            leading-5"
            >
              {stats?.totalProjects  || 0}
            </span>
            <span className='text-2xl'>&nbsp; Projects</span>
          </div>
          <div
            className="flex flex-row justify-center items-center
          h-20 border shadow-md w-full"
          >
            <span
              className="text-2xl font-bold text-blue-900
            leading-5"
            >
              {stats?.totalBacking || 0}
            </span>
            <span className="text-2xl"> &nbsp; Backings</span>
          </div>
          <div
            className="flex flex-row justify-center items-center
          h-20 border shadow-md w-full"
          >
            <span
              className="text-2xl font-bold text-blue-900
            leading-5"
            >
              {stats?.totalDonations || 0} ETH
            </span>
            <span className="text-2xl"> &nbsp;Donated</span>
          </div>
        </div>

      </div>






    </div>
  )
}

export default Hero
