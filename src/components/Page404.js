import React from "react";
import history from "../history";
import Button from './common/Button'

const Page404 = () => {
  return (
    <div
      style={{
        width: "50%",
        height: "50%",
        position: "absolute",
        textAlign: "center",
        top: "50%",
        left: "50%",
        transform: "scale(1) translate(-50%, -50%)"
      }}
    >
      <h1>404</h1>
      {/* <h3>Запрашиваемая страница не найдена</h3> */}
      <Button onClick={() => history.goBack()}>Back</Button>
    </div>
  );
};

export default Page404;
