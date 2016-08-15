var jsUtil = (function ()
{
	function loadCSS ( url ) 
	{
	    var css = document.createElement("link");
	    css.type = "text/css";
	    css.rel = "stylesheet";
	    css.href = url;

	    document.head.appendChild(css);
	}

	function loadJS ( url, onLoadFunc )
	{
		var script = document.createElement("script");
	    script.type = "text/javascript";
	    script.src = url;
	    script.onload = onLoadFunc;

	    document.head.appendChild(script);
	}

	function loadJSONP ( url, callback, params ) 
	{
		if ( params != undefined )
		{
			loadJS( url + "&callback=" + callback + "&" + params );
		}
		else
		{
			loadJS( url + "&callback=" + callback );
		}
	}

	function removeChildren( element )
    {
    	if ( element == null )
    	{
    		return;
    	}

    	while ( element.firstChild ) 
        {
            element.removeChild( element.firstChild );
        }
    }

    function addText( element, text, defaultText )
    {
    	if ( element != null )
        {
        	element.appendChild( document.createTextNode( ( text != null ) ? text : defaultText ) );
        }
    }

    function updateText( element, text )
    {
    	removeChildren( element );
    	addText( element, text );
    }

	return {
		loadJSONP,
		loadJS,
		loadCSS,
		removeChildren,
		addText,
		updateText
	};
})();