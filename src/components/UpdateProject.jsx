import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { updateProject } from '../services/blockchain'
import { useGlobalState, setGlobalState } from '../store'

const UpdateProject = ({ project }) => {
  const [updateModal] = useGlobalState('updateModal')
  const [title, setTitle] = useState(project?.title)
  const [description, setDescription] = useState(project?.description)
  const [date, setDate] = useState(project?.date)
  const [imageURL, setImageURL] = useState(project?.imageURL)

  const toTimestamp = (dateStr) => {
    const dateObj = Date.parse(dateStr)
    return dateObj / 1000
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title || !description || !date || !imageURL) return

    const params = {
      id: project?.id,
      title,
      description,
      expiresAt: toTimestamp(date),
      imageURL,
    }

    await updateProject(params)
    toast.success('Project updated successffully, will reflect in 30sec.')
    onClose()
  }

  const onClose = () => {
    setGlobalState('updateModal', 'scale-0')
  }

  return (

    <div
      className={`fixed top-0 left-0 w-screen h-screen flex
  items-center justify-center bg-black bg-opacity-90
  transform transition-transform duration-300 ${updateModal}`}
    >
      <div
        className="bg-white shadow-xl shadow-black
      rounded-xl w-11/12 md:w-2/5 h-1/2 p-6"
      >
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex justify-between items-center ">
            <div className="font-semibold w-full flex justify-between items-center">
              <div className=" text-center text-2xl uppercase w-full">
                Update Project
              </div>
            </div>
            <button
              onClick={onClose}
              type="button"
              className="border-0 bg-transparent focus:outline-none"
            >
              <FaTimes />
            </button>
          </div>
          <div className=' flex flex-row items-center justify-center'>
            <div className="flex justify-center items-center mt-5 w-1/4">
              <div className="rounded-xl overflow-hidden h-20 w-20">
                <img
                  src={
                    imageURL ||
                    'https://png.pngtree.com/png-vector/20210601/ourlarge/pngtree-cancer-cell-cartoon-png-image_3396256.jpg'
                  }
                  alt="project title"
                  className="h-full w-full object-cover cursor-pointer"
                />
              </div>
            </div>
            <div
              className="flex justify-between items-center
        bg-gray-300 rounded-xl mt-5 w-3/4"
            >
              <input
                className="block w-full bg-transparent
          border-0 text-sm text-slate-500 focus:outline-none
          focus:ring-0"
                type="text"
                name="title"
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                required
              />
            </div>
          </div>
          <div className=' flex flex-row items-center justify-center'>


            <div
              className="flex justify-between items-center
        bg-gray-300 rounded-xl mt-5 w-full"
            >
              <input
                className="block w-full bg-transparent
          border-0 text-sm text-slate-500 focus:outline-none
          focus:ring-0"
                type="date"
                name="date"
                placeholder="Expires"
                onChange={(e) => setDate(e.target.value)}
                value={date}
                required
              />
            </div>
          </div>


          <div className=' flex flex-row items-center justify-center'>
            <div
              className="flex justify-between items-center
        bg-gray-300 rounded-xl mt-5 w-1/2 mr-2"
            >
              <input
                className="block w-full bg-transparent
          border-0 text-sm text-slate-500 focus:outline-none
          focus:ring-0"
                type="url"
                name="imageURL"
                placeholder="Image URL"
                onChange={(e) => setImageURL(e.target.value)}
                value={imageURL}
                required
              />
            </div>

            <div
              className="flex justify-between items-center
        bg-gray-300 rounded-xl mt-5 w-1/2"
            >
              <input
                className="block w-full bg-transparent
          border-0 text-sm text-slate-500 focus:outline-none
          focus:ring-0"
                type="text"
                name="description"
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                required
              ></input>
            </div>

          </div>


          <div className=' flex flex-col items-center justify-center mt-8'>
            <button
              type="submit"
              className="inline-block w-1/2 px-6 py-2.5 bg-blue-600
          text-white font-medium text-md leading-tight
          rounded-full shadow-md hover:bg-blue-700 mt-5 uppercase"
            >
              Update Project
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default UpdateProject
