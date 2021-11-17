import React from "react";
import { useToggle } from "react-use";
import c from "classnames";

export const Input = React.memo(({ label, ...rest }) => {
  const [active, toggle] = useToggle(false);
  return (
    <div className="mb-3 w-full">
      <p className="mb-3">{label}</p>
      <input
        {...rest}
        className={c(
          "w-full outline-none p-2 rounded",
          active ? "bg-gray-100" : "bg-gray-200"
        )}
        onBlur={toggle}
        onFocus={toggle}
      />
    </div>
  );
});
