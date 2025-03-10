import { FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { FaEnvelope } from 'react-icons/fa6';

const Contact = () => {
  return (
    <section className="py-12 min-h-[80vh] bg-[#141c24]">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-4xl text-center text-teal-300">Contact Us</h1>
        <div className="flex items-center mt-8">
          <FaPhoneAlt className="mr-3 text-xl" />
          <a href="tel:9842005729" className="text-teal-300 text-xl">
            9842005729
          </a>
        </div>
        <div className="flex items-center mt-2">
          <FaEnvelope className="mr-3 text-xl" />
          <a href="mailto:myshop@gmail.com" className="text-teal-300 text-xl">
            timilsinab22bi@gmail.com
          </a>
        </div>
        <div className="flex items-center mt-2">
          <FaMapMarkerAlt className="mr-3 text-xl" />
          <a
            href="https://maps.app.goo.gl/1fDawCbifbuRwsqM9"
            className="text-teal-300 text-xl"
            target="_blank"
          >
            NYC, USA
          </a>
        </div>

        <div className="w-full mt-10 bg-[#141c24]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112488.41424420454!2d83.87421665975906!3d28.229697705963677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3995937bbf0376ff%3A0xf6cf823b25802164!2z4KSq4KWL4KSW4KSw4KS-!5e0!3m2!1sne!2snp!4v1728370216562!5m2!1sne!2snp"
            height="600"
            loading="lazy"
            className="w-full"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contact;
