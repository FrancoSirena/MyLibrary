import React from 'react';
import {render} from 'react-dom';
import SearchApi from './SearchApi';  
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
render(
	<MuiThemeProvider>
		<div>
			<div className="left"/>
			<div className="right">
				<SearchApi />
			</div>
		</div>
	</MuiThemeProvider>,
	document.getElementById('container')
)
