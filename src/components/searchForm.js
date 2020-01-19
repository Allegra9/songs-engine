import SearchIcon from "@material-ui/icons/Search";

/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";

const SearchForm = ({
  handleSubmit,
  handleInputChange,
  searchQuery,
  isDark
}) => {
  const purple = "#670E99";
  const lilac = "#E5C3EE";
  return (
    <Container>
      <FormContainer onSubmit={handleSubmit}>
        <SearchIcon style={{ color: isDark ? lilac : purple }} />
        <input
          type="text"
          placeholder="Type a name of a song..."
          onChange={handleInputChange}
          value={searchQuery}
          name="searchQuery"
          autoFocus
        />
        <button type="submit" style={{ cursor: "pointer" }}>
          Search
        </button>
      </FormContainer>
    </Container>
  );
};

export default SearchForm;

const mont = "Montserrat, serif";
const light = 400;
const medium = "16px";

const Container = styled.div`
  padding: 30px 0 10px 0;
`;

const FormContainer = styled.form`
  margin-bottom: 20px;
  input {
    font-family: ${mont};
    color: grey;
    font-size: ${medium};
    font-weight: ${light};
    background: transparent;
    border: 0 !important;
    border-bottom: 1px solid ${props => props.theme.style1Color} !important;
    width: 250px;
    padding: 10px;
    padding-bottom: 6px;
    margin-right: 6px;
    &:focus {
      outline: none !important;
    }
    ::placeholder {
      color: grey;
    }
  }
  button {
    background: ${props => props.theme.style1Color};
    color: ${props => props.theme.buttonTextColor};
    border: 0;
    border-radius: 5px;
    padding: 10px 40px;
    font-size: ${medium};
    font-weight: ${light};
    &:focus {
      outline: none !important;
    }
    &:hover {
    }
  }
`;
