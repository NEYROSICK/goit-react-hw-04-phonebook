import ContactForm from './components/ContactForm';
import Filter from 'components/Filter';
import ContactList from 'components/ContactList';
import Section from 'components/Section';

export default function App() {
  return (
    <>
      <Section title="Phonebook" variant="phonebook">
        <ContactForm />
      </Section>

      <Section title="Contacts" variant="contacts">
        <Filter />
        <ContactList />
      </Section>
    </>
  );
}
