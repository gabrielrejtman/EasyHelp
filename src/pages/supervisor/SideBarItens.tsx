import { TbCalendar, } from  'react-icons/tb'
import { BiParty } from "react-icons/bi";
import { MdOutlineVideoCameraFront } from "react-icons/md";
import { FaTasks } from "react-icons/fa";

const side_bar_pages = [
    {
        title: "Buscar Problema",
        path: "/",
        icon: <TbCalendar size={22} color="#000"/>
    },
    {
        title: "Tarefas",
        path: "/tarefas",
        icon: <FaTasks size={22} color="#000"/>
    },
    {
        title: "Eventos",
        path: "/eventos",
        icon: <BiParty size={22} color="#000"/>
    },
    {
        title: "Reuniões",
        path: "/reunioes",
        icon: <MdOutlineVideoCameraFront size={22} color="#000"/>
    },
  ]

  export default side_bar_pages