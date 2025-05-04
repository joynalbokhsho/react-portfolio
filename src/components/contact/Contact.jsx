import "./contact.css";
import { MdAlternateEmail } from "react-icons/md";
import { BsMessenger, BsWhatsapp } from "react-icons/bs";
import React, { useRef, useEffect } from "react";
import emailjs from "emailjs-com";
import AOS from "aos";
import "aos/dist/aos.css";


const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      "service_95tm0vj",
      "template_1ky1plg",
      form.current,
      "pNNhGWrf3OQPee5pT"
    );

    e.target.reset()
  };

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <>
      <section id="contact" data-aos="fade-up">
        <div className="container contact_container">
          <div className="contact_options">
            <article className="contact_option">
              <MdAlternateEmail className="contact_option-icon" />
              <h4>Email</h4>
              <h5>shaownsilva@gmail.com</h5>
              <a href="mailto:shaownsilva@gmail.com">Send a Message</a>
            </article>
            <article className="contact_option">
              <BsMessenger className="contact_option-icon" />
              <h4>Messenger</h4>
              <h5>Joynal Bokhsho</h5>
              <a href="https://m.me/joynal.official">Send a Message</a>
            </article>
            <article className="contact_option">
              <BsWhatsapp className="contact_option-icon" />
              <h4>Whatsapp</h4>
              <h5>+8801721338503</h5>
              <a href="https://api.whatsapp.com/send?phone=+8801721338503">
                Send a Message
              </a>
            </article>
          </div>
          <form ref={form} onSubmit={sendEmail}>
            <input type="text" name="name" placeholder="Your Name" required />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="8"
              required
            ></textarea>
            <button type="submit" className="btn btn-primary">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
