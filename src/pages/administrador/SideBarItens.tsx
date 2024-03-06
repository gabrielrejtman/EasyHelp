import timeSearch from '../../assets/icons/Time Search.svg'
import homePage from '../../assets/icons/Home Page.svg'
import systemReport from '../../assets/icons/System Report.svg'
import custumer from '../../assets/icons/Customer.svg'

const side_bar_pages = [
    {
        name: "Home",
        url: "/",
        icon: <img src={homePage}/>
    },
    {
        name: "Histórico de Ocorrências",
        url: "/orders",
        icon: <img src={timeSearch}/>
    },
    {
        name: "Usuários",
        url: "/users",
        icon: <img src={custumer}/>
    },
    {
        name: "Problemas",
        url: "/problems",
        icon: <img src={systemReport}/>
    },
  ]

  export {side_bar_pages}