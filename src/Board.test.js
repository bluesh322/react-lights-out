import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Board from "./Board";

it("smoke test Carousel component", () => {
  render(<Board/>);
});

it("snapshot test for Carousel component when all lights are lit", () => {
    const {asFragment} = render(<Board nrows={5} ncols={5} chanceLightStartsOn={1}/>);
    expect(asFragment()).toMatchSnapshot();
})

it("snapshot test for when none of the lights are lit --> You Win!", () => {
    const {asFragment} = render(<Board nrows={5} ncols={5} chanceLightStartsOn={0}/>);
    expect(asFragment()).toMatchSnapshot();
})

it("check if cell clicking is switching the correct lights", () => {
    const { getAllByRole} = render(<Board nrows={3} ncols={3} chanceLightStartsOn={1}/>);
    const cells = getAllByRole("button");

    // all cells start out as lit
    cells.forEach(cell => {
    expect(cell).toHaveClass("Cell-lit");
    });

    // click on the middle cell
    fireEvent.click(cells[4]);
    
    // now only cells at the corners should be lit
    let litIndices = [0, 2, 6, 8];
    cells.forEach((cell, idx) => {
    if (litIndices.includes(idx)) {
        expect(cell).toHaveClass("Cell-lit");
    } else {
        expect(cell).not.toHaveClass("Cell-lit");
    }
    });
});