import Toggle from "./Toggle";

import sun from "../../images/sun.png";
import moon from "../../images/moon.png";

/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";

const Switch = ({ handleThemeChange, isDark }) => {
  return (
    <Container>
      <Toggle
        icons={{
          checked: (
            <img
              src={moon}
              width="16"
              height="16"
              role="presentation"
              style={{ pointerEvents: "none" }}
              alt="moon icon"
            />
          ),
          unchecked: (
            <img
              src={sun}
              width="16"
              height="16"
              role="presentation"
              style={{ pointerEvents: "none" }}
              alt="sun icon"
            />
          )
        }}
        checked={!isDark}
        onChange={handleThemeChange}
      />
    </Container>
  );
};

export default Switch;

const Container = styled.div`
  float: right;
  margin-top: -60px;
  @media screen and (max-width: 750px) {
    margin-top: -53px;
  }
  @media screen and (max-width: 360px) {
    margin-top: -48px;
  }
`;
