import React from 'react'
import { render } from 'react-dom'

import M from 'materialize-css'

import 'materialize-css/dist/css/materialize.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import './index.css'

import { Root } from './containers'

render(<Root />, document.getElementById('root'));

M.AutoInit();
