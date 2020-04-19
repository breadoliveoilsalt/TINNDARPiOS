import React from 'react'
import ProvideCredentialsView from './userAccount/ProvideCredentialsView'
import UserAuthenticatedView from './userAccount/UserAuthenticatedView'

const TINNDARP = (props) => {

  if (props.tokenExists) { 
    return <UserAuthenticatedView items={props.items} />
  } else {
    return <ProvideCredentialsView /> 
  }
  
}

export default TINNDARP
