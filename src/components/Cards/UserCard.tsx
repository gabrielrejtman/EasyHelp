import { FaTrash} from 'react-icons/fa6'
import styled from 'styled-components'
import '../../pages/administrador/Problems/ShowProblems/styles.css'
import edit from '../../assets/icons/Edit.svg'
import User from '../../domain/entities/User'
import { handleUserType } from '../../utils/UserTypeAdapter'
import { FaUserCircle } from 'react-icons/fa'

const UserCardContainer = styled.div`
    margin-bottom: 8px;
    background-color: #F0F0F0;
    padding: 10px 14px;
    border-radius: 4px;
    width: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

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

const UserCardPersonalInfo = styled.div`
    display: flex;
    align-items: center;
`

type UserCardProps = {
    item : User
}

export function UserCard({item} : UserCardProps) {
  return (
    <UserCardContainer key={item.id}>
            <UserCardPersonalInfo>
                <FaUserCircle size={40}/>
                <div style={{minWidth:"250px", paddingLeft:"19px"}}>
                    <p style={{fontSize:"14px", fontWeight:"700"}}>{item.name}</p>
                    <p style={{fontSize:"12px", fontWeight:"300"}}>{item.registration}</p>
                </div>
            </UserCardPersonalInfo>
            <div>
                <p style={{fontSize:"12px", fontWeight:"600"}}>{handleUserType(item.role)}</p>
            </div>
            <ButtonsContainer>
                <Button>
                    <img src={edit}/>
                </Button>
                <Button>
                    <FaTrash size={15} />
                </Button>
            </ButtonsContainer>
    </UserCardContainer>
  )
}
