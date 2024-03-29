import styles from "../styles/Cart.module.css"
import Image from "next/image"
import { useRouter } from "next/router"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js"
import Axios from "axios"
import { reset } from "../redux/cartSlice"
import OrderDetail from "../component/OrderDetail"

export default function Cart() {
    const [open, setOpen] = useState(false)
    const [cash, setCash] = useState(false)
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const router = useRouter()
    const amount = cart.total
    const currency = "USD"
    const style = { "layout": "vertical" }

    const createOrder = async data => {
        try {
            const res = await Axios.post("https://restaurant-rosyiddd.vercel.app/api/orders", data)
            res.status === 201 && router.push("/orders/" + res.data._id)
            dispatch(reset())
        } catch (err) {
            console.log(err)
        }
    }
    // Custom component to wrap the PayPalButtons and handle currency changes
    const ButtonWrapper = ({ currency, showSpinner }) => {
        // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
        // This is the main reason to wrap the PayPalButtons in a new component
        const [{ options, isPending }, dispatch] = usePayPalScriptReducer()

        useEffect(() => {
            dispatch({
                type: "resetOptions",
                value: {
                    ...options,
                    currency: currency,
                },
            })
        }, [currency, showSpinner])
        return (
            <>
                {showSpinner && isPending && <div className="spinner" />}
                <PayPalButtons
                    style={style}
                    disabled={false}
                    forceReRender={[amount, currency, style]}
                    fundingSource={undefined}
                    createOrder={(data, actions) => {
                        return actions.order
                            .create({
                                purchase_units: [
                                    {
                                        amount: {
                                            currency_code: currency,
                                            value: amount,
                                        },
                                    },
                                ],
                            })
                            .then(orderId => {
                                // Your code here after create the order
                                return orderId
                            })
                    }}
                    onApprove={function (data, actions) {
                        return actions.order.capture().then(function (details) {
                            const shipping = details.purchase_units[0].shipping
                            createOrder({
                                customer: shipping.name.full_name,
                                address: shipping.address_line_1,
                                total: cart.total,
                                method: 1
                            })
                        })
                    }}
                />
            </>
        )
    }
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <table className={styles.table}>
                    <tbody>
                        <tr className={styles.trTitle}>
                            <th>Product</th>
                            <th>Name</th>
                            <th>Extras</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </tbody>
                    <tbody>
                        {cart.products.map(product => (
                            <tr className={styles.tr} key={product._id}>
                                <td>
                                    <div className={styles.imgContainer}>
                                        <Image src={product.img} alt="" objectFit="cover" layout="fill" />
                                    </div>
                                </td>
                                <td>
                                    <span className={styles.name}>{product.title}</span>
                                </td>
                                <td>
                                    <span className={styles.extras}>
                                        {product.extras.map(extras => (
                                            <span key={extras._id}>{extras.text},</span>
                                        ))}
                                    </span>
                                </td>
                                <td>
                                    <span className={styles.price}>Rp{product.price}</span>
                                </td>
                                <td>
                                    <span className={styles.quantity}>{product.quantity}</span>
                                </td>
                                <td>
                                    <span className={styles.total}>Rp{product.quantity * product.price}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={styles.right}>
                <div className={styles.wrapper}>
                    <h2 className={styles.title}>CART TOTAL</h2>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Subtotal:</b> Rp{cart.total}
                    </div>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Discount:</b> Rp0.00
                    </div>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Total:</b> Rp{cart.total}
                    </div>
                    {open ?
                        <div className={styles.paymentMethods}>
                            <button className={styles.payButton} onClick={() => setCash(true)}>CASH ON DELIVERY</button>
                            <PayPalScriptProvider
                                options={{
                                    "client-id": "test",
                                    components: "buttons",
                                    currency: "USD",
                                    "disable-funding": "credit,card,p24"
                                }}
                            >
                                <ButtonWrapper
                                    currency={currency}
                                    showSpinner={false}
                                />
                            </PayPalScriptProvider>
                        </div>
                        : <button onClick={() => setOpen(true)} className={styles.button} disabled={cart.products.length === 0}>PAID</button>}
                </div>
            </div>
            {cash && <OrderDetail total={cart.total} createOrder={createOrder} setCash={setCash} />}
        </div>
    )
}