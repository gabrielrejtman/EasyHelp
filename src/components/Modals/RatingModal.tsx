import { FaUserCircle } from "react-icons/fa"
import { BackgroundModal, ModalStyle } from "../GlobalComponents.style"
import styled from "styled-components"

const RatingModalHeader = styled.div`
    background-color: #1E1F28;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    padding: 17px 28px;
    width: 400px;
    color: white;
    display: flex;
    align-items:center;
`

const RatingModalContent = styled.div`
    padding: 24px 28px;
    display: flex;
`

const RatingEvaluationContainer = styled.div`
    width: 100%;
`

const EvaluationLabel = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
`

type RatingModalProps = {
    isOpen: boolean
    children?: React.ReactNode
}

export default function RatingModal({isOpen, children} : RatingModalProps) {
    
    const user = {name: "Pedro Gama", role: "Administrador"}

    if(isOpen){
        return (
            <BackgroundModal>
                <ModalStyle>
                    
                    <RatingModalHeader>

                        <FaUserCircle size={40}/>
                        <div className='user-information'>
                            <p className='user-name'>{user.name}</p>
                            <p className='user-role'>{user.role}</p>
                        </div>

                    </RatingModalHeader>

                    <RatingModalContent>
                        <RatingEvaluationContainer>

                            <EvaluationLabel>Avalie a solução do problema</EvaluationLabel>
                            
                            {children}

                        </RatingEvaluationContainer>

                    </RatingModalContent>

                </ModalStyle>

            </BackgroundModal>
        )
    }
  return null
}