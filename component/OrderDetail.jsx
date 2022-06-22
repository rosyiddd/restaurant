import styles from "../styles/OrderDetail.module.css"
import { useState } from "react"

export default function OrderDetail({ total, createOrder }) {
    const [customer, setCustomer] = useState("")
    const [address, setAddress] = useState("")

    const handleClick = () => {
        createOrder({ customer, address, total, method: 0 })
    }
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>You will pay Rp{total} after delivery.</h1>
                <div className={styles.item}>
                    <label className={styles.label}>Name</label>
                    <input type="text" placeholder="name" className={styles.input}
                        onChange={e => setCustomer(e.target.value)} />
                </div>
                <div className={styles.item}>
                    <label className={styles.label}>Address</label>
                    <input type="text" placeholder="address" className={styles.input}
                        onChange={e => setAddress(e.target.value)} />
                </div>
                <button className={styles.button} onClick={handleClick}>Order</button>
            </div>
        </div>
    )
}