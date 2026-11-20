
import styles from "./AddContact.module.css"

function AddContact({
    cancelHandler,
    editId,
    contact,
    addedHandler,
    showHandler,
    alertName,
    alertEmail,
    alertPhone,
    isFormValid,
}) {
    return (
        <div className={styles.contact}>
            <span onClick={cancelHandler}>🪪</span>

            <div className={alertName ? `${styles.name} ${styles.invalid}` : styles.name}>
                <label htmlFor="name">نام و نام خانوادگی : </label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={contact.name}
                    onChange={showHandler}
                />
                <p>{alertName}</p>
            </div>
        </div>
    )
}

export default AddContact
