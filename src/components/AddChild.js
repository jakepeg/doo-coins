import * as React from "react";
import ImageUpload from "../components/ImageUpload";

const AddChild = (props) => {

  return (
    <section>
      <h2>Add a child</h2>
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
    </section>
  );
};

export default AddChild;