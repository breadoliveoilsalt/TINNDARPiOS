import React from 'react'
import { shallow } from 'enzyme'
import SplashScreen from './src/components/SplashScreen'
import TINNDARP from './src/main'
import App from './App'
import * as apiRequests from './src/api/apiRequests'

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
    jest.spyOn(instance, 'warmUp')
    instance.componentDidMount()
    expect(instance.warmUp).toHaveBeenCalledTimes(1)
  })

  describe("warmUp()", () => {

    const mockData = {data: ["item 1", "item 2"]}

    it("calls an api request to wake up the backend in case it is sleeping", async () => {
      jest.spyOn(apiRequests, "wakeUpAPI").mockResolvedValue(mockData)

      wrapper.instance().warmUp()

      expect(apiRequests.wakeUpAPI).toHaveBeenCalledTimes(1)
    })

    it("delays the ready state to add a pause to the SplashScreen if the api response is fast", async () => {
      const instance = wrapper.instance()
      jest.spyOn(instance, 'delayReadyState')
      jest.spyOn(apiRequests, "wakeUpAPI").mockResolvedValue(mockData)

      return wrapper.instance().warmUp()
        .then(() => {
          expect(instance.delayReadyState).toHaveBeenCalledTimes(1)
        })
    })

  })

})
