import { FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { FaEnvelope } from 'react-icons/fa6';

const Contact = () => {
  return (
    <section className="py-16 min-h-[80vh] bg-slate-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800">Contact Us</h1>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            We'd love to hear from you. Reach out using any of the methods below or visit us in person.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Contact Information */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">Get In Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="bg-emerald-100 p-3 rounded-full">
                  <FaPhoneAlt className="text-emerald-600 text-xl" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-slate-600">Phone</p>
                  <a href="tel:9842005729" className="text-slate-800 text-lg hover:text-emerald-600 transition-colors">
                    9842005729
                  </a>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-emerald-100 p-3 rounded-full">
                  <FaEnvelope className="text-emerald-600 text-xl" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-slate-600">Email</p>
                  <a href="mailto:happykhusi@gmail.com" className="text-slate-800 text-lg hover:text-emerald-600 transition-colors">
                    happykhusi@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-emerald-100 p-3 rounded-full">
                  <FaMapMarkerAlt className="text-emerald-600 text-xl" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-slate-600">Location</p>
                  <a
                    href="https://maps.app.goo.gl/1fDawCbifbuRwsqM9"
                    className="text-slate-800 text-lg hover:text-emerald-600 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Putalisadak, KTM
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <h3 className="text-xl font-medium text-slate-800 mb-4">Hours of Operation</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-slate-600">Sunday - Friday:</div>
                <div className="text-slate-800">9:00 AM - 6:00 PM</div>
                <div className="text-slate-600">Saturday:</div>
                <div className="text-slate-800">10:00 AM - 4:00 PM</div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">Send Us a Message</h2>
            <form>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-600 mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-600 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Your email"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-600 mb-1">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full bg-emerald-500 text-white py-3 px-6 rounded-md hover:bg-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Map */}
        <div className="w-full mt-12 rounded-lg overflow-hidden shadow-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112488.41424420454!2d83.87421665975906!3d28.229697705963677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3995937bbf0376ff%3A0xf6cf823b25802164!2z4KSq4KWL4KSW4KSw4KS-!5e0!3m2!1sne!2snp!4v1728370216562!5m2!1sne!2snp"
            height="450"
            loading="lazy"
            className="w-full border-0"
            title="Location Map"
            aria-hidden="false"
            ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contact;