import { useState, useEffect } from 'react'
import { FaEthereum } from 'react-icons/fa'
import Identicon from 'react-identicons'
import Moment from 'react-moment'
import { truncate } from '../store'
import { GoArrowUp } from 'react-icons/go'
import { toast } from 'react-toastify'
import { voteProject } from '../services/blockchain'
import {
  useParams
} from "react-router-dom";

const ProjectBackers = ({ backers }) => {
  return (

    <div className="flex flex-col justify-center w-full items-center  px-10  mt-28">
      <div
        className="
        shadow-md r ounded-md w-full mb-10"
      >

        <table className="min-w-full">
          <thead className="border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium
                px-6 py-4 text-left"
              >
                Backer
              </th>
              <th
                scope="col"
                className="text-sm font-medium
                px-6 py-4 text-left"
              >
                Donations
              </th>
              <th
                scope="col"
                className="text-sm font-medium
                px-6 py-4 text-left"
              >
                Refunded
              </th>
              <th
                scope="col"
                className="text-sm font-medium
                px-6 py-4 text-left"
              >
                Time
              </th>
              <th
                scope="col"
                className="text-sm font-medium
                px-6 py-4 text-left"
              >
                Vote status
              </th>
              <th
                scope="col"
                className="text-sm font-medium
                px-6 py-4 text-left"
              >

                Vote now
              </th>
            </tr>
          </thead>
          <tbody>
            {backers.map((backer, i) => (
              <Backer key={i} backer={backer} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const Backer = ({ backer }) => {
  let { id } = useParams();
  const [projectID, setProjectID] = useState("");

  useEffect(() => {
    setProjectID(id)
    console.log(id)
  }, [id])

  return (
    <tr className="border-b border-gray-200">
      {console.log(projectID)}
      <td
        className="text-sm font-light
      px-6 py-4 whitespace-nowrap"
      >
        <div className="flex justify-start items-center space-x-2">
          <Identicon
            className="h-10 w-10 object-contain rounded-full shadow-md"
            string={backer.owner}
            size={25}
          />
          <span>{truncate(backer.owner, 4, 4, 11)}</span>
        </div>
      </td>
      <td
        className="text-sm font-light
                  px-6 py-4 whitespace-nowrap"
      >
        <small className="flex justify-start items-center space-x-1">
          <FaEthereum />
          <span className="text-gray-700 font-medium">
            {backer.contribution} ETH
          </span>
        </small>
      </td>
      <td
        className="text-sm font-light
      px-6 py-4 whitespace-nowrap"
      >
        {backer.refunded ? 'Yes' : 'No'}
        {console.log(backer)}
      </td>
      <td
        className="text-sm font-light
      px-6 py-4 whitespace-nowrap"
      >
        <Moment fromNow>{backer.timestamp}</Moment>
      </td>
      <td
        className="text-sm font-light
      px-6 py-4 whitespace-nowrap"
      >
        {backer.voted ? 'Voted' : 'Not Voted'}

      </td>
      <td
        className="text-sm font-light
      px-6 py-4 whitespace-nowrap"
      >

        {!backer.voted &&
          <button
            type="button"
            className="flex justify-center items-center w-9 h-9 bg-blue-600
              text-white font-medium text-xs leading-tight uppercase
              rounded-full shadow-md hover:bg-blue-700"
            onClick={ async(e) => {
              e.preventDefault()
              console.log(backer.owner + " " + projectID )
              await voteProject(projectID, backer.owner)
              toast.success('User voted successfully, will reflect in 30sec.')

            }}
          >
            <GoArrowUp className='font-bold' size={20} />
          </button>
        }

      </td>



    </tr>
  )
}

export default ProjectBackers
