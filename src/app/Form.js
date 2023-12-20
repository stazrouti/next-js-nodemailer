"use client";
import { useState } from 'react';
import { sendMail } from './sendEmail';

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const sendEmail = async () => {
    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        console.log('Email sent successfully');
      } else {
        console.error('Failed to send email:', data.error);
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Assuming sendMail function is available globally or imported
    const emailData = {
      to: 'salah555tazrouti@gmail.com', // Change to the desired email address
      subject: 'Subject of the email',
      text: `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`,
      html: `<p><strong>Name:</strong> ${formData.name}</p><p><strong>Email:</strong> ${formData.email}</p><p><strong>Message:</strong> ${formData.message}</p>`,
    };

    try {
      // Call the sendMail function with emailData
      const result = await sendMail(emailData);

      console.log('Email sent successfully:', result);
    } catch (error) {
      console.error('Failed to send email:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-md shadow-md">
      <form onSubmit={handleFormSubmit}>
      <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-600">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium text-gray-600">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            placeholder="Your message here..."
            value={formData.message}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Send Email
        </button>
      </form>
    </div>
  );
};

export default Form;
