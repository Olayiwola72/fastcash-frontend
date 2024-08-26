import React from "react";
import { ButtonProps } from './interface';
import './style.css';

export const Button : React.FC<ButtonProps> = ({ type, children }) => {
    return (
        <button className={type}>{children}</button>
    )
}