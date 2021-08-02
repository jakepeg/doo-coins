import * as React from "react";
import styled from "styled-components";
import vCard from "vcf";

// styles
const Main = styled.main`
  color: "#232129";
  padding: 96;
  font-family: "-apple-system, Roboto, sans-serif, serif";
  width: fit-content;

  fieldset,
  label {
    display: flex;
    flex-direction: column;
  }
  input {
    min-width: 280px;
    width: fit-content;
  }
`;

const ProfilePicture = styled.picture`
  display: flex;
  width: 256px;
  img {
    width: 100%;
  }
`;

const DataList = styled.dl`
  display: grid;
  grid-template-columns: auto auto;
  dt,
  dd {
    /* width: fit-content; */
    display: inline-flex;
    border: 1px solid black;
    padding: 4px;
    margin: 0;
    padding-right: 16px;
  }
  picture,
  image {
    max-width: 75px;
  }
`;



// markup
const Child = () => {
  const [image, setImage] = React.useState("");
  const [card, setCard] = React.useState(null);
  const [actor, setActor] = React.useState(null);

  React.useEffect(() => {
    import("../actor").then((module) => {
      setActor(module.default);
    });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const card = new vCard();
    const inputs = e.target.querySelectorAll("input");
    const email = e.target.querySelector('input[name="email"]').value;
    inputs.forEach((input) => {
      if (input.name === "photo") return;
      else if (input.name === "n") {
        // Take full input and format for vcf
        const names = input.value.split(" ");
        const arr = new Array(5);

        names.reverse().forEach((name, idx) => {
          arr[idx] = name;
        });

        card.add("fn", input.value);
        card.add(input.name, arr.join(";"));
      } else {
        card.add(input.name, input.value);
      }
    });
    card.add("photo", btoa(image), { mediatype: "image/gif" });

    actor?.set(email, JSON.stringify(card.toJSON())).then(() => {
      alert("Child Added!");
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
    <Main>
      <title>DooCoins - Add a Child</title>
      <h1>Add a Child</h1>


      <form onSubmit={handleSubmit}>


          <label htmlFor="n">
            Name
            <input type="text" name="n" autoComplete="name" />
          </label>
          <br />
          <label htmlFor="email">
            Email
            <input required type="email" name="email" autoComplete="email" />
          </label>
          <br />
          <label htmlFor="photo">
            Profile picture
            <input
              type="file"
              id="img"
              name="photo"
              accept="image/*"
              onChange={handleUpload}
            />
          </label>
          {image ? (
            <ProfilePicture>
              <img src={image} alt="user-uploaded profile image" />
            </ProfilePicture>
          ) : null}
          <br />
        <button type="submit">Add Child</button>
      </form>
    </Main>
  );
};

export default Child;