import React from 'react'
import { getTraversalPath } from '../util/getTraversalPath';
import WorkflowCard from './WorkflowCard';

const gridPositions = [
  { row: 1, col: 1 }, // Index 0
  { row: 1, col: 2 }, // Index 1
  { row: 1, col: 3 }, // Index 2
  { row: 2, col: 3 }, // Index 3
  { row: 2, col: 2 }, // Index 4
  { row: 2, col: 1 }, // Index 5
  { row: 3, col: 1 }, // Index 6
  { row: 3, col: 2 }, // Index 7
  { row: 3, col: 3 }, // Index 8
];

function CardGrid({ cardData }) {
  const totalCards = cardData.length;
  const cols = Math.min(totalCards, 3); // Maximum 3 columns for better layout
  const rows = Math.ceil(totalCards / cols);
  const positions = gridPositions.slice(0, totalCards);

  return (
    <>
      {/* Render the cards */}
      {cardData.map((card, idx) => {
        const position = positions[idx];
        const nextPosition = positions[idx + 1];
        const hasNext = nextPosition !== undefined;

        let arrowDirection = '';

        if (hasNext) {
          const deltaRow = nextPosition.row - position.row;
          const deltaCol = nextPosition.col - position.col;

          if (deltaRow === 0 && deltaCol === 1) {
            arrowDirection = 'right';
          } else if (deltaRow === 0 && deltaCol === -1) {
            arrowDirection = 'left';
          } else if (deltaRow === 1 && deltaCol === 0) {
            arrowDirection = 'down';
          }
        }

        let additionalClasses = '';
        switch (arrowDirection) {
          case 'down':
            additionalClasses = 'justify-center items-end';
            break;
          case 'left':
            additionalClasses = 'justify-start items-center';
            break;
          case 'right':
            additionalClasses = 'justify-end items-center';
            break;
          default:
            additionalClasses = '';
        }

        return (
          <div
            key={card?.id}
            className={`relative flex ${additionalClasses}`}
          >
            {card && <WorkflowCard key={card.id} card={card} index={idx + 1} />}
            {/* Render the arrow */}
            {/* {arrowDirection && (
              <div className={`ArrowGrid-arrow ${arrowDirection}`}></div>
            )} */}
          </div>
        );
      })}
    </>
  )
}

export default CardGrid