import Identicons from 'react-identicons'
import { FaEthereum } from 'react-icons/fa'
import {
  daysRemaining,
  setGlobalState,
  truncate,
  useGlobalState,
} from '../store'
import { payoutProject } from '../services/blockchain'
import { getVoteStatus, voteProject, getBackers } from '../services/blockchain'
import { useState, useEffect } from 'react'

const ProjectDetails = ({ project, backers }) => {
  const [connectedAccount] = useGlobalState('connectedAccount')
  const expired = new Date().getTime() > Number(project?.expiresAt + '000')
  const [votingStatus, setVotingStatus] = useState(false);
  const [backers1, setBackers1] = useState([]);
  const [voteTemp, setVoteTemp] = useState(false);

  const getVS = async () => {
    let tmp = await getVoteStatus(0, 0);
    setVoteTemp(tmp);
  }
  const getBackersInfo = async () => {
    let tmp = await getBackers();

    setBackers1(tmp);
  }
  useEffect(() => {
    getVS();
    getBackersInfo();
  }, [voteTemp, backers])

  useEffect(() => {
    getVS();
    getBackersInfo()
  }, [])

  return (
    <div className="pt-24 mb-5 px-6 flex flex-col items-center justify-center">
      <div className="flex justify-center w-1/2 h-1/2">
        <div
          className="flex justify-start items-start
        sm:space-x-4 flex-wrap"
        >
          <img
            src={project?.imageURL}
            alt={project?.title}
            className="rounded-xl h-64 object-cover  w-full"
          />


        </div>


      </div>
      <div className="flex justify-center  w-5/6 h-1/2">
        <div className="flex-1 sm:py-0 py-4">
          <div className="flex flex-col justify-start flex-wrap">
            <h5 className="text-gray-900 text-2xl text-center font-medium my-2">
              {project?.title}
            </h5>
            <div className="text-gray-500 text-2xl text-center my-2">
              {expired
                ? 'Expired'
                : daysRemaining(project.expiresAt) + ' left'}
            </div>
          </div>

          <div className="flex justify-between items-center w-full pt-1">
            <div className="flex justify-start space-x-2 my-2">
              <Identicons
                className="rounded-full shadow-md"
                string={project?.owner}
                size={15}
              />
              {project?.owner ? (
                <div className="text-gray-700 text-2xl">
                  {truncate(project?.owner, 4, 4, 11)}
                </div>
              ) : null}
              <div className="text-gray-500 font-bold text-2xl">
                {project?.backers} Backer{project?.backers == 1 ? '' : 's'}
              </div>
            </div>

            <div className="font-bold">
              {expired ? (
                <div className="text-red-500 text-2xl">Expired</div>
              ) : project?.status == 0 ? (
                <div className="text-gray-500 text-2xl">Open</div>
              ) : project?.status == 1 ? (
                <div className="text-blue-500 text-2xl">Accepted</div>
              ) : project?.status == 2 ? (
                <div className="text-gray-500 text-2xl">Reverted</div>
              ) : project?.status == 3 ? (
                <div className="text-red-500 text-2xl">Deleted</div>
              ) : (
                <div className="text-orange-500">Paid</div>
              )}
            </div>
          </div>

          <div>
            <p className="text-2xl font-light mt-2">Description : {project?.description}</p>
            <div className="w-full overflow-hidden bg-gray-300 mt-4">
              <div
                className="bg-blue-600 text-2xl font-medium
              text-blue-100 text-center p-0.5 leading-none
              rounded-l-full h-1 overflow-hidden max-w-full"
                style={{
                  width: `${(project?.raised / project?.cost) * 100}%`,
                }}
              ></div>
            </div>

            <div className="flex justify-between items-center font-bold mt-2">
              <div className='text-2xl text-center'>{project?.raised} ETH Raised</div>
              <div className="flex justify-start items-center">
                <FaEthereum />
                <span>{project?.cost} ETH</span>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center space-x-2 mt-16">
              <div>
                {project?.status == 0 ? (
                  <button
                    type="button"
                    className="inline-block px-6 py-2.5 bg-blue-600
              text-white font-medium leading-tight uppercase
              rounded-full shadow-md hover:bg-blue-700 text-2xl mx-2"
                    onClick={() => setGlobalState('backModal', 'scale-100')}
                  >
                    Contribute
                  </button>
                ) : null}

                {connectedAccount == project?.owner ? (
                  project?.status != 3 ? (
                    project?.status == 1 ? (
                      <button
                        type="button"
                        className="inline-block px-6 py-2.5 bg-orange-600
                        text-white font-medium leading-tight uppercase
                        rounded-full shadow-md hover:bg-orange-700 text-2xl mx-2"
                        onClick={() => payoutProject(project?.id)}
                      >
                        Payout
                      </button>
                    ) : project?.status != 4 ? (
                      <>
                        <button
                          type="button"
                          className="inline-block px-6 py-2.5 bg-gray-600
                          text-white font-medium leading-tight uppercase
                          rounded-full shadow-md hover:bg-gray-700 text-2xl mr-2"
                          onClick={() =>
                            setGlobalState('updateModal', 'scale-100')
                          }
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="inline-block px-6 py-2.5 bg-red-600
                          text-white font-medium  leading-tight uppercase
                          rounded-full shadow-md hover:bg-red-700 text-2xl"
                          onClick={() =>
                            setGlobalState('deleteModal', 'scale-100')
                          }
                        >
                          Delete
                        </button>

                      </>
                    ) : (
                      <button
                        type="button"
                        className="inline-block px-6 py-2.5 bg-gray-600
                        text-white font-medium text-xs leading-tight uppercase
                        rounded-full shadow-md hover:bg-gray-700"
                      >
                        Project Closed
                      </button>
                    )
                  ) : null
                ) : null}
                {backers && backers[0].length > 0 &&
                  <button
                    type="button"
                    className="inline-block px-6 py-2.5 bg-red-600
                          text-white font-medium leading-tight uppercase
                          rounded-full shadow-md hover:bg-red-700 text-2xl"
                    onClick={async () => {
                      setVoteTemp(!voteTemp)
                      await voteProject(0, 0)

                    }
                    }
                  >
                    Voting Status
                  </button>
                }
              </div>
              <div>
                <p className='text-2xl mt-4'>{voteTemp ? "Vote Casted" : "Vote Now "}</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetails
