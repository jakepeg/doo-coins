import * as React from "react";
import play from '../images/play.svg';

const ChildList = (props) => {

function childClicked(childID) {
  console.log(childID)
}

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
      <>
        {
            props.myChildren.map((child, index) => 
              <div className="list-row" key={index} onClick={() => childClicked(child.slice(0, 1))}>
                <div className="list-col-image"><img src={`https://res.cloudinary.com/jakepeg/image/upload/c_scale,r_25,w_50/v1629446547/doozone/${child.slice(0, 1)}.jpg`} alt="profile pic" className="profile-img" /></div>
                <div className="list-col-name"><p>{child.slice(1, 2).toString().substring(2, child.slice(1, 2).toString().length - 4)}</p></div>
                <div className="list-col-image"><img src={play} className="play-img" alt="right arrow" /></div>
              </div>
            )
          }
      </>
  );
};

export default ChildList;