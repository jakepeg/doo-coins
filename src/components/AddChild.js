import * as React from "react";
import ImageUpload from "./ImageUpload";

const AddChild = (props) => {

  return (
      <form onSubmit={props.handleAddChild}>
          <label htmlFor="child_name">
            Name<br /><br />
            <input type="text" name="child_name" autoComplete="name" />
          </label>
          <br /><br />
          <ImageUpload
          child_id={props.childID}
         />

        <button type="submit">Add Child</button>
      </form>
  );
};

export default AddChild;