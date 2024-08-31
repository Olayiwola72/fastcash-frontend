import React from "react";
import { TitleProps } from './interface';
import { Helmet } from "react-helmet-async";
import { titles } from "../../pages/route";
import { useLocation } from "react-router-dom";

const Title : React.FC<TitleProps> = () => {
  const { pathname } = useLocation();

  return (
    <>
      <Helmet>
        <title>{`${titles[pathname] || "404 Page Not Found"} - ${document.title}`}</title>
      </Helmet>
    </>
  );  
}

export default Title;