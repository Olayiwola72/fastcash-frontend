import React from "react";
import { ErrorProps } from './interface';
import './style.scss';

const ErrorPage : React.FC<ErrorProps> = ({ errorMessage }) => {
    return (
        <div>
            { errorMessage &&
                errorMessage
            }
        </div>
    )
}

export default (ErrorPage);