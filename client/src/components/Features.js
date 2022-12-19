import {
  UserGroupIcon,
  ChartBarIcon,
  DesktopComputerIcon,
} from '@heroicons/react/solid'

const FeaturesCard = () => {
  return (
    <section
      id="features"
      className="flex flex-col items-center max-w-[380px] md:max-w-[900px] mx-auto px-6 mt-32 pt-24"
    >
      <div className="h-[3px] w-32 bg-gray-400"></div>
      <h3 className="text-3xl text-center mt-8">Features</h3>

      <div className="mt-8 max-w-[900px] mx-auto flex flex-col md:flex-row items-center gap-6 p-6">
        <div
          className="flex flex-col gap-6 p-6 rounded-md 
      border-2 border-gray-500 shadow-md shadow-gray-200/20"
        >
          <UserGroupIcon className="w-[50px] h-[50px] mx-auto" />

          <h4 className="font-medium text-xl text-center">Gather People</h4>

          <p className="text-gray-500 font-light text-lg">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem ut
            expedita aliquam. Ratione, iusto soluta.
          </p>
        </div>

        <div
          className="flex flex-col gap-6 p-6 rounded-md 
      border-2 border-gray-500 shadow-md shadow-gray-200/20"
        >
          <ChartBarIcon className="w-[50px] h-[50px] mx-auto" />

          <h4 className="font-medium text-xl text-center">Track progress</h4>

          <p className="text-gray-500 font-light text-lg">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem ut
            expedita aliquam. Ratione, iusto soluta.
          </p>
        </div>

        <div
          className="flex flex-col gap-6 p-6 rounded-md 
      border-2 border-gray-500 shadow-md shadow-gray-200/20"
        >
          <DesktopComputerIcon className="w-[50px] h-[50px] mx-auto" />

          <h4 className="font-medium text-xl text-center">Compete others</h4>

          <p className="text-gray-500 font-light text-lg">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem ut
            expedita aliquam. Ratione, iusto soluta.
          </p>
        </div>
      </div>
    </section>
  )
}

export default FeaturesCard
