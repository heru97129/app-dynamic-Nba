// @flow
import * as React from 'react';
import { useState, createContext } from "react";
import Menu from '../menu/Menu.js'
const UserContext = createContext()


export default function layout(props) {
  return (
 <>
    <Menu />
    {props.children}
    </>
   );
};