import React, { useState, useEffect } from "react";
import ContactForm from "./components/ContactForm";
import ContactsTable from "./components/ContactsTable";
import "./APP.css"; // Import CSS file for styling

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const handleAddSuccess = () => {
    setRefresh(!refresh); // Toggle refresh state
  };

  useEffect(() => {
    // Fetch contacts from the backend
    const fetchContacts = async () => {
      try {
        const response = await fetch("http://localhost:3000/contacts");
        const data = await response.json();
        setContacts(data);
      } catch (err) {
        console.log("Error fetching contacts:", err);
      }
    };

    if (refresh) {
      fetchContacts();
    }
  }, [refresh]);

  return (
    <div className="container">
      <h1
        style={{ textAlign: "center", marginBottom: "20px", color: "#2d3e50" }}
      >
        Contact Management
      </h1>
      <ContactForm onAddSuccess={handleAddSuccess} />
      <ContactsTable contacts={contacts} />
    </div>
  );
};

export default App;
