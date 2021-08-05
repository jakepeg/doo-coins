import * as React from "react";
import ChildList from "../components/ChildList";
import AddChild from "../components/AddChild";

const IndexPage = () => {

  return (
    <>
      <title>DooCoins</title>
      <h1>DooCoins</h1>
      <section>
        <ChildList />
      </section>
      <section>
        <AddChild />
      </section>
    </>
  );
};

export default IndexPage;