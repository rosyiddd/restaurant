import styles from "../styles/Footer.module.css"
import Image from "next/image"

export default function Footer() {
    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <Image src="/img/pizza.png" layout="fill" alt="" objectFit="contain" />
            </div>
            <div className={styles.item}>
                <div className={styles.card}>
                    <h2 className={styles.motto}>
                        OH YES, WE DID. THE BEST PIZZA, WELL BAKED OF PIZZA
                    </h2>
                </div>
                <div className={styles.card}>
                    <h1 className={styles.title}>FIND OUR RESTAURANTS</h1>
                    <p className={styles.text}>
                        Jalan Raya
                        <br /> Jakarta, 13870
                        <br /> 02198000
                    </p>
                    <p className={styles.text}>
                        Jalan Raya
                        <br /> Jakarta, 13870
                        <br /> 02198000
                    </p>
                </div>
                <div className={styles.card}>
                    <h1 className={styles.title}>WORKING HOURS</h1>
                    <p className={styles.text}>
                        MONDAY UNTIL FRIDAY
                        <br /> 09:00 - 22:00
                    </p>
                    <p className={styles.text}>
                        SATURDAY - SUNDAY
                        <br /> 12:00 - 24:00
                    </p>
                </div>
            </div>

        </div>
    )
}