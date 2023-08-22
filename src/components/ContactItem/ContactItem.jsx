import PropTypes from 'prop-types';
import cl from './contactitem.module.css';
import Trash from 'components/ui/icons/Trash';
import clsx from 'clsx';

const ContactItem = ({ name, number, deleteContact, url }) => {
  return (
    <li className={cl.item}>
      <div className={cl.imgName}>
        <img className={cl.image} src={url} alt={name} />
        <p className={clsx(cl.name, cl['desktop'])}>{name}</p>
      </div>
      <div className={cl.mobile}>
        <p className={cl.name}>{name}</p>
        <a className={cl.number} href={'tel:' + number}>
          {number}
        </a>
      </div>
      <div className={cl.numBtn}>
        <a className={clsx(cl.number, cl['desktop'])} href={'tel:' + number}>
          {number}
        </a>
        <button
          className={cl.button}
          onClick={() => {
            deleteContact(name);
          }}
        >
          <Trash />
        </button>
      </div>
    </li>
  );
};

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

export default ContactItem;
