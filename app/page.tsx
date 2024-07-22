"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { db } from "./firebase"; // Adjust the path according to your project structure
import { collection, addDoc } from "firebase/firestore";

export default function Home() {
  const [formData, setFormData] = useState({
    senderEmail: "",
    name: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    console.log("Firebase Project ID:", process.env.projectId);

    try {
      // Add a new document to the 'emails' collection
      await addDoc(collection(db, "form"), {
        name: formData.name,
        email: formData.senderEmail,
        message: formData.message,
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="absolute top-4 left-4 text-lg font-bold">
        Valyria Studio
      </div>
      <div>
        <h1 className="text-6xl"> Ellis Test Support</h1>
      </div>
      {isSubmitted ? (
        <div className="text-green-500 text-xl pb-60">
          Your form was submitted successfully!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              required
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="senderEmail"
            >
              Email
            </label>
            <input
              required
              id="senderEmail"
              name="senderEmail"
              type="email"
              value={formData.senderEmail}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              required
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </main>
  );
}
