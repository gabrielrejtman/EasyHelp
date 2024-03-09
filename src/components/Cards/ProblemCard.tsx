import React from 'react'
import { FaPencil, FaTrash} from 'react-icons/fa6'
import styled from 'styled-components'
import Problem from '../../domain/entities/Problem'
import '../../pages/administrador/Problems/ShowProblems/styles.css'
import { TagFilter } from '../GlobalComponents.style'
import { handleColorDificult } from '../../adapters/ColorAdapter'

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
                        <TagFilter color={'#02AA8B'}>{item.category}</TagFilter>
                        <TagFilter color={handleColorDificult(item.difficulty)}>{item.difficulty}</TagFilter>
                    </div>
                </div>
                <p className="cardProblemDescription">{item.description}</p>
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
