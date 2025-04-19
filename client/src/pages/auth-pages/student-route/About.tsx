const About = () => {
  return (
    <section className="bg-slate-50">
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* About Us Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          <div className="max-w-lg">
            <h2 className="text-3xl font-extrabold text-slate-800 sm:text-4xl">
              About us
            </h2>
            <p className="mt-4 text-slate-600 text-lg">
              Welcome to Hostel Hive, where comfort meets community in the heart of Kathmandu. 
              Since 2018, we've been providing travelers, students, and digital nomads with a home away from home. 
              Our hostel was founded on the principle that quality accommodation shouldn't break the bank, 
              and that the best travel experiences come from the connections you make along the way.
            </p>
            <p className="mt-4 text-slate-600 text-lg">
              Our modern facilities, warm hospitality, and vibrant community spaces create the perfect 
              environment for both short-term stays and extended residences. We take pride in our clean, 
              comfortable rooms, high-speed internet, and thoughtfully designed common areas that encourage 
              interaction among our diverse guests.
            </p>
            <div className="mt-8">
              <a
                href="#"
                className="text-emerald-600 hover:text-emerald-500 font-medium flex items-center"
              >
                Learn more about us
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 ml-2" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </a>
            </div>
          </div>
          <div className="mt-12 md:mt-0">
            <img
              src="https://www.thehivehostels.com/uploads/images/1658301040_7796f3aa4d7819a2f5d5.jpeg"
              alt="Hostel Hive Common Area"
              className="object-cover rounded-lg shadow-md w-full h-full"
            />
          </div>
        </div>
        
        {/* Additional Information */}
        <div className="mt-16">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Strategic Location & Community Focus</h3>
            <p className="text-slate-600">
              Strategically located in Putalisadak, we offer easy access to Kathmandu's major attractions, 
              educational institutions, and business districts. Our multilingual staff is always ready to help 
              you navigate the city, recommend hidden gems, or assist with any needs during your stay. 
              Whether you're visiting for a few days or settling in for months, Hostel Hive isn't just 
              accommodation—it's a gateway to Nepali culture and a global community.
            </p>
            
            <div className="mt-8 border-t border-slate-100 pt-8">
              <blockquote className="italic text-slate-600 border-l-4 border-emerald-500 pl-4">
                "Hostel Hive isn't just where I stayed in Kathmandu—it's where I found my second family. 
                The facilities are excellent, but it's the community that makes this place truly special."
                <footer className="mt-2 text-slate-800 font-medium not-italic">- Sarah J., Digital Nomad from Canada</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-slate-100 mt-16">
        <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="relative isolate overflow-hidden rounded-3xl bg-emerald-500 px-6 py-24 text-center shadow-xl">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl">
              Experience the Hostel Hive Difference
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white">
              Join our growing community of global travelers, students, and professionals who have discovered 
              the perfect balance of privacy, comfort, and connection. Our flexible booking options and 
              affordable rates make it easy to find the right accommodation for your needs. No complicated 
              contracts or hidden fees—just simple, straightforward hospitality that puts you first.
            </p>
            <div className="isolate mt-8 flex items-center justify-center -space-x-2 overflow-hidden">
              <img
                className="relative z-30 inline-block h-10 w-10 rounded-full ring-2 ring-white"
                src="https://randomuser.me/api/portraits/men/34.jpg"
                alt="User 1"
              />
              <img
                className="relative z-20 inline-block h-10 w-10 rounded-full ring-2 ring-white"
                src="https://randomuser.me/api/portraits/women/34.jpg"
                alt="User 2"
              />
              <img
                className="relative z-10 inline-block h-10 w-10 rounded-full ring-2 ring-white"
                src="https://randomuser.me/api/portraits/men/4.jpg"
                alt="User 3"
              />
              <img
                className="relative z-0 inline-block h-10 w-10 rounded-full ring-2 ring-white"
                src="https://randomuser.me/api/portraits/women/3.jpg"
                alt="User 4"
              />
              <span className="ml-4 font-medium italic text-white">
                Join these awesome members
              </span>
            </div>
            <div className="mt-12 flex items-center justify-center gap-x-6">
              <button
                type="button"
                className="relative inline-flex items-center gap-x-2 rounded-lg bg-white px-6 py-4 font-semibold text-emerald-600 shadow-sm hover:bg-sky-300 hover:text-white transition-colors duration-300"
              >
                <span className="absolute -top-5 left-0 w-full text-left text-xs italic text-white">
                  No Obligations
                </span>
                Join Now
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <svg
              viewBox="0 0 1024 1024"
              className="absolute left-1/2 top-1/2 -z-10 h-full w-full -translate-x-1/2 -translate-y-1/2 opacity-20"
              aria-hidden="true"
            >
              <circle
                cx={512}
                cy={512}
                r={512}
                fill="url(#gradient-pattern)"
                fillOpacity="0.7"
              />
              <defs>
                <radialGradient id="gradient-pattern">
                  <stop stopColor="#fff" />
                  <stop offset={1} stopColor="#fff" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;