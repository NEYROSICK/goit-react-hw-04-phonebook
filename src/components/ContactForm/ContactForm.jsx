import React from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import cl from './contactForm.module.css';
import Plus from 'components/ui/icons/Plus';
import clsx from 'clsx';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

Notify.init({
  useIcon: false,
  timeout: 5000,
  fontSize: '14px',
  borderRadius: '20px',
  className: cl.message,
  warning: {
    background: '#ff0066',
    textColor: '#fff',
    childClassName: 'notiflix-notify-warning',
    notiflixIconColor: 'rgba(0,0,0,0.2)',
    fontAwesomeClassName: 'fas fa-exclamation-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
    backOverlayColor: 'rgba(238,191,49,0.2)',
  },
});

export default class ContactForm extends React.Component {
  #INITIAL_STATE = {
    name: '',
    number: '',
  };

  state = {
    ...this.#INITIAL_STATE,
  };

  reset = () => {
    this.setState(() => ({
      ...this.#INITIAL_STATE,
    }));
  };

  checkContactName = () => {
    return this.props.state.contacts.find(contact => {
      return (
        contact.name.trim().toLowerCase() ===
        this.state.name
          .trim()
          .split(' ')
          .filter(word => word !== '')
          .join(' ')
          .toLowerCase()
      );
    });
  };

  checkContactNumber = () => {
    return this.props.state.contacts.find(contact => {
      return (
        contact.number
          .trim()
          .split(' ')
          .filter(num => num !== '')
          .join('') ===
        this.state.number
          .trim()
          .split(' ')
          .filter(num => num !== '')
          .join('')
      );
    });
  };

  checkDuplicates = (nameClone, numberClone) => {
    if (nameClone && numberClone && nameClone.name === numberClone.name) {
      Notify.warning(
        `Maaan, do you lost your eyeballs? Exact same!!! Ok I'll give you another chance ;)`
      );
    } else if (nameClone || numberClone) {
      if (nameClone) {
        Notify.warning(
          `Warning! Contact with name "${nameClone.name}" is already in your phonebook`
        );
      }

      if (numberClone) {
        Notify.warning(
          `Warning! Contact "${numberClone.name}" in your phonebook already has this number: "${numberClone.number}"`
        );
      }
    } else {
      return true;
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    const nameClone = this.checkContactName();
    const numberClone = this.checkContactNumber();

    if (!this.checkDuplicates(nameClone, numberClone)) {
      return;
    }

    const newContact = {
      id: nanoid(),
      name: this.state.name
        .trim()
        .split(' ')
        .filter(word => word !== '')
        .join(' '),
      number: this.state.number,
    };

    this.props.updateContacts([newContact, ...this.props.state.contacts]);
    this.reset();
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <form className={cl.form} onSubmit={this.handleSubmit}>
        <div className={cl.inputContainer}>
          <div className={cl.inputField}>
            <input
              className={clsx(cl.input, cl['name'])}
              type="text"
              name="name"
              id="name"
              pattern="^[a-zA-Zа-яА-ЯІіЇїҐґ' \-\u0400-\u04FF]+$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              onChange={this.handleChange}
              value={this.state.name}
              placeholder="Stepan Bandera"
            />
            <label className={cl.label} htmlFor="name">
              Name
            </label>
          </div>

          <div className={cl.inputField}>
            <input
              className={clsx(cl.input, cl['number'])}
              type="tel"
              name="number"
              id="number"
              pattern="[0-9+\-\(\) ]*"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              onChange={this.handleChange}
              value={this.state.number}
              placeholder="(063) 967-21-44"
            />
            <label className={cl.label} htmlFor="number">
              Number
            </label>
          </div>
        </div>
        <button className={cl.button}>
          <Plus />
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  state: PropTypes.object.isRequired,
  updateContacts: PropTypes.func.isRequired,
};
