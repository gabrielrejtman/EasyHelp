import hands from '../../assets/icons/HelpHands.svg'
import diderotLogo from '../../assets/DiderotLogo.svg'
import './login.css'
import User from "../../domain/entities/User";
import { FormEvent, useRef } from 'react'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import { LoginUserUseCase } from '../../services/useCases/User/LoginUserUseCase'
import { useNavigate } from 'react-router-dom'

export let user: User

export function Login() {
  const registrationRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate();

  const notifyError = () => {
    toast.error("Preencha os campos!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }

  const notifyUserError = () => {
    toast.error("Usuário informado não existe!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }

  const notifyPasswordError = () => {
    toast.error("Senha inválida!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }

  const handleAcessUser = (user: string) => {
    navigate(`/${user}/home`);
  };

  function isUser(obj: any): obj is User {
    return obj && typeof obj === 'object' && 'role' in obj;
  }

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    if (!registrationRef.current?.value || !passwordRef.current?.value) {
      notifyError()
      return
    }
    else {
      try {
        const login = new LoginUserUseCase()
        const registration = registrationRef.current?.value
        const password = passwordRef.current?.value
        const response = await login.execute({ registration, password });

        if (typeof response === 'string') {
          if (response === "User Doesn't Exist") {
            notifyUserError();
          } else if (response === "Incorrect id or password") {
            notifyPasswordError();
          }
        } else if (isUser(response)) {
          user = response
          switch (response.role) {
            case "ADMIN":
              handleAcessUser("adm");
              break;
            case "SUPERVISOR":
              handleAcessUser("supervisor");
              break;
            case "SPECIALIST":
              handleAcessUser("specialist");
              break;
            default:
              console.error("Role desconhecido:", response.role);
          }
        } else {
          // Se chegou aqui, algo inesperado aconteceu
          console.error("A resposta não é um usuário válido nem uma mensagem de erro conhecida");
        }

      } catch (err) {
        console.error(err);
      }

      //handleCancel();
    }
  }

  return (
    <div className="all">
      <ToastContainer />

      <div className='left'>
        <img src={diderotLogo} className='canto' />

        <div className="texto">
          <img src={hands} />
          <p>Seu sistema de</p>
          <p className='a'>resolução de</p>
          <p className='b'>problemas</p>
        </div>
      </div>

      <div className='direita'>
        <div className="janela">
          <form onSubmit={handleLogin} id='form-login'>
            <h2>Login</h2>
            <div className="campo">
              <p>Matrícula</p>
              <input type="text" className="text-input-login" name="mat" ref={registrationRef} />
            </div>

            <div className="campo">
              <p>Senha</p>
              <input type="password" name="senha" ref={passwordRef} />
            </div>

            <div className='checkbox'>
              <input type="checkbox" />
              <p>Mantenha-me Conectado</p>
              <a href="">Esqueceu a Senha?</a>
            </div>

            <input type="submit" value="Entrar" form="form-login" className='btn-send-login' />
          </form>
        </div>
      </div>
    </div>
  )
}