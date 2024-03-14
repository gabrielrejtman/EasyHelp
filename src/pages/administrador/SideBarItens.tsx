import timeSearch from '../../assets/icons/Time Search.svg'
import homePage from '../../assets/icons/Home Page.svg'
import systemReport from '../../assets/icons/System Report.svg'
import custumer from '../../assets/icons/Customer.svg'

const SidebarPagesADM = [
    {
        name: "Home",
        url: "/adm/home",
        icon: <img src={homePage}/>
    },
    {
        name: "Histórico de Ocorrências",
        url: "/adm/orders",
        icon: <img src={timeSearch}/>
    },
    {
        name: "Usuários",
        url: "/adm/users",
        icon: <img src={custumer}/>
    },
    {
        name: "Problemas",
        url: "/adm/problems",
        icon: <img src={systemReport}/>
    },
  ]

  export {SidebarPagesADM}