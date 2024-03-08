import React from 'react'
import { FaPencil, FaTrash} from 'react-icons/fa6'
import styled from 'styled-components'
import Problem from '../../domain/entities/Problem'
import '../../pages/administrador/Problems/ShowProblems/styles.css'

const Button = styled.button`
  outline: none;
  margin-left: 20px;
  background-color: #f0f0f0;
  cursor: pointer;
`

type ProblemCardProps = {
    item : Problem
}

export function ProblemCard({item} : ProblemCardProps) {
  return (
    <div key={item.id} className="problemCard">
            <div className="problemCardContent">
                <div className="problemCardHead">
                    <p className="cardProblemTitle">{item.title}</p>
                    <div className="problemTags">
                        <div className="problemCategory">{item.category}</div>
                        <div className="problemDifficulty">{item.difficulty}</div>
                    </div>
                </div>
                <p className="cardDescricao">{item.description}</p>
            </div>
            <div className="btn-bar">
                <Button>
                    <FaPencil size={15} />
                </Button>
                <Button>
                    <FaTrash size={15} />
                </Button>
            </div>
    </div>
  )
}
