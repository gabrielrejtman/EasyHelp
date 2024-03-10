import homePage from '../../assets/icons/Home Page.svg'
import timeSearch from "../../assets/icons/Time Search.svg";

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