import { Outlet, Link } from "react-router-dom";
import { Box, Row } from "../components/Layout";
import styled from "styled-components";

export default function Home() {
  return (
    <div>
      {/* <h1>CoLoSo</h1>
      <nav>
        <Row>
          <Link to="/">home</Link>

          <Link to="/landing">landing</Link>

          <Link to="/generator">generator</Link>

          <Link to="/generator-flower">generator flower</Link>

          <Link to="/gallery">gallery</Link>
        </Row>
      </nav>
      <hr /> */}

      <Outlet />
    </div>
  );
}
