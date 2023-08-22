import ContactItem from 'components/ContactItem';
import PropTypes from 'prop-types';
import cl from 'components/ContactList/contactList.module.css';
import React from 'react';

class ContactList extends React.Component {
  componentDidMount = () => {
    const storedContacts = localStorage.getItem('contacts');
    const newContacts = storedContacts ? JSON.parse(storedContacts) : [];
    this.props.updateContacts(newContacts);
  };

  renderContactList = (state, updateContacts, filteredContacts) => {
    const deleteContact = contactName => {
      const newContacts = state.contacts.filter(
        contact => contact.name !== contactName
      );
      updateContacts(newContacts);
    };

    if (!state.contacts.length) {
      return (
        <p className={cl.emptyMessage}>
          Complete Emptiness {':('}
          <br /> Try to add some contacts to your phonebook
        </p>
      );
    } else if (!filteredContacts.length && state.filter) {
      return (
        <p className={cl.emptyMessage}>
          Sorry, there is no such contact in your phonebook
        </p>
      );
    } else {
      return (
        <ul className={cl.list}>
          {filteredContacts.map(contact => {
            return (
              <ContactItem
                deleteContact={deleteContact}
                key={contact.id}
                name={contact.name}
                number={contact.number}
                url={'https://cdn-icons-png.flaticon.com/128/1177/1177568.png'}
              />
            );
          })}
        </ul>
      );
    }
  };

  render() {
    const { state, updateContacts, filteredContacts } = this.props;

    return this.renderContactList(state, updateContacts, filteredContacts);
  }
}

ContactList.propTypes = {
  state: PropTypes.object.isRequired,
};

export default ContactList;
