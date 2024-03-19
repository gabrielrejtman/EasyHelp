import React from 'react';
import { TagFilter } from '../GlobalComponents.style'
import {handleColorDificult} from "../../utils/ColorAdapter.ts";
import { useNavigate } from 'react-router-dom';
import Problem from '../../domain/entities/Problem.ts';

interface CardsProps {
  problem: Problem;
}

export const SearchProblemCard: React.FC<CardsProps> = ({ problem }) => {

  const navigate = useNavigate();

  const handleShowProblem = (problem: Problem) => {
      navigate('/supervisor/problem-details', { state: { problem } })
  };

  const truncateText = (text: string, limit: number): string => {
      if (text.length > limit) {
          return `${text.substring(0, limit)}...`;
      } else {
          return text;
      }
  };

  return (
        <button className="btn-search-problem-card" onClick={() => handleShowProblem(problem)}>
              <div className="problemCardContent">
                    <div className="problemCardHead">

                        <p className="cardProblemTitle">{problem.title}</p>
                        <div className="problemTags">
                              <TagFilter color={'#02AA8B'}>{problem.category}</TagFilter>
                              <TagFilter color={handleColorDificult(problem.difficulty)}>{problem.difficulty}</TagFilter>
                        </div>
                    </div>
                    <p className="cardProblemDescription">{truncateText(problem.description, 265)}</p>
              </div>
        </button>

  );
};