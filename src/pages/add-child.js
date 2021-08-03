import * as React from "react";

// markup
const Child = () => {
  const [image, setImage] = React.useState("");
  const [actor, setActor] = React.useState(null);

  React.useEffect(() => {
    import("../actor").then((module) => {
      setActor(module.default);
    });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const inputs = e.target.querySelectorAll("input");
    const child_id = e.target.querySelector('input[name="child_id"]').value;
    const child_name = e.target.querySelector('input[name="child_name"]').value;
    const child_photo = e.target.querySelector('input[name="child_photo"]').value;

    // card.add("photo", btoa(image), { mediatype: "image/gif" });

    // actor?.set(child_id, child_name, child_photo).then(() => {
      actor?.set(child_id, child_name).then(() => {
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
<>
      <title>DooCoins - Add a Child</title>
      <h1>Add a Child</h1>


      <form onSubmit={handleSubmit}>


          <label htmlFor="child_name">
            Name
            <input type="text" name="child_name" autoComplete="name" />
          </label>
          <br />
          <label htmlFor="child_id">
            Child ID
            <input type="text" name="child_id" autoComplete="child id" />
          </label>
          <br />
          <label htmlFor="child_photo">
            Profile picture
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
          <br />
          <input type="hidden" name="wallet_balance" value="0" />
        <button type="submit">Add Child</button>
      </form>
</>
  );
};

export default Child;