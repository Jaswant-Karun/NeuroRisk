// import { LayoutDashboard, BarChart3, Settings, LogOut } from "lucide-react";
// import { Link, useLocation } from "react-router-dom";

// export default function Sidebar() {
//     const location = useLocation();
//     const isActive = (path) => location.pathname === path;

//     return (
//         <aside className="sidebar">
//             <h2>NeuroTrack</h2>

//             <nav>
//                 <Link to="/dashboard" className={isActive("/dashboard") ? "active" : ""}>
//                     <LayoutDashboard size={20} /> Dashboard
//                 </Link>
//                 <Link to="/analytics" className={isActive("/analytics") ? "active" : ""}>
//                     <BarChart3 size={20} /> Analytics
//                 </Link>
//                 <Link to="/settings" className={isActive("/settings") ? "active" : ""}>
//                     <Settings size={20} /> Settings
//                 </Link>
//             </nav>

//             <div style={{ marginTop: 'auto' }}>
//                 <nav>
//                     <Link to="/logout">
//                         <LogOut size={20} /> Logout
//                     </Link>
//                 </nav>
//             </div>
//         </aside>
//     );
// }



import { NavLink } from "react-router-dom";

export default function Sidebar() {
    return (
        <div className="sidebar">
            <h2>NeuroRisk</h2>

            <nav>
                <NavLink to="/dashboard">
                    Dashboard
                </NavLink>

                <NavLink to="/input">
                    Daily Check-In
                </NavLink>
            </nav>
        </div>
    );
}
