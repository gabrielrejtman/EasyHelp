import React from 'react'
import { useState } from 'react'
import { Page, Path, Title } from '../../../components/GlobalComponents.style'
import v from '../../../assets/icons/Vector.svg'
import './style.css'


function EditarSupervisor() {

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const toggle = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const [isPopupVisible2, setIsPopupVisible2] = useState(false);
  const toggle2 = () => {
    setIsPopupVisible2(!isPopupVisible2);
  };
    
  return (
    <Page>
        <Path>Usuários / Editar Cadastro</Path>
        <Title>Editar Cadastro de Supervisor</Title>
        <div className='header'>
            <p className='a'>Editar Supervisor</p>
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

        <button className='c' onClick={toggle}>Cancelar</button>
        <button className='d' onClick={toggle2}>Salvar</button>

        {isPopupVisible && (
          <div className='popup-warper'>
              <div className='popup'>
                  <div className="popup-content">
                      <p>As alterações não foram salvas, tem certeza que deseja cancelar?</p>

                      <div className='buttons'>
                          <button className='c' id='cancel' onClick={toggle}>Cancelar</button>
                          <button className='d' id='save'>Continuar</button>
                      </div>
                  </div>
              </div>
          </div>
        )}

        {isPopupVisible2 && (
            <div className='popup-warper2' onClick={toggle2}>
              <div className='popup2'>
                  <div className="popup-content2">
                        <div className='checkmark'>
                            <img src={v}/>
                        </div>
                        <div className='bloco'>
                            <p>As alterações foram salvas com sucesso!</p>
                        </div>
                  </div>
              </div>
          </div>
        )}
    </Page>
  )
}

export default EditarSupervisor