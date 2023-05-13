import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ContributeProject from '../components/ContributeProject'
import DeleteProject from '../components/DeleteProject'
import ProjectBackers from '../components/ProjectBackers'
import ProjectDetails from '../components/ProjectDetails'
import UpdateProject from '../components/UpdateProject'
import { getBackers, loadProject } from '../services/blockchain'
import { useGlobalState } from '../store'

const Project = () => {
  const { id2 } = useParams()
  const [loaded, setLoaded] = useState(false)
  const [project] = useGlobalState('project')
  const [backers] = useGlobalState('backers')

  useEffect(async () => {
    await loadProject(id2)
    await getBackers(id2)
    setLoaded(true)
  }, [])
  return loaded ? (
    <div className='flex flex-row '>
      <div className='w-1/2'>
        <ProjectDetails project={project} />
      </div>
      <div className='w-1/2'>
        {/* <ProjectDetails project={project} /> */}
        <ProjectBackers backers={backers} />
        
      </div>

      <UpdateProject project={project} />
      <DeleteProject project={project} />
      <ContributeProject project={project} />
    </div>
  ) : null
}

export default Project
