import * as React from "react";
import uuid from 'react-uuid'

const AddChild = () => {
  const [image, setImage] = React.useState("");
  const [actor, setActor] = React.useState(null);

  React.useEffect(() => {
    import("../declarations/doocoins").then((module) => {
      setActor(module.doocoins);
    });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const inputs = e.target.querySelectorAll("input");
    const child_id =  uuid();
    const child_name = e.target.querySelector('input[name="child_name"]').value;
    const child_info = [];
    const wallet_balance = 0
    child_info.push(child_name);
    child_info.push(wallet_balance);

    if (image) {
      child_info.push(btoa(image));
    }
      actor?.addChild(child_id, JSON.stringify(child_info)).then(() => {
      alert("Child Added!");
      // clear the form
      inputs.forEach((input) => {
        input.value = "";
      });
      setImage("");
    });

    return false;
  }

  function handleUpload(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      function () {
        // convert image file to base64 string
        setImage(reader.result);
      },
      false
    );
    if (file) {
     reader.readAsDataURL(file);
    }
  }

  return (
    <section>
      <h2>Add a child</h2>
      <form onSubmit={handleSubmit}>
          <label htmlFor="child_name">
            Name
            <input type="text" name="child_name" autoComplete="name" />
          </label>
          <br /><br />
          <label htmlFor="child_photo">
            Profile picture<br /><br />
            <input
              type="file"
              id="img"
              name="child_photo"
              accept="image/*"
              onChange={handleUpload}
            />
          </label>
          {image ? (

              <img src={image} alt="profile pic" />

          ) : null}
          <br /><br />
        <button type="submit">Add Child</button>
      </form>
    </section>
  );
};

export default AddChild;