import React, { useState } from "react";
import axios from "axios";

const CreateMeetingForm = () => {
  const [formData, setFormData] = useState({
    agenda: "",
    attendes: [],
    attendesLead: [],
    location: "",
    related: "",
    dateTime: "",
    notes: "",
    createBy: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "attendes" || name === "attendesLead") {
      setFormData({
        ...formData,
        [name]: value.split(",").map((id) => id.trim()),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/meetings", formData);
      alert("Meeting created!");
      console.log(response.data);
    } catch (err) {
      console.error(err);
      alert("Error creating meeting.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Create Meeting</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="agenda" placeholder="Agenda" onChange={handleChange} className="w-full border p-2 rounded" />
        <input type="text" name="attendes" placeholder="Attendee Contact IDs (comma-separated)" onChange={handleChange} className="w-full border p-2 rounded" />
        <input type="text" name="attendesLead" placeholder="Attendee Lead IDs (comma-separated)" onChange={handleChange} className="w-full border p-2 rounded" />
        <input type="text" name="location" placeholder="Location" onChange={handleChange} className="w-full border p-2 rounded" />
        <input type="text" name="related" placeholder="Related Info" onChange={handleChange} className="w-full border p-2 rounded" />
        <input type="datetime-local" name="dateTime" onChange={handleChange} className="w-full border p-2 rounded" />
        <textarea name="notes" placeholder="Notes" onChange={handleChange} className="w-full border p-2 rounded" />
        <input type="text" name="createBy" placeholder="Created By (User ID)" onChange={handleChange} className="w-full border p-2 rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Create</button>
      </form>
    </div>
  );
};

export default CreateMeetingForm;
