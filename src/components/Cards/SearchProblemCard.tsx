import React from 'react';
import { TagFilter } from '../GlobalComponents.style'
import {handleColorDificult} from "../../utils/ColorAdapter.ts";
import { useNavigate } from 'react-router-dom';

interface CardProps {
  title: string;
  category: string;
  difficulty: string;
  description: string;
}

interface CardsProps {
  itens: CardProps[];
}

export const SearchProblemCard: React.FC<CardsProps> = ({ itens }) => {

  const navigate = useNavigate();

  const handleShowProblem = () => {
    navigate('/supervisor/problem-details');
  };

  return (
    <>
      {itens.map((item, index) => (
          <button key={index} className="btn-search-problem-card" onClick={handleShowProblem}>
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
          </button>
      ))}
    </>
  );
};

