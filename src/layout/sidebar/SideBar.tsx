import React from 'react'
import { NavLink } from 'react-router-dom';
import './SideBar.css'
import diderotLogo from '../../assets/DiderotLogo.svg';
import { FaUserCircle } from "react-icons/fa";

export interface SidebarItem{
    url:string;
    icon:React.ReactNode;
    name:string;
}

interface IProps{
    items:SidebarItem[]
}

function Sidebar({items}:IProps) {
    const user = {name: "Pedro Gama", role: "Administrador"}

    return (
        <div>
            <div className='sidebar-container'>
                <img src={diderotLogo} className='logo' />
                <div className='user-container'>
                    <FaUserCircle size={40}/>
                    <div className='user-information'>
                        <p className='user-name'>{user.name}</p>
                        <p className='user-role'>{user.role}</p>
                    </div>
                </div>
                
                <ul className='nav-list'>
                    {items.map((item, index) => {
                        return(
                            <li className='nav-item' key={index}>
                                <NavLink to={item.url} className="nav-link">
                                    <div className='nav-link-icon'>{item.icon}</div>
                                    <div className='icon-text'>{item.name}</div>
                                </NavLink>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export {Sidebar}