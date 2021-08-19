import * as React from "react";

const Child = () => {
  const [child, setChild] = React.useState("");
  const [actor, setActor] = React.useState(null);

  React.useEffect(() => {
    import("../declarations/doocoins").then((module) => {
      setActor(module.doocoins);
    });
  }, []);

  return (
    <section>
      <h2>Child Name</h2>

    </section>
  );
};

export default Child;