import React from 'react';
import { TagFilter } from '../GlobalComponents.style'
import {handleColorDificult} from "../../adapters/ColorAdapter.ts";

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
  return (
    <>
      {itens.map((item, index) => (
          <div key={index} className="search-problem-card">
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
          </div>
      ))}
    </>
  );
};

