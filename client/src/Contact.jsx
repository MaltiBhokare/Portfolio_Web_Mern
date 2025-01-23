import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isLoading, setIsLoading] = useState(false); // Loading state

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Frontend validation
        if (!formData.name || !formData.email || !formData.message) {
            alert("Please fill out all fields.");
            return;
        }

        setIsLoading(true); // Start loading

        try {
            const response = await fetch("https://portfolio-web-mern-63tzjtfp2-maltibhokares-projects.vercel.app//contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Message sent successfully!");
                setFormData({ name: "", email: "", message: "" });
            } else {
                const errorData = await response.json();
                alert(`Failed to send message: ${errorData.message || "Unknown error"}`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error sending message. Please try again later.");
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    return (
        <section id="contact" className="contact-section">
            <div className="contact-container">
                <h1 className="contact-heading">Get in Touch</h1>
                <p className="contact-description">
                    Have a project or just want to say hello? Drop a message below and I'll get back to you as soon as I can!
                </p>

                <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-field">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="contact-input"
                            placeholder="Your Name"
                            required
                        />
                    </div>
                    <div className="form-field">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="contact-input"
                            placeholder="Your Email"
                            required
                        />
                    </div>
                    <div className="form-field">
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="contact-textarea"
                            placeholder="Your Message"
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="contact-btn" disabled={isLoading}>
                        {isLoading ? "Sending..." : "Send Message"}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Contact;
