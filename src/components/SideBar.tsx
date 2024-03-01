import React from 'react'
import { NavLink } from 'react-router-dom';
import './sidebar.css'
import diderotLogo from '../assets/DiderotLogo.svg';
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

  return (
    <div>
        <div className='sidebar-container'>
          <img src={diderotLogo} alt="Diderot Logo" />
          <div className='user-container'>
            <FaUserCircle />
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