import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setError("All fields are required");
    } else {
      emailjs
        .sendForm("service_e463fz3", "template_tr4818s", form.current, {
          publicKey: "3MPJrActUjpDB29GM",
        })
        .then(
          () => {
            setSuccess("Sending message Successfully! Wait for the response!!");
            setName("");
            setEmail("");
            setMessage("");
          },
          (error) => {
            setError(error.text);
          }
        );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="h-screen w-full md:h-[550px] md:w-[550px] flex flex-col justify-center p-8 rounded gap-10">
        <div className="flex justify-center items-center">
          <h1 className="text-black text-3xl mb-4 font-semibold">
            GET IN TOUCH
          </h1>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <form ref={form} onSubmit={sendEmail}>
          <div className="flex items-center justify-center flex-col gap-2">
            <input
              type="text"
              placeholder="Your Name"
              className="border-2  rounded p-4 mb-4 w-full"
              name="from_name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Your Email"
              className="border-2 border-gray-300 rounded p-4 mb-4 w-full"
              value={email}
              name="from_email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
              placeholder="Message"
              name="message"
              className="border-2 border-gray-300 rounded p-4 mb-4 w-full h-[150px]"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              type="submit"
              className="bg-gray-500 w-full text-white px-4 py-4 rounded hover:bg-gray-600 transition-colors duration-300"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
