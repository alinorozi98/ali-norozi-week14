
import styles from "./Header.module.css"

function Header() {
    return (
        <>
            <div className={styles.headers}>
                <label htmlFor="serch">جستجو در مخاطبین : </label>
                <input type="text" id="serch" />
            </div>
        </>
    )
}

export default Header
