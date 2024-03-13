import React from 'react'
import lapis from '../../../assets/icons/Edit.svg'
import { Page, Path, Title } from '../../../components/GlobalComponents.style'
import './style.css'

function AddSupervisor() {
  return (
    <Page>
        <Path>Usuários / Novo Cadastro</Path>
        <Title>Novo Cadastro de Supervisor</Title>
        <div className='header'>
            <p className='a'>Cadastrar Supervisor</p>
        </div>

        <div className='Corpo'>

            <div className='campo'>
                <p>Nome Completo</p>
                <input type='text'></input>
            </div>

            <div className='campo'>
                <p>Matrícula</p>
                <input type='text'></input>
            </div>

            <div className='campo'>
                <p>CPF</p>
                <input type='text'></input>
            </div>

        </div>

        <p className='b'>A senha padrão é a matrícula do supervisor, ela deve ser alterada pelo mesmo.</p>
        <button className='c'>Cancelar</button>
        <button className='d'>Cadastrar</button>
    </Page>
  )
}

export default AddSupervisor