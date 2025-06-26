import Icon from "../Icon/icon";
import './Card.css'

function Card({ player, onPlay, index, gameEnd }) {
  let icon = <Icon />;

  if (player === "X") {
    icon = <Icon name={"cross"} />;
  } else if (player === "O") {
    icon = <Icon name={"circle"} />;
  }

  return <div onClick={() => !gameEnd && player==="" && onPlay(index)} className="card">{icon}</div>;
}

export default Card;
