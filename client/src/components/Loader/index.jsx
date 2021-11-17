import React from "react";
import Lottie from "react-lottie";
import calendar from "assets/lotties/calendar.json";
import box from "assets/lotties/box.json";
import bird from "assets/lotties/bird_load.json";

function Loader(props) {
  const { className, height = 400, width = 400, type = "standard" } = props;

  const defaultOptions = React.useMemo(
    () => ({
      loop: true,
      autoplay: true,
      animationData: type === "comp" ? box : type === "bird" ? bird : calendar,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    }),
    [type]
  );
  return (
    <div className={className}>
      <Lottie height={height} options={defaultOptions} width={width} />
    </div>
  );
}

export default React.memo(Loader);
