import * as React from "react";
import ChildList from "../components/ChildList";
import AddChild from "../components/AddChild";
import RemoveChild from "../components/RemoveChild";


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
      </section>

      <section>
        <RemoveChild />
      </section>


    </>
  );
};

export default IndexPage;