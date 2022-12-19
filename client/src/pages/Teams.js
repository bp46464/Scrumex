import { useState } from 'react'

import { AiOutlinePlus } from 'react-icons/ai'
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti'
import { FaUserAlt } from 'react-icons/fa'
import { CreateTeamModal } from '../components'
import { motion } from 'framer-motion'

const TeamDetails = ({ name }) => {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: -50 }}
      className="p-3 bg-indigo-100 max-w-[1300px] rounded-lg shadow-md shadow-gray-200/20"
    >
      <div>
        <div className="flex gap-3 items-center">
          {' '}
          {open ? (
            <TiArrowSortedUp
              onClick={() => setOpen(!open)}
              className="text-indigo-600 cursor-pointer text-3xl"
            />
          ) : (
            <TiArrowSortedDown
              onClick={() => setOpen(!open)}
              className="text-indigo-600 cursor-pointer text-3xl"
            />
          )}{' '}
          {name}{' '}
        </div>{' '}
      </div>{' '}
      {open && (
        <>
          <div className="grid grid-cols-2 gap-3 mt-8 pl-11">
            <div className="flex flex-col gap-3 text-lg text-gray-500 font-regular">
              <div> Department </div> <div> Backend development </div>{' '}
            </div>{' '}
            <div className="flex flex-col gap-3 text-lg text-gray-500 font-regular">
              <div> Sprint duration </div> <div> 14 </div>{' '}
            </div>{' '}
          </div>{' '}
          <div className="mt-10 pl-11">
            <h3 className="text-3xl text-gray-700"> Members </h3>{' '}
            <div className="flex flex-wrap text-xl gap-8 mt-4">
              {' '}
              {['Adam Nowak', 'Jan Kowalski', 'Krystian Węglowodan'].map(
                (member) => (
                  <div key={member} className="">
                    {/* <FaUserAlt className="text-4xl text-gray-700" /> */}
                    <span> {member} </span>{' '}
                  </div>
                )
              )}{' '}
            </div>{' '}
          </div>{' '}
          <button className="flex ml-12 my-4 items-center gap-2 text-lg px-8 py-2 bg-indigo-800 text-gray-300 rounded-3xl cursor-pointer font-medium transition-all hover:scale-105">
            SEE DETAILS
          </button>
        </>
      )}{' '}
    </motion.div>
  )
}

const Teams = () => {
  const [openModal, setOpenModal] = useState(false)

  const handleCreateTeam = () => {
    setOpenModal(true)
  }

  return (
    <>
      {' '}
      {openModal && <CreateTeamModal setOpenModal={setOpenModal} />}{' '}
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -50 }}
        className="lg:ml-[300px] mt-36 md:mt-16 p-8 lg:p-12 border-2 border-indigo-500 mx-4 rounded-xl"
      >
        <h2 className="text-gray-300 text-3xl"> Teams </h2>{' '}
        <div className="flex mt-8">
          <button
            className="flex ring-2 ring-slate-800 ring-offset-1 ring-offset-indigo-100/[.55] items-center gap-2 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg cursor-pointer font-semibold transition-all hover:scale-105"
            onClick={handleCreateTeam}
          >
            <AiOutlinePlus className="inline-block text-2xl" /> Create Team{' '}
          </button>{' '}
        </div>{' '}
        <div className="flex flex-col gap-6 mt-8 text-gray-700 font-bold text-2xl">
          {' '}
          {['Front-End Developers', 'Management', 'Back-End Developers'].map(
            (name) => (
              <TeamDetails key={name} name={name} />
            )
          )}{' '}
        </div>{' '}
      </motion.div>{' '}
    </>
  )
}

export default Teams
