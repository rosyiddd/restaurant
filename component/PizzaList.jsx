import styles from "../styles/PizzaList.module.css"
import PizzaCard from "./PizzaCard"

export default function PizzaList({ pizzaList }) {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>THE BEST PIZZA IN A TOWN</h1>
            <p className={styles.desc}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit vitae, iure tempora voluptatem nemo molestiae nostrum dicta obcaecati.
                Incidunt odio doloremque suscipit, ex ipsum sed velit soluta, voluptate architecto quidem, minus minima molestiae perspiciatis. Provident, doloribus nostrum sunt dolorem repudiandae, harum molestias a laboriosam similique recusandae in itaque incidunt culpa!
            </p>
            <div className={styles.wrapper}>
                {pizzaList.map(p => <PizzaCard key={p._id} pizza={p} />)}
            </div>
        </div>
    )
}