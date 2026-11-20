
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

            <div className={alertEmail ? `${styles.email} ${styles.invalid}` : styles.email}>
                <label htmlFor="email">ایمیل : </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={contact.email}
                    onChange={showHandler}
                />
                    <p>{alertEmail}</p>
            </div>

            <div className={styles.work}>
                <label htmlFor="work">شغل : </label>
                <input
                    type="text"
                    name="work"
                    id="work"
                    value={contact.work}
                    onChange={showHandler}
                />
            </div>

            <div className={alertPhone ? `${styles.phone} ${styles.invalid}` : styles.phone}>
                <label htmlFor="phone">تلفن همراه : </label>
                <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={contact.phone}
                    onChange={showHandler}
                    maxLength={11}
                    inputMode="numeric"
                />
                <p>{alertPhone}</p>
            </div>

            <button onClick={addedHandler} disabled={!isFormValid}>
                {editId ? "ویرایش" : "افزودن"}
            </button>

        </div>
    )
}

export default AddContact
