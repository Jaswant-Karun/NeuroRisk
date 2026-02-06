import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function MainLayout({ children }) {
    return (
        <div className="app-layout">
            <Sidebar />
            <div className="main-area">
                <Navbar />
                <div className="content">{children}</div>
            </div>
        </div>
    );
}
