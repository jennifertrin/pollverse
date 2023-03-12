import { TypeAnimation } from "react-type-animation";

const TypeComponent = () => {
  return (
    <div className="flex flex-col gap-4 mt-6">
      <TypeAnimation
        sequence={[
          "You are a superhero resident of a city that needs help.",
          1000,
          () => {
            console.log("Done typing!");
          },
        ]}
        wrapper="div"
        cursor={false}
        repeat={Infinity}
        style={{ fontSize: "1.75em" }}
        className={'flex text-xl'}
      />
      <TypeAnimation
        sequence={[
          "Your goal is to prevent the city from decay, destruction, and tryanny.",
          2000,
          () => {
            console.log("Done typing!");
          },
        ]}
        wrapper="div"
        cursor={false}
        repeat={Infinity}
        style={{ fontSize: "1.75em" }}
        className={'flex text-xl'}
      />
    </div>
  );
};

export default TypeComponent;
