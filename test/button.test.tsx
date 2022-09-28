import { assert, describe, it } from "vitest";
import { render } from "@testing-library/react";
import SButton from "../src/button/index";
import React from "react";
describe("test displayer", () => {
  it("load and click gray button", () => {
    const { getByTestId } = render(<SButton color="red">红色按钮</SButton>);
  });
});
