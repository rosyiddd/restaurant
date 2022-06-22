import Footer from "./Footer"
import Navbar from "./Navbar"

export default function Layout({ children }) {
    return (
        <div className="layout">
            <Navbar />
            {children}
            <Footer />
        </div>
    )
}