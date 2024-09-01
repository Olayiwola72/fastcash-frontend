import React from "react";
import { TitleProps } from './interface';
import { Helmet } from "react-helmet-async";
import { titles } from "../../pages/route";
import { useLocation } from "react-router-dom";
import { APP_NAME } from "../../constants/env";

const Title : React.FC<TitleProps> = () => {
  const { pathname } = useLocation();

  return (
    <>
      {
        APP_NAME &&
          <Helmet>
            <title>{`${titles[pathname] || "404 Page Not Found"} - ${APP_NAME}`}</title>
        </Helmet>
      }
    </>
  );  
}

export default Title;