import * as React from "react";
import './childlist.css';

const ChildList = (props) => {

  const [actor, setActor] = React.useState(null);
  // const actor = props.myactor;
  console.log(props.myactor);
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

  // /${activity.image}`} alt={activity.name}

  return (
      <div>
        <h2>My Children</h2>
        {
            myChildren.map((child) => 
<div className="row child-list">
          <div className="col grid_1_of_4"><img src={`https://res.cloudinary.com/jakepeg/image/upload/c_scale,r_25,w_50/v1629446547/doozone/${child.slice(0, 1)}.jpg`} /></div>
          <div className="col grid_1_of_4">{child.slice(1, 2).toString().substring(2, child.slice(1, 2).toString().length - 4)}</div>
          <div className="col grid_1_of_4"> Balance: 0 </div>
          <div className="col grid_1_of_4"> {child.slice(0, 1)} </div>
</div>
            )
          }

        {/* <ul>
          {
            myChildren.map((child, index) => 
              <li key={index} id={child.slice(0, 1)}>
                <a href={child.slice(0, 1)}>{child.slice(1, 2).toString().substring(2, child.slice(1, 2).toString().length - 4)}</a>
              </li>
            )
          }
        </ul> */}
      </div>
  );
};

export default ChildList;