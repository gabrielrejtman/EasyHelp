import { TbCalendar, } from  'react-icons/tb'
import { BiParty } from "react-icons/bi";
import { MdOutlineVideoCameraFront } from "react-icons/md";
import { FaTasks } from "react-icons/fa";

const side_bar_pages = [
    {
        name: "Home",
        url: "home",
        icon: <TbCalendar size={22} color="#ffff"/>
    },
    {
        name: "Historico de Ocorrencias",
        url: "orders",
        icon: <TbCalendar size={22} color="#ffff"/>
    },
    {
        name: "Problemas",
        url: "problems",
        icon: <TbCalendar size={22} color="#ffff"/>
    },
    {
        name: "Usuários",
        url: "users",
        icon: <TbCalendar size={22} color="#ffff"/>
    },
  ]

  export {side_bar_pages}