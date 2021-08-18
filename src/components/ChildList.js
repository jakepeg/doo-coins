import * as React from "react";
import './childlist.css';

const ChildList = () => {

  const [actor, setActor] = React.useState(null);
  const [myChildren, setChildren] = React.useState([]);

  function getMyChildren() {
    actor?.getChildren().then((returnedChilren) => {
      if (!returnedChilren.length) {
        return alert("No children - please add a child to begin");
      }
      setChildren(returnedChilren);
      console.log(myChildren);
    });
    return false;
  }

  React.useEffect(() => {
    import("../declarations/doocoins")
    .then((module) => {setActor(module.doocoins)})
  }, []);

  React.useEffect(() => {
    getMyChildren();
  }, [actor]);

  // function getChild(e) {
  //   e.preventDefault();
  //   const child = e.target.querySelector('input[name="child_id"]').value;

  //   actor?.getChild(child).then((returnedChild) => {
  //     if (!returnedChild.length) {
  //       return alert("No children with that ID");
  //     }

  //     console.log(child);
  //     console.log(returnedChild);
  //   });
  //   return false;
  // }

  return (
      <section>
        <h2>My Children</h2>
        <ul>
          {
            myChildren.map((child, index) => 
              <li key={index} id={child.slice(0, 1)}>
                <a href={child.slice(0, 1)}>{child.slice(1, 2).toString().substring(2, child.slice(1, 2).toString().length - 4)}</a>
              </li>
            )
          }
        </ul>
      </section>
  );
};

export default ChildList;