import React, { useState, useEffect  } from 'react';
import { nanoid } from 'nanoid';
import css from "./App.module.css"

import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import ContactForm  from './ContactForm/ContactForm.jsx';


const App =()=> {
  const [contacts, setContacts] = useState([
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
   ]);
  const [filter, setFilter] = useState('');

  useEffect(() =>{
    const storedContacts = JSON.parse(localStorage.getItem("my-contact"));
    if (storedContacts?.length) { 
      setContacts(storedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("my-contacts", JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = formData => {
      setContacts(prevContacts => {
      const hasDuplicate = contacts.some(
      contact => contact.name.toLowerCase() === formData.name.toLowerCase()
    );

    if (hasDuplicate) {
      alert(`${formData.name} is already in contacts`);
      return prevContacts;
    }

    const newContact = { ...formData, id: nanoid() };

        return [...prevContacts, newContact];
         });
};

  const handleDeleteContact = id => {
     setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
  };

  const handleFindChange = e => {
    const value = e.target.value;
    setFilter(value);
  };

  const filterContacts = () => {
      return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const filteredContactList = filterContacts();
  
     return (
      <div className={css.AppWrapper}>
        <div className={css.PhoneWrapper}>
        <h2 className={css.AppTitle}>Phonebook</h2>
          <ContactForm handleAddContact={handleAddContact} />
        </div>
        
        <div className={css.ContactsWrapper}>
        <h2 className={css.AppTitle}>Contacts</h2>
        <Filter state={filter} handleFindChange={handleFindChange} />
        <ContactList
          state={filteredContactList}
          handleDeleteContact={handleDeleteContact}
          />
          </div>
      </div>
    );
  }

export default App;