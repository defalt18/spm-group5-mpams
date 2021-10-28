import React from "react";
import c from "classnames";

function Page(props) {
  const { className, children } = props;
  return <div className={c("h-screen w-screen", className)}>{children}</div>;
}

export default React.memo(Page);
