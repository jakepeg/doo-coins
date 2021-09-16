import * as React from "react";
// import ImageUpload from "./ImageUpload";

const AddChild = (props) => {

  return (
      <form onSubmit={props.handleAddChild}>
        <div className="form">
          <label htmlFor="child_name">
            Name <input type="text" name="child_name" />
          </label>

          {/* <ImageUpload
          child_id={props.childID}
         /> */}

        <button className="button" type="submit">Add</button>
      </div>
    </form>
  );
};

export default AddChild;