
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

    return (
        <>
            
        </>
    )
}

export default RemoveContact
