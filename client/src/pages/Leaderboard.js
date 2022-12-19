import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { getSpecificUser, getStats } from '../api'
const Leaderboard = () => {
  const [users, setUsers] = useState([])
  const [trophies, setTrophies] = useState([])

  useEffect(() => {
    const getUsersStats = async () => {
      const { data } = await getStats()
      setTrophies(data)

      const getUserData = async (id) => {
        return await getSpecificUser(id)
      }

      const filteredUsers = await Promise.all(
        data.map((user) => getUserData(user.user_id))
      )
      setUsers(filteredUsers)
    }

    getUsersStats()
  }, [])

  console.log(trophies)

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: -50 }}
      className="lg:ml-[300px] mt-36 md:mt-16 p-8 lg:p-12 border-2 border-indigo-500 mx-4 rounded-xl"
    >
      <h2 className="text-gray-300 text-3xl"> Leaderboard </h2>{' '}
      <div>
        <div className="grid grid-cols-3 mt-8">
          <span className="text-xl font-bold text-gray-200">Name</span>
          <span className="text-xl font-bold text-gray-200">Experience</span>
          <span className="text-xl font-bold text-gray-200">Level</span>
        </div>
        {users?.map((user, idx) => (
          <div key={user.data.id} className="grid grid-cols-3 mt-8">
            <div className="flex gap-3 text-xl font-bold text-zinc-400 items-center">
              <div className="flex items-center justify-center w-[36px] h-[36px] rounded-full bg-indigo-500 text-white text-base">
                {user.data.first_name[0]}
                {user.data.last_name[0]}
              </div>
              {user.data.first_name} {user.data.last_name}
            </div>
            <span className="text-xl font-bold text-zinc-400">
              {trophies[idx]?.experience}
            </span>
            <span className="text-xl font-bold text-zinc-400">
              {trophies[idx]?.level}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default Leaderboard
