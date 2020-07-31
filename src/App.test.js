import React from 'react';
import { shallow, mount, render } from 'enzyme';
import App from './App';

describe('Login Form', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<App/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should get correct email & password', () => {
    const wrapper = shallow(<App />);

    const message = wrapper.find("#message");
    const email = wrapper.find("#email-input");
    const password = wrapper.find("#password-input");
    email.simulate("change", { target: { name: "email", value: "eve.holt@reqres.in" } });
    password.simulate("change", { target: { name: "password", value: "cityslicka" } })

    expect(message.hasClass('error')).toBe(false);
  });
});
