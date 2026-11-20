
import { useState } from "react"
import ContactList from "./ContactList"
import styles from "./Header.module.css"

function RemoveContact({
    contacts,
    setContacts,
    search,
    serchHandler,
    searchContacts,
    addHandler,
    onClose,
    setDeleteMessage,
}) {

    const [selectedContacts, setSelectedContacts] = useState([])
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const selectContactHandler = (id) => {
        setSelectedContacts(selectedContacts => {
            if (selectedContacts.includes(id)) {
                return selectedContacts.filter(item => item !== id)
            }

            return [...selectedContacts, id]
        })
    }

const bulkRemoveHandler = () => {
    if (selectedContacts.length > 0) {
        setShowDeleteModal(true)
    }
}

const confirmBulkRemoveHandler = () => {
    const deletedCount = selectedContacts.length

    setContacts(contacts =>
        contacts.filter(item => !selectedContacts.includes(item.id))
    )

    setSelectedContacts([])
    setShowDeleteModal(false)
    setDeleteMessage(`${deletedCount} مخاطب حذف شد`)
    onClose()
}


   
return (
    <>
        <div className={styles.headers}>
            <label htmlFor="serch">جستجو در مخاطبین : </label>

            <input
                type="text"
                id="serch"
                onChange={serchHandler}
                value={search}
            />

            <span
                onClick={bulkRemoveHandler}
                className={selectedContacts.length ? styles.activeIcon : styles.disabledIcon}
                title="حذف مخاطبین انتخاب‌شده"
            >
                👤−
            </span>

            <span onClick={onClose} title="بازگشت">
                🔙
            </span>

            <span onClick={addHandler} title="افزودن مخاطب">
                ➕
            </span>
        </div>

        <ContactList
            contacts={contacts}
            remove={true}
            searchContacts={searchContacts}
            selectedContacts={selectedContacts}
            selectContactHandler={selectContactHandler}
        />

        {showDeleteModal && (
            <div className={styles.modalBox}>
                <div className={styles.modal}>
                    <p>
                        شما در حال حذف گروهی چند نفر از مخاطبانتان هستید!
                    </p>

                    <p>آیا مطمئن هستید؟</p>

                    <div className={styles.modalButtons}>
                        <button
                            className={styles.cancelButton}
                            onClick={() => setShowDeleteModal(false)}
                        >
                            انصراف
                        </button>

                        <button
                            className={styles.deleteButton}
                            onClick={confirmBulkRemoveHandler}
                        >
                            حذف
                        </button>
                    </div>
                </div>
            </div>
        )}
    </>
)

}

export default RemoveContact
