import React from 'react'
import hands from '../../../assets/icons/Connectivity and Help.svg'
import diderotLogo from '../../../assets/DiderotLogo.svg'
import './style.css'

function LoginADM() {
  return (
    <div className="all">
            <div className='left'>
                <img src={diderotLogo} className='canto'/>


                <div className="texto">
                    <img src={hands}/>
                    <p>Seu sistema de</p>
                    <p className='a'>resolução de</p>
                    <p className='b'>problemas</p>
                </div>
            </div>

            <div className='direita'>
                <div className="janela">
                    <form method="post" action="">
                        <h2>Login</h2>
                        <div className="campo">
                            <p>Matrícula</p>
                            <input type="text" name="mat"/>
                        </div>

                        <div className="campo">
                            <p>Senha</p>
                            <input type="password" name="senha"/>
                        </div>
                        
                        <div className='checkbox'>
                            <input type="checkbox"/>
                            <p>Mantenha-me Conectado</p>
                            <a href="">Esqueceu a Senha?</a>
                        </div>

                        <input type="submit" value="Entrar"/>
                    </form>
                </div>
            </div>
        </div>
  )
}

export default LoginADM