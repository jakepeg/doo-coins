import * as React from "react";
import ChildList from "../components/ChildList";
import AddChild from "../components/AddChild";
import ImageUpload from "../components/ImageUpload";

const IndexPage = () => {
  const [actor, setActor] = React.useState(null);

  React.useEffect(() => {
    import("../declarations/doocoins")
    .then((module) => {setActor(module.doocoins)})
  }, []);

  return (
    <>
      <title>DooCoins</title>
      <h1>DooCoins</h1>
      <section>
        <ChildList 
          myactor={actor}
        />
      </section>
      <section>
        <AddChild />
        <ImageUpload />
      </section>
    </>
  );
};

export default IndexPage;