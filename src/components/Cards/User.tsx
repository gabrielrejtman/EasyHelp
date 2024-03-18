import { FaTrash} from 'react-icons/fa6'
import styled from 'styled-components'
import '../../pages/administrador/Problems/ShowProblems/styles.css'
import edit from '../../assets/icons/Edit.svg'
import User from '../../domain/entities/User'

const Button = styled.button`
  outline: none;
  border: none;
  margin-left: 20px;
  background-color: #f0f0f0;
  cursor: pointer;
`

const ButtonsContainer = styled.div`
    display: flex;
    align-items: center;
`

type UserCardProps = {
    item : User
}

export function UserCard({item} : UserCardProps) {
  return (
    <div key={item.id} className="problemCard">
            <div className="problemCardContent">
                <div className="problemCardHead">
                    <p className="cardProblemTitle">{item.name}</p>
                    <p className="cardProblemDescription">{item.registration}</p>
                </div>
                <p className="cardProblemDescription">{item.role}</p>
            </div>
            <ButtonsContainer>
                <Button>
                    <img src={edit}/>
                </Button>
                <Button>
                    <FaTrash size={15} />
                </Button>
            </ButtonsContainer>
    </div>
  )
}
