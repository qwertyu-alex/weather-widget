/**
 * @jest-environment jsdom
 */
import { ClientWidget } from "@/components/widget";
import { render } from "@testing-library/react";

it("renders homepage unchanged", async () => {
  const { container } = render(<ClientWidget></ClientWidget>);
  expect(container).toMatchSnapshot();
});
