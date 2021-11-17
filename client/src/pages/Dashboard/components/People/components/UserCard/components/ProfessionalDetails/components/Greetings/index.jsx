import React from "react";
import CorrectAnimation from "react-lottie";
import animationData from "assets/lotties/correct.json";
import { useEffectOnce } from "react-use";

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

function Greetings(props) {
  const { toggle } = props;

  useEffectOnce(() => {
    const intervalID = setTimeout(toggle, 3000);
    return () => clearInterval(intervalID);
  });

  return (
    <div className="grid place-items-center p-3 py-10">
      <CorrectAnimation height={100} options={defaultOptions} width={100} />
      <p>Appointment successfully created</p>
    </div>
  );
}

export default React.memo(Greetings);
