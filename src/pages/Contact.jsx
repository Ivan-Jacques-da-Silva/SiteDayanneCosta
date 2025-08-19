import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { buildApiUrl } from "../config/api";
import styles from "./Contact.module.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    preferenciaHorario: "", // '', 'AM' ou 'PM'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const nome = `${formData.firstName}`.trim();
      const sobrenome = `${formData.lastName}`.trim();
      const email = `${formData.email}`.trim().toLowerCase();
      const telefone = `${formData.phone}`.trim();
      const msg = `${formData.message}`.trim();

      if (!nome || !sobrenome || !email || !telefone || !msg) {
        setSubmitMessage("Please fill in all required fields.");
        setIsSubmitting(false);
        return;
      }
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        setSubmitMessage("Invalid email address.");
        setIsSubmitting(false);
        return;
      }

      const mensagemFinal = formData.preferenciaHorario
        ? `${msg}\n\nBest time to contact you: ${formData.preferenciaHorario}`
        : msg;

      let data;
      try {
        const resp = await fetch(buildApiUrl("/api/emails/contact"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: nome,
            lastName: sobrenome,
            email,
            phone: telefone,
            message: mensagemFinal,
          }),
        });

        if (!resp.ok) {
          const texto = await resp.text().catch(() => "");
          throw new Error(texto || `HTTP ${resp.status}`);
        }
        data = await resp.json().catch(() => ({}));
      } catch (err) {
        setSubmitMessage("Failed to send the message. Please try again.");
        console.error("Erro no envio:", err);
        return;
      }

      if (data?.success) {
        setSubmitMessage("Message sent successfully! We’ll contact you soon.");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
          preferenciaHorario: "",
        });
      } else {
        setSubmitMessage(
          "Error sending message." + (data?.message ? ` ${data.message}` : ""),
        );
      }
    } catch (error) {
      setSubmitMessage("Failed to send the message. Please try again.");
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.contactPage}>
      <Header />

      <div className={styles.hero}>
        <div className={styles.heroOverlay}>
          <div className={styles.heroContent}>
            <h1>Contact</h1>
            <div className={styles.breadcrumb}>
              <span>Home</span>
              <span className={styles.separator}>&gt;</span>
              <span>Contact</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.container}>
          <div className={styles.contactSection}>
            <div className={styles.leftSection}>
              <h2>Contact</h2>

              <div className={styles.contactDetails}>
                <div className={styles.contactItem}>
                  <span className={styles.contactValue}>+1 (646) 598-3588</span>
                </div>

                <div className={styles.contactItem}>
                  <span className={styles.contactValue}>
                    dayannecosta@compass.com
                  </span>
                </div>

                <div className={styles.contactItem}>
                  <span className={styles.contactValue}>
                    2550 South Bayshore Drive, Suite 106, Miami, FL 33133
                  </span>
                </div>
              </div>

              <div className={styles.mapSection}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3594.5937842847!2d-80.22634092462877!3d25.724440377368477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b7b2b2b2b2b3%3A0x3f3f3f3f3f3f3f3f!2s2550%20S%20Bayshore%20Dr%20%23106%2C%20Miami%2C%20FL%2033133%2C%20USA!5e0!3m2!1sen!2sus!4v1652000000000!5m2!1sen!2sus"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className={styles.mapIframe}
                ></iframe>
              </div>
            </div>

            <div className={styles.rightSection}>
              <div className={styles.contactForm}>
                <form onSubmit={handleSubmit}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name *"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name *"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email *"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone *"
                        value={formData.phone}
                        onChange={handleInputChange}
                        pattern="\+?\d[\d\s\-()]{7,}"
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <textarea
                      name="message"
                      placeholder="Message"
                      rows="6"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className={styles.checkboxGroup}>
                    <label className={styles.checkboxLabel}>
                      Best Time to Reach You
                    </label>
                    <div className={styles.checkboxOptions}>
                      <label className={styles.checkboxOption}>
                        <input
                          type="radio"
                          name="preferenciaHorario"
                          value="AM"
                          checked={formData.preferenciaHorario === "AM"}
                          onChange={handleInputChange}
                        />{" "}
                        am
                      </label>
                      <label className={styles.checkboxOption}>
                        <input
                          type="radio"
                          name="preferenciaHorario"
                          value="PM"
                          checked={formData.preferenciaHorario === "PM"}
                          onChange={handleInputChange}
                        />{" "}
                        pm
                      </label>
                    </div>
                  </div>

                  {submitMessage && (
                    <div 
                      className={styles.submitMessage}
                      data-type={
                        submitMessage.includes('successfully') || submitMessage.includes('**Success**') 
                          ? 'success' 
                          : submitMessage.includes('**Failed**') || submitMessage.includes('Failed') || submitMessage.includes('Error')
                          ? 'error'
                          : ''
                      }
                    >
                      {submitMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
