
import styles from "./choiss.module.css"

function Choiss({ removeHandler, data, editHandler }) {
    return (
        <div className={styles.chois}>
            <p onClick={editHandler}>ویرایش</p>
            <p onClick={() => removeHandler(data)}>حذف</p>
        </div>
    )
}

export default Choiss
