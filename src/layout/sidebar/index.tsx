import { Outlet } from "react-router-dom"
import { Layout } from "../../components/GlobalComponents.style"
import { Sidebar, SidebarItem } from "./SideBar"

import { SidebarPagesADM } from "../../pages/administrador/SideBarItens"
import { SidebarPagesSupervisor } from "../../pages/supervisor/SideBarItens"
import { SidebarPagesSpecialist } from "../../pages/specialist/SideBarItens"
import { user } from "../../pages/Login/Login"

export const DashboardLayout = () => {
    let items: SidebarItem[]

    switch (user.role) {
        case 'SUPERVISOR':
            items = SidebarPagesSupervisor
            break;
        case 'SPECIALIST':
            items = SidebarPagesSpecialist
            break;
        case 'ADMIN':
            items = SidebarPagesADM
            break;
        default:
            items = SidebarPagesADM
    }

    return (
        <Layout>
            <Sidebar items={items} />
            <Outlet />
        </Layout>
    )
}