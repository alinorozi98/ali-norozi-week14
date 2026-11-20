
import { useState } from "react"
import Choiss from "./Choiss"
import styles from "./contactList.module.css"

function ContactList({ contacts, removeHandler, editHandler, remove, searchContacts=[], selectedContacts=[] , selectContactHandler }) {
    const [show, setShow] = useState(null)

    const openHandler = (id) => {
        setShow(show === id ? null : id)
    }

    const editClickHandler = (item) => {
        setShow(null)
        editHandler(item)
    }

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
                                        {remove ? (
                                            <input
                                                type="checkbox"
                                                className={styles.selectionCheckbox}
                                                checked={selectedContacts.includes(item.id)}
                                                onChange={() => selectContactHandler(item.id)}
                                            />
                                        ) : (
                                            <>
                                                <button
                                                    className={styles.menuButton}
                                                    onClick={() => openHandler(item.id)}
                                                >
                                                    ...
                                                </button>
                                                {
                                                    show === item.id && (
                                                        <Choiss
                                                            removeHandler={removeHandler}
                                                            editHandler={() => editClickHandler(item)}
                                                            data={item.id}
                                                        />
                                                    )
                                                }
                                            </>
                                        )}
                                    </ul>
                                ))
                            }
                        </div>
                    ) : <p className={styles.text}>مخاطبی پیدا نشد.</p>
                ) : <p className={styles.text}>مخاطبی وجود ندارد</p>
            }
        </div>
    )
}

export default ContactList
