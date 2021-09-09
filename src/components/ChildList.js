import * as React from "react";
import play from '../images/play.svg';

const ChildList = (props) => {
  const [actor, setActor] = React.useState(null);
  const [children, setChildren] = React.useState({});
  // const [childrenLoaded, setChildrenLoaded] = React.useState(false);

  function getChildren() {
    actor?.getChildren().then((returnedChilren) => {
        const children = Object.values(returnedChilren);
        // setChildrenLoaded(true);
        setChildren(children);
        console.log(children);
    });
     return false;
  }

  function addDefaultSrc(ev){
    ev.target.src = 'https://res.cloudinary.com/jakepeg/image/upload/c_scale,r_25,w_50/v1630748310/profil_pic_ktj7w8.jpg';
  }

  React.useEffect(() => {
    import("../declarations/doocoins")
    .then((module) => {setActor(module.doocoins)})
  }, []);

  React.useEffect(() => {
    getChildren();
  }, [actor]);

  return (
      <>
        {children.length > 0 &&
          children[0].map(child => (
            <div className="row" key={child.id} onClick={() => props.getChild(child.id)}>
              <div className="col-small"><img onError={addDefaultSrc} alt="profile pic" className="profile-img" src={`https://res.cloudinary.com/jakepeg/image/upload/c_scale,r_25,w_50/v1630748310/doozone/${child.id}.jpg`}/></div>
              <div className="col-medium"><p className="col-p">{child.name}</p></div>
              <div className="col-small"><img src={play} className="play-img" alt="right arrow" /></div>
            </div>
          ))
        }
      </>
  );
};

export default ChildList;