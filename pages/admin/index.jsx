import styles from "../../styles/Admin.module.css"
import Image from "next/image"
import { useState } from "react"
import Axios from "axios"

const Admin = ({ orders, pizzas }) => {
    const [pizzaList, setPizzaList] = useState(pizzas)
    const [orderList, setOrderList] = useState(orders)
    const status = ["preparing", "on the way", "delivered"]

    const handleDelete = async id => {
        try {
            await Axios.delete("https://restaurant-rosyiddd.vercel.app/api/products/" + id)
            setPizzaList(pizzaList.filter(p => p._id !== id))
        } catch (err) {
            console.log(err)
        }
    }
    const handleStatus = async id => {
        const item = orderList.filter(order => order._id === id)[0]
        const currentStatus = item.status
        try {
            const res = await Axios.put("https://restaurant-rosyiddd.vercel.app/api/orders/" + id, { status: currentStatus + 1 })
            setOrderList([res.data, ...orderList.filter(o => o._id !== id)])
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <h1 className={styles.title}>Products</h1>
                <table className={styles.table}>
                    <tbody>
                        <tr className={styles.trTitle}>
                            <th>Image</th>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </tbody>
                    {pizzaList.map(pizza => (
                        <tbody key={pizza._id}>
                            <tr className={styles.trTitle}>
                                <td>
                                    <Image src={pizza.img} width={50} height={50} objectFit="cover" alt="" />
                                </td>
                                <td>{pizza._id.slice(0, 5)}...</td>
                                <td>{pizza.title}</td>
                                <td>{pizza.prices[0]}</td>
                                <td>
                                    <button className={styles.button} onClick={() => handleDelete(pizza._id)}>Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>
            <div className={styles.item}>
                <h1 className={styles.title}>Orders</h1>
                <table className={styles.table}>
                    <tbody>
                        <tr className={styles.trTitle}>
                            <th>Id</th>
                            <th>Customer</th>
                            <th>Total</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </tbody>
                    {orderList.map(order => (
                        <tbody key={order._id}>
                            <tr className={styles.trTitle}>
                                <td>{order._id.slice(0, 5)}...</td>
                                <td>{order.customer}</td>
                                <td>Rp{order.total}</td>
                                <td>{order.method === 0 ? (<span>Cash</span>) : (<span>Paid</span>)}</td>
                                <td>{status[order.status]}</td>
                                <td>
                                    {order.status < 2 ?
                                        <button className={styles.button} onClick={() => handleStatus(order._id)}>Next Stage</button>
                                        : <button disabled>Finish</button>
                                    }
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>
        </div>
    )
}

export const getServerSideProps = async ctx => {
    const myCookie = ctx.req?.cookies || ""
    if (myCookie.token !== process.env.TOKEN) {
        return {
            redirect: {
                destination: "/admin/login",
                permanent: false
            }
        }
    }
    const productRes = await Axios.get("http://localhost:3000/api/products/")
    const orderRes = await Axios.get("http://localhost:3000/api/orders/")
    return {
        props: {
            orders: orderRes.data,
            pizzas: productRes.data,
        }
    }
}

export default Admin