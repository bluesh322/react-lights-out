import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Cell from "./Cell";

it("smoke test Carousel component", () => {
  render(<Cell/>);
});

it("snapshot test for Carousel component", () => {
    const {asFragment} = render(<Cell />);
    expect(asFragment()).toMatchSnapshot();
})