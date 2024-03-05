import { Outlet } from "react-router-dom"
import { Layout } from "../../components/GlobalComponents.style"
import { Sidebar, SidebarItem } from "./SideBar"
import { side_bar_pages } from "../../pages/administrador/SideBarItens"

export const DashboardLayout = () => {
    //const isAdmin = true;
    //const items: SidebarItem[] = isAdmin ? [{}] : [{}]

    const items: SidebarItem[] = side_bar_pages

    return (
        <Layout>
            <Sidebar items={items} />
            <Outlet/>
        </Layout>
    )
}