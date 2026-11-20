
import { useEffect, useState } from "react"
import styles from "./Header.module.css"
import { v4 } from "uuid"

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

const addHandler = () => {
    setRemove(false)
    setContact(emptyContact)
    setEditId(null)
    setAlertName("")
    setAlertEmail("")
    setAlertPhone("")
    setAdd(add => !add)
}

const editHandler = (selectedContact) => {
    setRemove(false)
    setContact({ ...selectedContact })
    setEditId(selectedContact.id)
    setAlertName("")
    setAlertEmail("")
    setAlertPhone("")
    setAdd(true)
}

const cancelHandler = () => {
    setAdd(false)
    setShowEditModal(false)
    setShowAddModal(false)
    setContact(emptyContact)
    setEditId(null)
    setAlertName("")
    setAlertEmail("")
    setAlertPhone("")
}

const showHandler = (event) => {
    const { name, value } = event.target

    setContact(contact => ({
        ...contact,
        [name]: value,
    }))

    if (name === "name") {
        if (value.trim() === "") {
            setAlertName("لطفا نام مخاطب را وارد کنید.")
        } else if (value.trim().length < 7) {
            setAlertName("لطفا حداقل 7 کاراکتر وارد کنید.")
        } else {
            setAlertName("")
        }
    }

    if (name === "email") {
        if (value.trim() === "") {
            setAlertEmail("لطفا ایمیل مخاطب را وارد کنید.")
        } else if (!isValidEmail(value)) {
            setAlertEmail("یک ایمیل معتبر وارد کنید.")
        } else {
            setAlertEmail("")
        }
    }

    if (name === "phone") {
        if (!isValidPhone(value)) {
            setAlertPhone("شماره معتبر وارد کنید.")
        } else {
            setAlertPhone("")
        }
    }
}

const phoneNumber = convertToEnglish(contact.phone)

const nameIsValid = contact.name.trim().length >= 7
const emailIsValid = isValidEmail(contact.email)
const workIsValid = contact.work.trim() !== ""
const phoneIsValid = isValidPhone(contact.phone)

const isFormValid = nameIsValid && emailIsValid && workIsValid && phoneIsValid

const addedHandler = () => {
    if (!isFormValid) {
        return
    }

    if (editId) {
        setShowEditModal(true)
    } else {
        setShowAddModal(true)
    }
}

const confirmAddHandler = () => {
    const newContact = {
        ...contact,
        phone: phoneNumber,
        id: v4(),
    }

    setContacts(contacts => [...contacts, newContact])
    setDeleteMessage("1 مخاطب اضافه شد")
    setShowAddModal(false)
    cancelHandler()
}

const cancelAddModalHandler = () => {
    setShowAddModal(false)
}





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
