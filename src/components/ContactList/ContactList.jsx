import ContactItem from 'components/ContactItem';
import cl from 'components/ContactList/contactList.module.css';
import React, { useContext } from 'react';
import { Context } from 'context/globalContext';

const ContactList = () => {
  const { contacts, filter, setContacts } = useContext(Context);

  const containsNumbers = inputString => {
    const regex = /\d/;
    return regex.test(inputString);
  };

  const containsOnlyNumbersRelated = inputString => {
    const regex = /^[\d()\-\s]+$/;
    return regex.test(inputString);
  };

  const containsOnlyNumbers = inputString => {
    const regex = /^\d+$/; // Regular expression to match only digits
    return regex.test(inputString);
  };

  const filterContacts = () => {
    if (containsOnlyNumbersRelated(filter)) {
      const filteredList = contacts.filter(contact => {
        const temp =
          contact.number
            .split('')
            .filter(digit => {
              return containsOnlyNumbers(digit);
            })
            .join('')
            .includes(filter) ||
          contact.number
            .split(' ')
            .filter(num => num !== '')
            .join('')
            .includes(
              filter
                .split(' ')
                .filter(num => num !== '')
                .join('')
            );
        return temp;
      });
      return filteredList;
    } else if (containsNumbers(filter)) {
      return [];
    } else {
      const filteredList = contacts.filter(contact => {
        return contact.name.toLowerCase().includes(filter.toLowerCase());
      });
      return filteredList;
    }
  };

  const renderContactList = () => {
    const deleteContact = contactName => {
      const newContacts = contacts.filter(
        contact => contact.name !== contactName
      );
      setContacts(newContacts);
    };

    if (!contacts.length) {
      return (
        <p className={cl.emptyMessage}>
          Complete Emptiness {':('}
          <br /> Try to add some contacts to your phonebook
        </p>
      );
    } else if (!filterContacts().length && filter) {
      return (
        <p className={cl.emptyMessage}>
          Sorry, there is no such contact in your phonebook
        </p>
      );
    } else {
      return (
        <ul className={cl.list}>
          {filterContacts().map(contact => {
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

  return renderContactList();
};

export default ContactList;
