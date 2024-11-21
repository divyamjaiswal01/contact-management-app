import axios from "axios";

const api = axios.create({
  baseURL: "https://your-deployed-backend-url.com/contacts", // Use your backend's deployed URL
});


export const getContacts = () => api.get("/");
export const addContact = (contact) => api.post("/", contact);
export const updateContact = (id, contact) => api.put(`/${id}`, contact);
export const deleteContact = (id) => api.delete(`/${id}`);
