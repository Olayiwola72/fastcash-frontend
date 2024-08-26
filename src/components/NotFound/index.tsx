import React from "react";
import { NotFoundProps } from './interface';
import './style.scss';

const NotFound : React.FC<NotFoundProps> = () => {
    return (
        <div className="not-found">
            <h1 className="error-code">404</h1>
            <p className="message">Oops! That page can’t be found.</p>
        </div>
    )
}

export default (NotFound);
