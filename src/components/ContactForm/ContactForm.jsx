import { useState } from 'react';
import { nanoid } from 'nanoid';
import css from "./ContactForm.module.css"

const ContactForm = ({handleAddContact})=> {
 const [formData, setFormData] = useState ({
    name: '',
    number: '',
  });

  const { name, number } = formData;
  
  const handleSubmit = e => {
    e.preventDefault();
    
    if (!validateName(name)) {
      alert('Please enter a valid name');
      return;
    }

    if (!validateNumber(number)) {
      alert('Please enter a valid phone number');
      return;
    }

    const newContact = { ...formData, id: nanoid() };

    handleAddContact(newContact);
    setFormData({ name: '', number: '' });
  };
  

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };
  
  const validateName = name => /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/.test(name);

  const validateNumber = number =>
    /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/.test(number);

      return (
      <div >
        <form className={css.FormContainer} onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input className={css.Input}
            type="text"
            placeholder="Contact name"
            name="name"
            id="name"
            required
            value={name}
            onChange={handleChange}
          />

          <label htmlFor="number">Number</label>
          <input className={css.Input}
            type="tel"
            placeholder="Phone number"
            name="number"
            id="number"
            required
            value={number}
            onChange={handleChange}
          />

          <button className={css.SubmitButton} type="submit">Add contact</button>
        </form>
      </div>
    );
  }



export default ContactForm;