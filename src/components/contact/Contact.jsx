import "./contact.css";
import { MdAlternateEmail } from "react-icons/md";
import { BsMessenger, BsWhatsapp } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import React, { useRef, useEffect, useState } from "react";
import emailjs from "emailjs-com";
import AOS from "aos";
import "aos/dist/aos.css";

const Contact = () => {
  const form = useRef();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ""
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setFormStatus({ submitted: true, success: false, message: "Sending..." });

    emailjs.sendForm(
      "service_95tm0vj",
      "template_1ky1plg",
      form.current,
      "pNNhGWrf3OQPee5pT"
    ).then(
      (result) => {
        setFormStatus({
          submitted: true,
          success: true,
          message: "Message sent successfully!"
        });
        setFormData({ name: "", email: "", message: "" });
        e.target.reset();
        
        // Reset form status after 5 seconds
        setTimeout(() => {
          setFormStatus({ submitted: false, success: false, message: "" });
        }, 5000);
      },
      (error) => {
        setFormStatus({
          submitted: true,
          success: false,
          message: "Something went wrong. Please try again."
        });
      }
    );
  };

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <>
      <section id="contact" data-aos="fade-up">
        <div className="contact_header">
          <div className="contact_title">
            <h5 className="text-light">Get In Touch</h5>
            <h2>Contact Me</h2>
          </div>
          <button 
            className="collapse_toggle" 
            onClick={toggleCollapse}
            aria-expanded={!isCollapsed}
            aria-label={isCollapsed ? "Expand contact section" : "Collapse contact section"}
          >
            {isCollapsed ? <BiChevronDown /> : <BiChevronUp />}
          </button>
        </div>
        
        <div className={`container contact_container ${isCollapsed ? 'collapsed' : ''}`}>
          <div className="contact_options">
            <h3>Let's Connect</h3>
            <p className="contact_intro">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
            </p>
            
            <article className="contact_option">
              <div className="contact_option-icon">
                <MdAlternateEmail />
              </div>
              <div className="contact_option-content">
                <h4>Email</h4>
                <h5>shaownsilva@gmail.com</h5>
                <a href="mailto:shaownsilva@gmail.com" className="contact-link">Send a Message <span>→</span></a>
              </div>
            </article>
            
            <article className="contact_option">
              <div className="contact_option-icon">
                <BsMessenger />
              </div>
              <div className="contact_option-content">
                <h4>Messenger</h4>
                <h5>Joynal Bokhsho</h5>
                <a href="https://m.me/joynal.official" className="contact-link">Send a Message <span>→</span></a>
              </div>
            </article>
            
            <article className="contact_option">
              <div className="contact_option-icon">
                <BsWhatsapp />
              </div>
              <div className="contact_option-content">
                <h4>WhatsApp</h4>
                <h5>+8801721338503</h5>
                <a href="https://api.whatsapp.com/send?phone=+8801721338503" className="contact-link">
                  Send a Message <span>→</span>
                </a>
              </div>
            </article>
          </div>
          
          <div className="contact_form-wrapper">
            <h3>Send Me a Message</h3>
            <form ref={form} onSubmit={sendEmail} className="contact_form">
              <div className="form_group">
                <label htmlFor="name">Your Name</label>
                <input 
                  type="text" 
                  id="name"
                  name="name" 
                  placeholder="Enter your name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="form_group">
                <label htmlFor="email">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form_group">
                <label htmlFor="message">Your Message</label>
                <textarea
                  name="message"
                  id="message"
                  placeholder="Write your message here"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary send-btn" disabled={formStatus.submitted && !formStatus.message.includes("wrong")}>
                {formStatus.submitted ? (
                  formStatus.success ? "Message Sent!" : formStatus.message
                ) : (
                  <>Send Message <FiSend /></>
                )}
              </button>
              
              {formStatus.submitted && (
                <div className={`form_status ${formStatus.success ? "success" : "error"}`}>
                  {formStatus.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
