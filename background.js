//Listens for clicking action on Toolbar
browser.browserAction.onClicked.addListener(function (tab) {
	//inject the "everyone.js" file & execute it
	browser.tabs.executeScript({
		file: '/everyone.js'
	});
});

