// import { render, screen } from '@testing-library/react';
import enzyme, { shallow } from "enzyme";
import AcceptButton from "./index";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

enzyme.configure({ adapter: new Adapter() });

test("renders learn react link", () => {
  const acceptButton = shallow(<AcceptButton />);
//   const linkElement = screen.getByText(/Loading/i);
  expect(acceptButton.exists()).toBe(true);
});
