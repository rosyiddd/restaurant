import styles from "../../styles/Login.module.css"
import { useState } from "react"
import { useRouter } from "next/router"
import Axios from "axios"

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const router = useRouter()

    const handleClick = async () => {
        try {
            await Axios.post("https://restaurant-rosyiddd.vercel.app/api/login/", { username, password })
            router.push("/admin")
        } catch (err) {
            console.log(err)
            setError(true)
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>Login</h1>
                <input
                    placeholder="username"
                    className={styles.input}
                    onChange={e => setUsername(e.target.value)} />
                <input
                    placeholder="password"
                    className={styles.input}
                    onChange={e => setPassword(e.target.value)} />
                <button className={styles.button} onClick={handleClick}>
                    Login
                </button>
                {error && <span className={styles.error}>You are not admin!</span>}
            </div>
        </div>
    )
}

export default Login