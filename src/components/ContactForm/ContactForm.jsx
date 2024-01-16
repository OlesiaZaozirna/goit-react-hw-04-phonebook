import { Component } from 'react';
import css from "./ContactForm.module.css"

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };


  handleSubmit = e => {
    e.preventDefault();
    
    if (!this.validateName(this.state.name)) {
      alert('Please enter a valid name');
      return;
    }

    if (!this.validateNumber(this.state.number)) {
      alert('Please enter a valid phone number');
      return;
    }

    const formData = {
      name: this.state.name,
      number: this.state.number,
    };

    this.props.handleAddContact(formData);
    this.setState({
      name: '',
      number: '',
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  
  validateName = name => /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/.test(name);

  validateNumber = number =>
    /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/.test(number);

  render() {
    return (
      <div >
        <form className={css.FormContainer} onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name</label>
          <input className={css.Input}
            type="text"
            placeholder="Contact name"
            name="name"
            id="name"
            required
            value={this.state.name}
            onChange={this.handleChange}
          />

          <label htmlFor="number">Number</label>
          <input className={css.Input}
            type="tel"
            placeholder="Phone number"
            name="number"
            id="number"
            required
            value={this.state.number}
            onChange={this.handleChange}
          />

          <button className={css.SubmitButton} type="submit">Add contact</button>
        </form>
      </div>
    );
  }
}


export default ContactForm;