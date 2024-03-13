import React from 'react'
import tools from '../../../assets/icons/Tools.svg'
import capacete from '../../../assets/icons/Safety Hat.svg'
import { Page, Path, Title } from '../../../components/GlobalComponents.style'
import './style.css'

function AddUsers() {
  return (
    <Page>
        <Path>Usuários / Novo Cadastro</Path>
        <Title>Novo Cadastro</Title>
        <div className='Corpo'>
            <button>
                <div className='content'>
                    <img src={tools} className='a'/>
                    <p>Técnico</p>
                </div>
            </button>
            <button>
                <div className='content'>
                    <img src={capacete} className='b'/>
                    <p>Supervisor</p>
                </div>
            </button>
        </div>
    </Page>
  )
}

export default AddUsers