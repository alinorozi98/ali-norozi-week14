
import { useEffect, useState } from "react"
import styles from "./Header.module.css"

const emptyContact = {
    id: "",
    name: "",
    email: "",
    work: "",
    phone: "",
}

function Header() {
    const [contact, setContact] = useState(emptyContact)

    const [contacts, setContacts] = useState(() => {
        const savedContacts = localStorage.getItem("contacts")

        if (savedContacts) {
            try {
                const parsedContacts = JSON.parse(savedContacts)
                return Array.isArray(parsedContacts) ? parsedContacts : []
            } catch {
                return []
            }
        }

        return []
    })

    const [alertName, setAlertName] = useState("")
    const [alertEmail, setAlertEmail] = useState("")
    const [alertPhone, setAlertPhone] = useState("")

    const [add, setAdd] = useState(false)
    const [editId, setEditId] = useState(null)

    const [showEditModal, setShowEditModal] = useState(false)
    const [showAddModal, setShowAddModal] = useState(false)
    const [showSingleDeleteModal, setShowSingleDeleteModal] = useState(false)

    const [singleDeleteId, setSingleDeleteId] = useState(null)

    const [remove, setRemove] = useState(false)
    const [deleteMessage, setDeleteMessage] = useState("")
    const [search, setSearch] = useState("")

    useEffect(() => {
        localStorage.setItem("contacts", JSON.stringify(contacts))
    }, [contacts])

    return (
        <>
            <div className={styles.headers}>
                <label htmlFor="serch">جستجو در مخاطبین : </label>

                <input type="text" id="serch" />

                <span title="انتخاب چند مخاطب برای حذف">
                    ✔️
                </span>

                <span title="افزودن مخاطب">
                    ➕
                </span>
            </div>
        </>
    )
}

export default Header
