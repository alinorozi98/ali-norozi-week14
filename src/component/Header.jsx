
import styles from "./Header.module.css"

function Header() {
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
