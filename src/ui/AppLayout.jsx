import { Outlet } from "react-router";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import isPropValid from "@emotion/is-prop-valid";
import { StyleSheetManager } from "styled-components";

// By convention all styled components are named in this form StyledComponentName
const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  // This convert page to auto-scalable
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const shouldForwardProp = (propName, target) => {
  if (typeof target == "string") {
    return isPropValid(propName);
  }
  return true;
};

function AppLayout() {
  return (
    <StyledAppLayout>
      <StyleSheetManager shouldForwardProp={shouldForwardProp}>
        <Header />
        <Sidebar />
        <Main>
          <Container>
            <Outlet />
          </Container>
        </Main>
      </StyleSheetManager>
    </StyledAppLayout>
  );
}

export default AppLayout;
