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
  item: CardProps;
}

export const SearchProblemCard: React.FC<CardsProps> = ({ item }) => {

  const navigate = useNavigate();

  const handleShowProblem = (item: CardProps) => {
    navigate('/supervisor/problem-details', { state: { item } })
  };

  return (
        <button className="btn-search-problem-card" onClick={() => handleShowProblem(item)}>
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

  );
};

