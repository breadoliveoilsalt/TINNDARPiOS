import React from 'react'
import { shallow, mount } from 'enzyme'
import SplashScreen from './src/components/SplashScreen'
import TINNDARP from './src/main'
import * as apiRequests from './src/api/apiRequests'

import App from './App'

describe('<App />', () => {

  let wrapper 
  beforeEach(() => {
    wrapper = shallow(<App />)
  })

  it("renders with the App in an unready state by default", async () => {
    expect(wrapper.state().appIsReady).toEqual(false)
  })

  it("renders <SplashScreen /> while the App is not ready", async () => {
    expect(wrapper.state().appIsReady).toEqual(false)
    expect(wrapper.find(SplashScreen).length).toEqual(1)
    expect(wrapper.find(TINNDARP).length).toEqual(0)
  })

  it("renders <TINNDARP /> when the App is ready", async () => {
    wrapper.setState({appIsReady: true})
    
    expect(wrapper.find(SplashScreen).length).toEqual(0)
    expect(wrapper.find(TINNDARP).length).toEqual(1)
  })

  it("warms up the backend when it mounts", async () => {
    const instance = wrapper.instance()
    jest.spyOn(instance, 'warmUpBackend')
    instance.componentDidMount()
    expect(instance.warmUpBackend).toHaveBeenCalledTimes(1)
  })

  describe("warmUpBackend()", () => {

    it("calls an api request to wake up the backend in case it is sleeping", async () => {
      jest.spyOn(apiRequests, "wakeUpAPI").mockImplementation(() => Promise.resolve({data: ["item 1", "item 2"]}))

      wrapper.instance().warmUpBackend()

      expect(apiRequests.wakeUpAPI).toHaveBeenCalledTimes(1)
    })

    it("sets sets the app's state to ready when wakeUpAPI() resolves", async () => {
      jest.spyOn(apiRequests, "wakeUpAPI").mockImplementation(() => Promise.resolve({data: ["item 1", "item 2"]}))

      expect(wrapper.state().appIsReady).toEqual(false)

      wrapper.instance().warmUpBackend()
        .then(() => expect(wrapper.state().appIsReady).toEqual(true))
    })
    
  })

})
