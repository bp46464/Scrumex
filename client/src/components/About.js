const About = () => {
  return (
    <section
      id="about"
      className="flex flex-col items-center max-w-[380px] md:max-w-[900px] 
      mx-auto px-6 mt-16 pt-24"
    >
      <div className="h-[3px] w-32 bg-gray-400"></div>
      <h3 className="text-3xl text-center mt-8">What we do</h3>

      <div className="flex flex-col items-center md:flex-row gap-12 mt-12">
        <p className="text-gray-500 md:max-w-[300px]">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet
          ipsum debitis ut impedit quasi nemo exercitationem reprehenderit
          explicabo saepe tenetur veritatis, enim harum labore unde dolor quo
          soluta non nam.
        </p>

        <img
          className="max-w-[270px] h-[270px] mx-auto"
          src="./images/my_app.svg"
          alt="Mobile phone"
        />
      </div>

      <div className="flex flex-col items-center md:flex-row gap-12 mt-12">
        <p className="text-gray-500 md:max-w-[300px] md:order-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
          iusto voluptatum architecto error commodi porro harum! Beatae velit
          officia voluptas corporis ab excepturi eos vitae.
        </p>

        <img
          className="max-w-[270px] h-[270px] mx-auto md:order-1"
          src="./images/engineering_team.svg"
          alt="Engineering team"
        />
      </div>
    </section>
  )
}

export default About
