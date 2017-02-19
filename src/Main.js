import * as React from 'react';
import * as ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {green100, green500, green700} from 'material-ui/styles/colors';

import { Content } from './components/Content';


const App = () => (
  <MuiThemeProvider>
    <Content />
  </MuiThemeProvider>
);
ReactDOM.render(<App />, document.getElementById('main'));
