import { MailIcon } from '@heroicons/react/solid'

const Contact = () => {
  return (
    <section
      id="contact"
      className="flex flex-col items-center max-w-[380px] md:max-w-[900px] 
      mx-auto px-6 mt-12 pt-24 pb-6"
    >
      <div className="h-[3px] w-32 bg-gray-400"></div>
      <h3 className="text-3xl text-center mt-8">Contact</h3>

      <MailIcon className="w-40" />

      <h5 className="text-gray-500 text-2xl">scrumex@tech.com</h5>
      <h5 className="text-gray-500 text-2xl mt-3">+48 123 456 789</h5>
    </section>
  )
}

export default Contact
