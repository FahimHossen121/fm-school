"use client";
import { useState, useEffect } from "react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  useEffect(() => {
    setResult(null); // Ensure result is only updated on the client
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult({ success: true, message: "Sending..." });

    const body = {
      ...formData,
      access_key: process.env.NEXT_PUBLIC_ACCESS_KEY,
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data.success) {
        setResult({ success: true, message: "Form Submitted Successfully" });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setResult({ success: false, message: data.message });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setResult({
        success: false,
        message: "An error occurred. Please try again.",
      });
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-10 my-10 mx-5 md:mx-20">
        <div className="relative text-center">
          <h1 className="px-4 text-4xl md:text-6xl font-bold">Get in touch</h1>
          <img
            src="/theme_pattern.svg"
            alt="Theme Pattern"
            className="absolute bottom-0 right-0 -z-10 w-20 md:w-auto"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-8 md:gap-20">
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl md:text-6xl font-bold text-[var(--primary)]">
              Let's talk
            </h1>
            <p className="max-w-md text-base md:text-lg text-[var(--muted)] leading-6">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Accusamus amet exercitationem suscipit vel voluptas? Ipsum.
            </p>
            <div className="flex flex-col gap-6 text-base md:text-lg text-[var(--muted)]">
              <div className="flex items-center gap-4">
                <img
                  src="/mail_icon.svg"
                  alt="Mail Icon"
                  className="w-5 md:w-6"
                />
                <p>fahimnahi121@gmail.com</p>
              </div>
              <div className="flex items-center gap-4">
                <img
                  src="/call_icon.svg"
                  alt="Call Icon"
                  className="w-5 md:w-6"
                />
                <p>01879426869</p>
              </div>
              <div className="flex items-center gap-4">
                <img
                  src="/location_icon.svg"
                  alt="Location Icon"
                  className="w-5 md:w-6"
                />
                <p>Dokkhin Gopalpur, Panchbibi, Joypurhat</p>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <label
              htmlFor="name"
              className="text-base md:text-lg text-[var(--muted)] font-medium"
            >
              Your name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full md:w-80 h-12 px-4 bg-[var(--card)] text-[var(--card-foreground)] rounded-md"
              required
            />
            <label
              htmlFor="email"
              className="text-base md:text-lg text-[var(--muted)] font-medium"
            >
              Your Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full md:w-80 h-12 px-4 bg-[var(--card)] text-[var(--card-foreground)] rounded-md"
              required
            />
            <label
              htmlFor="subject"
              className="text-base md:text-lg text-[var(--muted)] font-medium"
            >
              Subject
            </label>
            <input
              type="text"
              name="subject"
              placeholder="Enter your subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full md:w-80 h-12 px-4 bg-[var(--card)] text-[var(--card-foreground)] rounded-md"
              required
            />
            <label
              htmlFor="message"
              className="text-base md:text-lg text-[var(--muted)] font-medium"
            >
              Write your message
            </label>
            <textarea
              name="message"
              rows={6}
              placeholder="Enter your message"
              value={formData.message}
              onChange={handleChange}
              className="w-full md:w-80 h-32 px-4 bg-[var(--card)] text-[var(--card-foreground)] rounded-md"
              required
            ></textarea>
            <button
              type="submit"
              className="self-start bg-[var(--primary)] text-[var(--primary-foreground)] text-base md:text-lg py-3 px-8 rounded-md transition-transform transform hover:scale-105"
            >
              Submit now
            </button>
          </form>
        </div>
        {result && (
          <p
            className={`text-[var(--muted-foreground)] mt-4 ${
              result.success ? "text-green-500" : "text-red-500"
            }`}
          >
            {result.message}
          </p>
        )}
      </div>
    </>
  );
};

export default Contact;
