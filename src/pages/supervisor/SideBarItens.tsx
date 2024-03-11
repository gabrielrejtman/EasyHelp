import homePage from '../../assets/icons/HomePage.svg'
import timeSearch from "../../assets/icons/TimeSearch.svg";

const SidebarPagesSupervisor = [
    {
        name: 'home',
        url: "home",
        icon: <img src={homePage}/>
    },
    {
        name: "Histórico de Ocorrências",
        url: "supervisor-historic",
        icon: <img src={timeSearch}/>
    },
]

export {SidebarPagesSupervisor}