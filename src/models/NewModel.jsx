import React from "react";
import './New.css';
import icon from '../assets/react.svg';

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
}

function NewModel({ urlImage, title, content, date, urlNew }) {
    const formattedDate = formatDate(date);
    return (
        <article className="card">
            <div className="img-title">
                <img src={urlImage} alt="New" />
                <h2>{title}</h2>
            </div>
            <p className="content" >{content}</p>
            <p>{formattedDate}</p>
            <a href={urlNew} target="_blank">Ver más</a>
        </article>
    );
}

export default NewModel;