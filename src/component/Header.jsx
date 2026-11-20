
import { useEffect, useState } from "react"
import styles from "./Header.module.css"

const emptyContact = {
    id: "",
    name: "",
    email: "",
    work: "",
    phone: "",
}

const convertToEnglish = (value) => {
    return value
        .replace(/[۰-۹]/g, (number) => "۰۱۲۳۴۵۶۷۸۹".indexOf(number))
        .replace(/[٠-٩]/g, (number) => "٠١٢٣٤٥٦٧٨٩".indexOf(number))
}

const isValidEmail = (email) => {
    const cleanEmail = email.trim()
    const atPosition = cleanEmail.indexOf("@")
    const dotPosition = cleanEmail.lastIndexOf(".")

    return (
        atPosition > 0 &&
        atPosition === cleanEmail.lastIndexOf("@") &&
        dotPosition > atPosition + 1 &&
        dotPosition < cleanEmail.length - 2 &&
        !cleanEmail.includes(" ")
    )
}

const isValidPhone = (phone) => {
    const englishPhone = convertToEnglish(phone.trim())
    const onlyNumbers = englishPhone.split("").every(number => "0123456789".includes(number))

    return englishPhone.length === 11 && englishPhone.startsWith("09") && onlyNumbers
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


const serchHandler = (event) => {
    setSearch(event.target.value)
}

const serchValue = search.toLowerCase().trim()

const searchContacts = contacts.filter((item) => {
    const itemName = (item.name ?? "").toLowerCase()
    const itemEmail = (item.email ?? "").toLowerCase()

    return itemName.includes(serchValue) || itemEmail.includes(serchValue)
})

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
