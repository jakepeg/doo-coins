import * as React from "react";
import play from '../images/play.svg';

const ChildList = (props) => {

  const str = props.myChildren.slice(8, -3)
  const myChildren = str.split("},{");
  function addDefaultSrc(ev){
    ev.target.src = 'https://res.cloudinary.com/jakepeg/image/upload/c_scale,r_25,w_50/v1630748310/profil_pic_ktj7w8.jpg';
  }




  return (
      <>
        {/* {
            props.myChildren.map((child, index) => 
              <div className="list-row" key={index} onClick={() => childClicked(child.slice(0, 1))}>
                <div className="list-col-image"><img src={`https://res.cloudinary.com/jakepeg/image/upload/c_scale,r_25,w_50/v1629446547/doozone/${child.slice(0, 1)}.jpg`} alt="profile pic" className="profile-img" /></div>
                <div className="list-col-name"><p>{child.slice(1, 2).toString().substring(2, child.slice(1, 2).toString().length - 4)}</p></div>
                <div className="list-col-image"><img src={play} className="play-img" alt="right arrow" /></div>
              </div>
            )
          } */}

          {/* https://res.cloudinary.com/jakepeg/image/upload/v1629451815/doozone/2vxsx-fae-1.jpg
          https://res.cloudinary.com/jakepeg/image/upload/v1629446547/doozone/2vxsx-fae-1.jpg */}

          {
            myChildren.map((child, index) => 
              <div className="list-row" key={index} onClick={() => props.getChild(child.substring(6, 17), child.slice(27,-1))}>
                {/* <div className="list-col-image"><img src="https://res.cloudinary.com/jakepeg/image/upload/c_scale,r_25,w_50/v1630748310/profil_pic_ktj7w8.jpg" alt="profile pic" className="profile-img" /></div> */}
                <div className="list-col-image"><img onError={addDefaultSrc} alt="profile pic" className="profile-img" src={`https://res.cloudinary.com/jakepeg/image/upload/c_scale,r_25,w_50/v1630748310/doozone/${child.substring(6, 17)}.jpg`}/></div>
                <div className="list-col-name"><p>{child.slice(27,-1)}</p></div>
                <div className="list-col-image"><img src={play} className="play-img" alt="right arrow" /></div>
              </div>
            )
          }
      </>
  );
};

export default ChildList;