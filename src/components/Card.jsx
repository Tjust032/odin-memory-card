import React from "react";
import "../styles/Card.css";

export default function Card({ id, image, name, onClick }) {
  return (
    <div className="card" onClick={() => onClick(id)}>
      <img src={image} alt={name} className="card-image" />
      <p className="card-name">{name}</p>
    </div>
  );
}
