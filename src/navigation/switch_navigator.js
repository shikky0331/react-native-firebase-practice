import React from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import Login from '../screens/login'
import Signup from '../screens/sign_up'
import IssueList from '../screens/issue_list'

const SwitchNavigator = createSwitchNavigator(
  {
    Login: {
      screen: Login
    },
    Signup: {
      screen: Signup
    },
    IssueList: {
      screen: IssueList
    }
  },
  {
    initialRouteName: 'Login'
  }
)

export default createAppContainer(SwitchNavigator)
