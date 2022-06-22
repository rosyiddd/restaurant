import styles from "../styles/Add.module.css"
import Axios from "axios"
import { useState } from "react"
import { useRouter } from "next/router"

export default function Add({ setClose }) {
    const [file, setFile] = useState(null)
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [prices, setPrices] = useState([])
    const [extraOptions, setExtraOptions] = useState([])
    const [extra, setExtra] = useState(null)
    const router = useRouter()

    const handleExtraInput = e => {
        setExtra({ ...extra, [e.target.name]: e.target.value })
    }
    const handleExtra = () => {
        setExtraOptions(prev => [...prev, extra])
    }
    const changePrice = (e, index) => {
        const currentPrices = prices
        currentPrices[index] = e.target.value
        setPrices(currentPrices)
    }
    const handleCreate = async () => {
        const data = new FormData()
        data.append("file", file)
        data.append("upload_preset", "ybfw15q6")
        try {
            const uploadRes = await Axios.post("http://api.cloudinary.com/v1_1/dumgxwuun/image/upload", data)
            const { url } = uploadRes.data
            const newProduct = {
                title, desc, prices, extraOptions, img: url
            }
            await Axios.post("https://restaurant-rouge.vercel.app/api/products", newProduct)
            router.reload()
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <span onClick={() => setClose(true)} className={styles.close}>
                    X
                </span>
                <h1>Add New Pizza</h1>
                <div className={styles.item}>
                    <label className={styles.label}>Choose an image</label>
                    <input type="file" onChange={e => setFile(e.target.files[0])} />
                </div>
                <div className={styles.item}>
                    <label className={styles.label}>Title</label>
                    <input type="text" onChange={e => setTitle(e.target.value)} />
                </div>
                <div className={styles.item}>
                    <label className={styles.label}>Desc</label>
                    <textarea type="text" rows={4} onChange={e => setDesc(e.target.value)} />
                </div>
                <div className={styles.item}>
                    <label className={styles.label}>Prices</label>
                    <div className={styles.priceContainer}>
                        <input type="number" placeholder="small" onChange={e => changePrice(e, 0)} className={`${styles.input} ${styles.inputSm}`} />
                        <input type="number" placeholder="medium" onChange={e => changePrice(e, 1)} className={`${styles.input} ${styles.inputSm}`} />
                        <input type="number" placeholder="large" onChange={e => changePrice(e, 2)} className={`${styles.input} ${styles.inputSm}`} />
                    </div>
                </div>
                <div className={styles.item}>
                    <label className={styles.label}>Extra</label>
                    <div className={styles.extra}>
                        <input type="text" placeholder="item" name="text" onChange={handleExtraInput} className={`${styles.input} ${styles.inputSm}`} />
                        <input type="number" placeholder="price" name="price" onChange={handleExtraInput} className={`${styles.input} ${styles.inputSm}`} />
                        <button className={styles.extraButton} onClick={handleExtra}>
                            Add
                        </button>
                    </div>
                    <div className={styles.extraItems}>
                        {extraOptions.map(option => (
                            <span className={styles.extraItem} key={option.text}>{option.text}</span>
                        ))}
                    </div>
                </div>
                <button className={styles.addButton} onClick={handleCreate}>
                    Create
                </button>
            </div>
        </div>
    )
}