import { Card } from "~/dto/card";

interface CardProps {
  card: Card;
}

const CardImg: React.FC<CardProps> = ({ card }) => {
  return (
    <div>
      <img src={card.img} className="w-20 h-auto" />
    </div>
  );
};

export default CardImg;
