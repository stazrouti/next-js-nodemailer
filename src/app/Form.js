"use client";
import React, { useState, useRef } from 'react';
import { sendMail } from './sendEmail'; // Import the sendMail function

const Home = () => {
  const fileInputRef = useRef();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: '',
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    const files = fileInputRef.current.files;
    const body = new FormData();

    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      body.append('file', element);
    }

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body,
      });
      const data = await response.json();
      setFormData((prevFormData) => ({
        ...prevFormData,
        filename: data.filename,
      }));
      console.log('File uploaded successfully. Filename:', data.filename);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailData = {
      senderName: formData.name,
      senderEmail: formData.email,
      subject: formData.subject,
      text: formData.message,
      html: `<p>Name: ${formData.name}</p><p>Email: ${formData.email}</p><p>Phone: ${formData.phone}</p><p>Message: ${formData.message}</p>`,
      filename: formData.filename, // Assuming you have a filename property from file upload
    };

    try {
      await sendMail(emailData); // Call the sendMail function with emailData
      console.log('Email sent successfully!');
      alert("Email sent successfully!");
    } catch (error) {
      console.error('Error sending email:', error);
      alert("Error sending email");

    }

    // Reset form fields after submission
    /* setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      phone: '',
    }); */
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-md shadow-md">

  {/* File Upload */}
  <input
    type="file"
    multiple
    name="file"
    ref={fileInputRef}
    onChange={onSubmit}
    className="mb-4"
  />

  {/* Form */}
  <form onSubmit={handleSubmit}>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* Full Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Full Name</label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <i className="fas fa-user"></i>
          </span>
          <input
            type="text"
            placeholder="Full name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Email Address */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email Address</label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <i className="fas fa-envelope-open"></i>
          </span>
          <input
            type="text"
            placeholder="Email address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Phone */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <i className="fas fa-phone"></i>
          </span>
          <input
            type="tel"
            placeholder="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* File Upload (if needed) */}
      <div className="mb-4 col-span-2">
        <div className="input-item-upload">
          {/* Customize the file upload UI here if needed */}
        </div>
      </div>

      {/* Message */}
      <div className="col-span-2">
        <label className="block text-sm font-medium text-gray-700">Message</label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <i className="fas fa-pen"></i>
          </span>
          <textarea
            placeholder="Message"
            spellCheck="false"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
          ></textarea>
        </div>
      </div>

    </div>

    {/* Submit Button */}
    <button type="submit" className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300">
      Submit Request
    </button>

  </form>
</div>

  );
};

export default Home;