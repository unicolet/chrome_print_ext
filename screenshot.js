// Copyright (c) 2011 Umberto Nicoletti. All rights reserved.
// Use of this source code is licensed under LGPL. 
// Code copied and then extensively modified from the screenshot Chrome example.

// To make sure we can uniquely identify each screenshot tab, add an id as a
// query param to the url that displays the screenshot.
var id = 100;

function takeScreenshot() {
  var w,h;
  chrome.windows.getCurrent(function (win) {
	  chrome.tabs.captureVisibleTab(win.id,{"format":"jpeg"},function(img) {
	  	if(!img) {
	  		alert('Impossibile stampare la pagina corrente.');
	  		return;
		}
		var screenshotUrl = img;
		var viewTabUrl = [chrome.extension.getURL('screenshot.html'),'?id=', id++].join('');
	    var targetId = null;

		var onRequestListener=function(request, sender, sendResponse) {
			console.log(sender.tab ?
						"from a content script:" + sender.tab.url + " = " + request.w:
						"from the extension");
			if (request.w && request.h) {
			  w=request.w;
			  h=request.h;
			  
			  chrome.extension.onRequest.removeListener(onRequestListener);
			  
			  console.log("About to create tab with url: "+viewTabUrl);
			  chrome.tabs.create({url: viewTabUrl}, function(tab) {
				  targetId = tab.id

				  console.log("A new tab was created, its id = targetId = "+targetId);
				});
			}
		};

		chrome.extension.onRequest.addListener(onRequestListener);
		
		var addSnapshotImageToTab = function(tabId, changedProps, changedTab) {
			console.log("While waiting for ("+targetId+") a tab was updated: "+tabId+" status="+changedProps.status);
			// We are waiting for the tab we opened to finish loading.
			// Check that the the tab's id matches the tab we opened,
			// and that the tab is done loading.
			if (tabId != targetId || changedProps.status != "complete") {  
			  return;
			}

			// Passing the above test means this is the event we were waiting for.
			// There is nothing we need to do for future onUpdated events, so we
			// use removeListner to stop geting called when onUpdated events fire.
			chrome.tabs.onUpdated.removeListener(addSnapshotImageToTab);

			// Look through all views to find the window which will display
			// the screenshot.  The url of the tab which will display the
			// screenshot includes a query parameter with a unique id, which
			// ensures that exactly one view will have the matching URL.
			var views = chrome.extension.getViews();
			for (var i = 0; i < views.length; i++) {
			  var view = views[i];
			  console.log("checking view: "+view.location.href);
			  if (view.location.href == viewTabUrl) {
			  	var top=(localStorage["offset_top"]?localStorage["offset_top"]:44);
			  	console.log("sending screenshot to "+view.location.href);
				view.setScreenshotUrl(screenshotUrl,w,h,top);
				break;
			  }
			}
		  };
				  
	    console.log("Adding addSnapshotImageToTab listener");
	    chrome.tabs.onUpdated.addListener(addSnapshotImageToTab);
	   
		chrome.tabs.executeScript(null, {code: "var aa__my_tmp_map=document.getElementById('"+(localStorage["ol_id"]?localStorage["ol_id"]:'olmap')+"');chrome.extension.sendRequest({w: aa__my_tmp_map.offsetWidth,h: aa__my_tmp_map.offsetHeight}, function(response) {console.log(response);});"});
	  });
  }); 
};

// Listen for a click on the ext button
chrome.browserAction.onClicked.addListener(function(tab) {
  //if (tab.url.match(/code.google.com/)) {
    takeScreenshot();
  //} else {
  //  alert('This sample can only take screenshots of code.google.com pages');
  //}
});
