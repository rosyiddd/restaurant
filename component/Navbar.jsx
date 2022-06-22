import styles from "../styles/Navbar.module.css"
import Image from "next/image"
import Link from "next/link"
import { useSelector } from "react-redux"

export default function Navbar() {
    const quantity = useSelector(state => state.cart.quantity)
    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <div className={styles.callButton}>
                    <Image src="/img/telephone.png" alt="" width="32" height="32" />
                </div>
                <div className={styles.texts}>
                    <div className={styles.text}>ORDER NOW!</div>
                    <div className={styles.text}>14045</div>
                </div>
            </div>
            <div className={styles.item}>
                <ul className={styles.list}>
                    <Link href="/" passHref>
                        <li className={styles.listItem}>Homepage</li>
                    </Link>
                    <li className={styles.listItem}>Product</li>
                    <Image src="/img/pizza-box.png" alt="" width="80px" height="69px" />
                    <li className={styles.listItem}>Menu</li>
                    <Link href="/admin" passHref>
                        <li className={styles.listItem}>Admin</li>
                    </Link>
                    {/* 
                    <li className={styles.listItem}>Blog</li>
                    <li className={styles.listItem}>Contact</li> */}
                </ul>
            </div>
            <Link href="/cart" passHref>
                <div className={styles.item}>
                    <div className={styles.cart}>
                        <Image src="/img/shopping-cart.png" alt="" width="30px" height="30px" />
                        <div className={styles.counter}>{quantity}</div>
                    </div>
                </div>
            </Link>
        </div>
    )
}