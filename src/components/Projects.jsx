import Identicons from 'react-identicons'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { truncate, daysRemaining } from '../store'
import { FaEthereum } from 'react-icons/fa'

const Projects = ({ projects }) => {
  const [end, setEnd] = useState(4)
  const [count] = useState(4)
  const [collection, setCollection] = useState([])

  const getCollection = () => projects.slice(0, end)

  useEffect(() => {
    setCollection(getCollection())
  }, [projects, end])

  return (
    <div className="flex flex-col px-6 mt-16 mb-7">
      <div className="flex justify-center items-center flex-wrap">
        {collection.map((project, i) => (
          <ProjectCard key={i} project={project} />
        ))}
      </div>

      {projects.length > collection.length ? (
        <div className="flex justify-center items-center my-5">
          <button
            type="button"
            className="inline-block px-6 py-2.5 bg-green-600
          text-white font-medium text-xs leading-tight uppercase
          rounded-full shadow-md hover:bg-green-700"
            onClick={() => {setEnd(end + count)}}
          >
            Load more
          </button>
        </div>
      ) : null}
    </div>
  )
}

const ProjectCard = ({ project }) => {
  const expired = new Date().getTime() > Number(project?.expiresAt + '000')

  return (
    <div id="projects" className="rounded-lg shadow-lg bg-white w-80 m-8">
      <Link to={'/projects/' + project.owner + '/uniqueID/' + project.id}>
        {console.log("Dhruv " + JSON.stringify(project))}
        <img
          src={project.imageURL}
          alt={project.title}
          className="rounded-xl h-64 w-full object-cover"
        />

        <div className="p-4">
          <h5 className='text-2xl text-center'>{truncate(project.title, 25, 0, 28)}</h5>

          <div className="flex flex-col">
            <div className="flex justify-start space-x-2 items-center mb-3">
              <Identicons
                className="rounded-full shadow-md "
                string={project.owner}
                size={15}
              />  
              <div className="text-gray-700 text-2xl text-center">
                {truncate(project.owner, 8, 8, 22)}
              </div>
            </div>

            <div className="text-gray-500 text-2xl text-center">
              {expired ? 'Expired' : daysRemaining(project.expiresAt) + ' left'}
            </div>
          </div>

          <div className="w-full bg-gray-300 overflow-hidden">
            <div
              className="bg-green-600 text-xs font-medium
            text-green-100 text-center p-0.5 leading-none
            rounded-l-full"
              style={{ width: `${(project.raised / project.cost) * 100}%` }}
            ></div>
          </div>

          <div
            className="flex justify-between items-center 
        font-bold mt-1 mb-2 text-gray-700"
          >
            <div className='text-2xl text-center'>{project.raised} ETH Raised</div>
            <div className="flex justify-start items-center">
              <FaEthereum />
              <span className='text-2xl text-center'>{project.cost} ETH</span>
            </div>
          </div>

          <div
            className="flex justify-between items-center flex-wrap
            mt-4 mb-2 text-gray-500 font-bold"
          >
            <div className='text-2xl text-center'>
              {project.backers} Backer{project.backers == 1 ? '' : 's'}
            </div>
            <div className='text-2xl text-center'>
              {expired ? (
                <div className="text-red-500">Expired</div>
              ) : project?.status == 0 ? (
                <div className="text-gray-500">Open</div>
              ) : project?.status == 1 ? (
                <div className="text-green-500">Accepted</div>
              ) : project?.status == 2 ? (
                <div className="text-gray-500">Reverted</div>
              ) : project?.status == 3 ? (
                <div className="text-red-500">Deleted</div>
              ) : (
                <div className="text-orange-500">Paid</div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Projects
