import * as React from "react";
import styled from "styled-components";

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

const ContactCard = ({ card }) => {
  if (!card || !card.data) return null;
  return (
    <section>
      <DataList>
        {Object.entries(card.data).map(([key, value]) => {
          const [_field, _data] = value;
          console.log(value);
          if (value._field === "photo") {
            return (
              <React.Fragment key={value._field}>
                <dt>{value._field}</dt>
                <dd>
                  <ProfilePicture>
                    <img
                      style={{ maxWidth: "75px" }}
                      src={atob(value._data)}
                      alt="profile"
                    />
                  </ProfilePicture>
                </dd>
              </React.Fragment>
            );
          } else {
            return (
              <>
                <dt>{value._field}</dt>
                <dd>{value._data}</dd>
              </>
            );
          }
        })}
      </DataList>

    </section>
  );
};

export default ContactCard;