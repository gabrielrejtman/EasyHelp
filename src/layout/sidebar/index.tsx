import { Outlet } from "react-router-dom"
import { Layout } from "../../components/GlobalComponents.style"
import { Sidebar, SidebarItem } from "./SideBar"
import { SidebarPagesADM } from "../../pages/administrador/SideBarItens"
import { SidebarPagesSupervisor } from "../../pages/supervisor/SideBarItens"

const userType = 1 //   1: supervisor | 2: técnico

export const DashboardLayout = () => {
    let items: SidebarItem[]
    if (userType == 1) {
        items = SidebarPagesSupervisor
    }
    else{
        items = SidebarPagesADM
    }


    return (
        <Layout>
            <Sidebar items={items} />
            <Outlet/>
        </Layout>
    )
}