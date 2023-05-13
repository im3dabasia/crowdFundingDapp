import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { createProject } from '../services/blockchain'
import { useGlobalState, setGlobalState } from '../store'

const CreateProject = () => {
  const [createModal] = useGlobalState('createModal')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [cost, setCost] = useState('')
  const [date, setDate] = useState('')
  const [imageURL, setImageURL] = useState('')

  const toTimestamp = (dateStr) => {
    const dateObj = Date.parse(dateStr)
    return dateObj / 1000
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(1)

    if (!title || !description || !cost || !date || !imageURL) return

    const params = {
      title,
      description,
      cost,
      expiresAt: toTimestamp(date),
      imageURL,
    }
    console.log("22", params)
    await createProject(params)
    console.log(2)
    toast.success('Project created successfully, will reflect in 30sec.')
    console.log(3)
    onClose()
  }

  const onClose = () => {
    setGlobalState('createModal', 'scale-0')
    reset()
  }

  const reset = () => {
    setTitle('')
    setCost('')
    setDescription('')
    setImageURL('')
    setDate('')
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex
    items-center justify-center bg-black bg-opacity-90
    transform transition-transform duration-300 ${createModal}`}
    >
      <div
        className="bg-white shadow-xl shadow-black
        rounded-xl w-11/12 md:w-2/5 h-1/2 p-6"
      >
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex justify-between items-center ">
            <div className="font-semibold w-full flex justify-between items-center">
              <div className=" text-center text-2xl uppercase w-full">
                Add Project
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
          bg-gray-300 rounded-xl mt-5 w-1/2 mr-2"
            >
              <input
                className="block w-full bg-transparent
            border-0 text-sm text-slate-500 focus:outline-none
            focus:ring-0"
                type="number"
                step={0.01}
                min={0.01}
                name="cost"
                placeholder="cost (ETH)"
                onChange={(e) => setCost(e.target.value)}
                value={cost}
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


          <div className=' flex flex-col items-center justify-center'>
            <button
              type="submit"
              className="inline-block w-1/2 px-6 py-2.5 bg-blue-600
            text-white font-medium text-md leading-tight
            rounded-full shadow-md hover:bg-blue-700 mt-5 uppercase"
            >
              Submit Project
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default CreateProject
