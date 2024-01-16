import css from "./ContactList.module.css"

export const ContactList = ({ handleDeleteContact, state }) => {
  return (
    <ul className={css.ContactListContainer}>
      {state.map(({ id, name, number }) => (
          <li className={css.ContactListItem} key={id}>
          {name}: {number}
          <button className={css.Delete} onClick={() => handleDeleteContact(id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};