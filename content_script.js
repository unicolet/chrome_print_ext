var map=document.getElementById( (localStorage["ol_id"]?localStorage["ol_id"]:'olmap' ) );chrome.extension.sendRequest({w: map.offsetWidth,h: map.offsetHeight}, function(response) {});
