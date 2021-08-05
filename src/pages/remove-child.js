import * as React from "react";

const ChildList = () => {

  const [actor, setActor] = React.useState(null);

  React.useEffect(() => {
    import("../actor").then((module) => {
      setActor(module.default);
    });
  }, []);




  function getChild(e) {
    e.preventDefault();
    const child = e.target.querySelector('input[name="child_id"]').value;

    actor?.removeChild(child).then((returnedChild) => {
      if (!returnedChild.length) {
        return alert("No children with that ID");
      }

      console.log(returnedChild);
    });
    return false;
  }

  return (
    <>
      <title>DooCoins - Remove Child</title>
      <h1>Remove Child</h1>

      <section>
        <h2>Look up a child to remove</h2>
        <form onSubmit={getChild}>
          <label htmlFor="child_id">
            <input type="text" name="child_id" id="child_id" />
          </label>
          <button type="submit">Delete</button>
        </form>
      </section>


    </>
  );
};

export default ChildList;