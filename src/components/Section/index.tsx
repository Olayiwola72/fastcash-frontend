import React from "react";
import { SectionProps } from './interface';
import image from '../../assets/backdrop.png';
import './style.scss';
import { APP_NAME } from "../../constants/env";

const Section : React.FC<SectionProps> = () => {
    return (
        <section className="container-fluid image-container">
            <img 
                className="responsive-image img-fluid" 
                src={image} 
                alt={`${APP_NAME} backdrop`} 
                fetchPriority="high"
            />
        </section>
    )
}

export default (Section);
