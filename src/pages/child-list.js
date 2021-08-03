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

    actor?.get(child).then((returnedChild) => {
      if (!returnedChild.length) {
        return alert("No children with that ID");
      }

      console.log(returnedChild);
    });
    return false;
  }

  return (
    <>
      <title>DooCoins - Child list</title>
      <h1>Child List</h1>

      <section>
        <h2>Look up a child</h2>
        <form onSubmit={getChild}>
          <label htmlFor="child_id">
            <input type="text" name="child_id" id="child_id" />
          </label>
          <button type="submit">Search</button>
        </form>
      </section>


    </>
  );
};

export default ChildList;