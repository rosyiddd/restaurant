import Head from "next/head"
import Featured from "../component/Featured"
import PizzaList from "../component/PizzaList"
import styles from "../styles/Home.module.css"
import Add from "../component/Add"
import AddButton from "../component/AddButton"
import Axios from "axios"
import { useState, useEffect } from "react"

export default function Home({ admin }) {
  const [close, setClose] = useState(true)
  const [pizzaList, setPizzaList] = useState([])

  useEffect(() => {
    const getPizzaList = async () => {
      try {
        const res = await Axios.get("http://localhost:3000/api/products")
        setPizzaList(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getPizzaList()
  }, [])
  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza Restaurant in Jakarta</title>
        <meta name="description" content="Best pizza shop in town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      {admin && <AddButton setClose={setClose} />}
      <PizzaList pizzaList={pizzaList} />
      {!close && <Add setClose={setClose} />}
    </div>
  )
}

export const getServerSideProps = async ctx => {
  const myCookie = ctx.req?.cookies || ""
  let admin = false
  if (myCookie.token === process.env.TOKEN) {
    admin = true
  }
  return {
    props: {
      admin
    }
  }
}