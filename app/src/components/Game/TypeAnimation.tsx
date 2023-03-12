import { TypeAnimation } from "react-type-animation";

const TypeComponent = () => {
  return (
    <div className="flex flex-col gap-4 mb-4">
      <TypeAnimation
        sequence={[
          "You are a superhero resident of a city that needs help.",
          2000,
          "Your goal is to prevent the city from decay, destruction, and tryanny.",
          2000,
          "Choose one to play:",
          2000,
          () => {
            console.log("Done typing!");
          },
        ]}
        wrapper="div"
        cursor={false}
        repeat={4}
        style={{ fontSize: "1.75em" }}
        className={"flex text-lg"}
      />
    </div>
  );
};

export default TypeComponent;
