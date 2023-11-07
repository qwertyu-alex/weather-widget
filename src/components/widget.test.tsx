/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";

import {
  ClientWidget,
  ClientWidgetInternalError,
  ClientWidgetNotFound,
} from "./widget";

it("ClientWidget renders corectly on no props", () => {
  render(
    <ClientWidget
      cityName="Copenhagen"
      humidity={10}
      temperature={10}
      wind={10}
    />
  );
  expect(screen.getByText("Weather in")).toBeInTheDocument();
  expect(screen.getByText("Copenhagen")).toBeInTheDocument();
});

it("ClientWidget renders corectly on no props", () => {
  render(<ClientWidgetNotFound q={"NotARealCity"} />);
  expect(
    screen.getByText('"NotARealCity" not found. Please search for another city')
  ).toBeInTheDocument();
});

it("ClientWidget renders corectly on no props", () => {
  render(
    <ClientWidgetInternalError
      error={{
        status: 500,
        message: "We are under attack!",
      }}
      q={"Copenhagen"}
    />
  );
  expect(
    screen.getByText("ERROR: 500 We are under attack!")
  ).toBeInTheDocument();
});
