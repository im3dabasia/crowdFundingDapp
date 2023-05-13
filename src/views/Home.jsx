import { useEffect } from 'react'
import CreateProject from '../components/CreateProject'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import { loadProjects } from '../services/blockchain'
import { useGlobalState } from '../store'

const Home = () => {
  const [projects] = useGlobalState('projects')

  useEffect(async () => {
    await loadProjects()
  }, [])
  return (
    <div className='flex flex-row'>
      <div className='flex flex-row w-1/2'>
        <div className='w-full'>
          <Hero />
        </div>
      </div>

      <div className='w-1/2'>
        <Projects projects={projects} />
      </div>
      <CreateProject />

    </div>

  )
}

export default Home
