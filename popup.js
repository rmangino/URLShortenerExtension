chrome.tabs.getSelected(null, function(tab) 
{
	var textInput = document.getElementById("shorturl");

	var regex = new RegExp("^(http|https)");
	if (false == regex.test(tab.url))
	{
		textInput.value = "Unsupported URL Type";
		return;
	}

	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("POST", "https://www.googleapis.com/urlshortener/v1/url", true);
	xmlHttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");

	// JSON-ify our request data
	var req = new Object();
	req.longUrl = tab.url;
	var jsonStr = JSON.stringify(req);

	xmlHttp.onreadystatechange = function()
	{
		if (xmlHttp.readyState == 4) 
		{
			var jsonResultObject = JSON.parse(xmlHttp.responseText);
			var shortURL = jsonResultObject.id;

			// Update the textarea on the html popup
			textInput.value = shortURL;
			textInput.select();
		}
	}

	xmlHttp.send(jsonStr);
});