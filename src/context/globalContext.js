import { createContext, useEffect, useState } from 'react';

export const Context = createContext();

export function GlobalContext({ children }) {
  const initialContacts = JSON.parse(localStorage.getItem('contacts')) || [];

  const [contacts, setContacts] = useState(initialContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contactsJSON = JSON.stringify(contacts);
    localStorage.setItem('contacts', contactsJSON);
  }, [contacts]);

  return (
    <Context.Provider
      value={{
        contacts,
        setContacts,
        filter,
        setFilter,
      }}
    >
      {children}
    </Context.Provider>
  );
}
