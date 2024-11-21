import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/contacts",
});

export const getContacts = () => api.get("/");
export const addContact = (contact) => api.post("/", contact);
export const updateContact = (id, contact) => api.put(`/${id}`, contact);
export const deleteContact = (id) => api.delete(`/${id}`);
