import React from 'react'
import {Order} from '../../entities/example.ts'

type OrderCardProps = {
    item: Order;
}

export const OrderCard = ({item} : OrderCardProps) => {
    return (
        <div className="card">
            <div className="card-content">
                <div className="cardHead">
                    <p className="cardTitulo">{item.problem.title}</p>
                    <div className="etiquetas">
                        <div className="categoria">{item.problem.category}</div>
                        <div className="dificuldade">{item.problem.difficulty}</div>
                    </div>
                </div>
                <p className="cardDescricao">{item.problem.description}</p>
            </div>
        </div>
    )
}