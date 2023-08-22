import React from 'react';
import ContactForm from './components/ContactForm';
import Filter from 'components/Filter';
import ContactList from 'components/ContactList';
import Section from 'components/Section';

export default class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  updateContacts = newContacts => {
    this.setState({ contacts: newContacts });
  };

  componentDidUpdate = () => {
    const contactsJSON = JSON.stringify(this.state.contacts);
    localStorage.setItem('contacts', contactsJSON);
  };

  containsNumbers(inputString) {
    const regex = /\d/;
    return regex.test(inputString);
  }

  containsOnlyNumbersRelated(inputString) {
    const regex = /^[\d()\-\s]+$/;
    return regex.test(inputString);
  }

  containsOnlyNumbers(inputString) {
    const regex = /^\d+$/; // Regular expression to match only digits
    return regex.test(inputString);
  }

  filterContacts = () => {
    if (this.containsOnlyNumbersRelated(this.state.filter)) {
      const filteredList = this.state.contacts.filter(contact => {
        const temp =
          contact.number
            .split('')
            .filter(digit => {
              return this.containsOnlyNumbers(digit);
            })
            .join('')
            .includes(this.state.filter) ||
          contact.number
            .split(' ')
            .filter(num => num !== '')
            .join('')
            .includes(
              this.state.filter
                .split(' ')
                .filter(num => num !== '')
                .join('')
            );
        return temp;
      });
      return filteredList;
    } else if (this.containsNumbers(this.state.filter)) {
      return [];
    } else {
      const filteredList = this.state.contacts.filter(contact => {
        return contact.name
          .toLowerCase()
          .includes(this.state.filter.toLowerCase());
      });
      return filteredList;
    }
  };

  handleFilterChange = e => {
    this.setState({ filter: e.target.value });
  };

  render() {
    return (
      <>
        <Section title="Phonebook" variant="phonebook">
          <ContactForm
            state={this.state}
            updateContacts={this.updateContacts}
          />
        </Section>

        <Section title="Contacts" variant="contacts">
          <Filter
            state={this.state}
            handleFilterChange={this.handleFilterChange}
          />
          <ContactList
            state={this.state}
            updateContacts={this.updateContacts}
            filteredContacts={this.filterContacts()}
          />
        </Section>
      </>
    );
  }
}
