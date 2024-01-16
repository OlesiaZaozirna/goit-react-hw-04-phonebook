import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import css from "./App.module.css"

import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import ContactForm  from './ContactForm/ContactForm.jsx';


class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem("my-contact"));
    if (contacts?.length) { // аналог запису (contacts && contacts.length) - якщо змінна contacts існує, то дізнаємось в неї властивість length 
      this.setState({
        contacts,
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts.length !== contacts.length) {
      //console.log("update contacts")
      localStorage.setItem("my-contacts", JSON.stringify(this.state.contacts));
    }
  }

  handleAddContact = formData => {
    const { contacts } = this.state;
    const hasDuplicate = contacts.some(
      contact => contact.name.toLowerCase() === formData.name.toLowerCase()
    );

    if (hasDuplicate) {
      alert(`${formData.name} is already in contacts`);
      return;
    }

    const newContact = { ...formData, id: nanoid() };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  handleDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  handleFindChange = e => {
    const value = e.target.value;
    this.setState({ filter: value });
  };

  filterContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const filteredContactList = this.filterContacts();

    return (
      <div className={css.AppWrapper}>
        <div className={css.PhoneWrapper}>
        <h2 className={css.AppTitle}>Phonebook</h2>
          <ContactForm handleAddContact={this.handleAddContact} />
        </div>
        
        <div className={css.ContactsWrapper}>
        <h2 className={css.AppTitle}>Contacts</h2>
        <Filter state={this.state} handleFindChange={this.handleFindChange} />
        <ContactList
          state={filteredContactList}
          handleDeleteContact={this.handleDeleteContact}
          />
          </div>
      </div>
    );
  }
}

export default App;