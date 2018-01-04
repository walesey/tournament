import React from 'react';

const Html = ({ children, title, stylesheets, scripts, initialState }) => (
	<html>
		<head>
			<title>{title}</title>
			<meta name="viewport" content="width=device-width"></meta>
			{stylesheets && stylesheets.map(stylesheet => <link href={stylesheet} rel='stylesheet'/>)}
		</head>
		<body>
			<div id='content'>
				{children}
			</div>
		</body>
		<script dangerouslySetInnerHTML={{__html: `window.__initialState = ${initialState};`}}></script>
		{scripts && scripts.map(scriptSrc => <script src={scriptSrc}></script>)}
	</html>
);

export default Html;