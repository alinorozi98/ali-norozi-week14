
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
            
        </>
    )
}

export default RemoveContact
