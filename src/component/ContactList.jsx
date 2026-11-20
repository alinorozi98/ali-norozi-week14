
import styles from "./contactList.module.css"

function ContactList({
    contacts,
    remove,
    searchContacts = [],
    selectedContacts = [],
    selectContactHandler,
}) {
    const visibleContacts = remove ? contacts : searchContacts

    return (
        <div className={styles.contact}>
            <h3>مخاطبین</h3>

            {
                contacts.length ? (
                    visibleContacts.length ? (
                        <div>
                            {
                                visibleContacts.map((item) => (
                                    <ul key={item.id}>
                                        <li>{item.name}</li>
                                        <li>{item.email}</li>

                                        {remove && (
                                            <input
                                                type="checkbox"
                                                className={styles.selectionCheckbox}
                                                checked={selectedContacts.includes(item.id)}
                                                onChange={() => selectContactHandler(item.id)}
                                            />
                                        )}
                                    </ul>
                                ))
                            }
                        </div>
                    ) : (
                        <p className={styles.text}>
                            مخاطبی پیدا نشد.
                        </p>
                    )
                ) : (
                    <p className={styles.text}>
                        مخاطبی وجود ندارد
                    </p>
                )
            }
        </div>
    )
}

export default ContactList
