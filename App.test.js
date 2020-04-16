/* @jest-environment jsdom */

import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'

import App from './App'

describe('<App />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(< App />).toJSON();
    expect(tree.children.length).toBe(2);
  })
  
  it("has the word 'start'", () => {
    const wrapper = mount(<App/>)
    const container = wrapper.findWhere(
      (node) => node.prop("testID") === "text"
    )
    expect(container.at(1).text()).toContain("start")
  })
})