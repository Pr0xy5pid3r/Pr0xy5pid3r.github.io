class TwitchSearchController
{
	constructor ( searchURL, contentDiv, totalResultsSpan, pageNavigation ) 
	{
		this._searchURL = searchURL;
		this._contentDiv = contentDiv;
		this._totalResultsSpan = totalResultsSpan;
		this._pageNavigation = pageNavigation;
		this._modelList = [];
		this._viewList = [];
		this._selfURL = null;
		this._nextURL = null;
		this._prevURL = null;
		this._totalResultsNum = 0;
		this._totalPages = 0;
		this._queryLimit = 10;

		if ( this._contentDiv == null )
		{
			throw new Error( "Content Div is null" );
		}

		if ( this._totalResultsSpan == null )
		{
			throw new Error( "Total Results Span is null" );
		}

		//load our css
		jsUtil.loadCSS("css/twitch_search_content.css");

		//load up the js
		jsUtil.loadJS("scripts/mvc/twitch_search_model.js");
		jsUtil.loadJS("scripts/mvc/twitch_search_view.js");
	}

	searchStreams( query, callbackFunc )
	{
		this._resetPages();
		jsUtil.loadJSONP( this._searchURL + "/streams?", callbackFunc, "q=" + query + "&limit=" + this._queryLimit );
	}

	searchChannels( query, callbackFunc )
	{
		this._resetPages();
		jsUtil.loadJSONP( this._searchURL + "/channels?", callbackFunc, "q=" + query + "&limit=" + this._queryLimit );
	}

	searchGames( query, callbackFunc )
	{
		this._resetPages();
		jsUtil.loadJSONP( this._searchURL + "/games?", callbackFunc, "q=" + query + "&type=suggest" + "&limit=" + this._queryLimit );
	}

	parseContent( data )
	{
		if ( data.error != null )
		{
			alert( "Error: " + data.error + " - " + data.message );
		}

		this._modelList = [];

		//create the models
		if ( data.streams != null )
		{
			this._createStreamModels( data.streams );
		}
		else if ( data.channels != null )
		{
			this._createChannelModels( data.channels );
		}
		else if ( data.games != null )
		{
			this._createGameModels( data.games );
		}

		this._renderContent( data );

		if ( this._modelList.length == 0 )
		{
			this._resetPages();
			this._setupTotalResults( 0 );
			return;
		}

		this._parseURLS( data._links );
	}

	_resetPages()
	{
		this._totalResultsNum = 0;
		this._totalPages = 0;
		this._pageNavigation.reset();
	}

	_parseURLS( data )
	{
		this._selfURL = data.self;
		this._nextURL = data.next;
		this._prevURL = data.prev;

		//find the offset we are at
		var index = this._selfURL.indexOf("offset=");
		if ( index != -1 )
		{
			var endIndex = this._selfURL.indexOf("&", index);

			var value = parseInt( this._selfURL.substring( index + ("offset=").length, endIndex ) );
			this._pageNavigation.updateURLS( this._prevURL, this._nextURL );
			this._pageNavigation.updatePageNumbers( Math.ceil( value / this._queryLimit ) + 1, this._totalPages );
		}
		else
		{
			this._resetPages();
		}
	}

	_renderContent( data )
	{
		this._viewList = [];

		this._removeViewContent();
		this._setupTotalResults( data._total );

		var numModels = this._modelList.length;

		for ( var index = 0; index < numModels; ++index )
		{
			var currModel = this._modelList[ index ];
			var newView = null;

			if ( currModel instanceof TwitchSearchStreamModel )
			{
				newView = new TwitchSearchStreamView( currModel ); 
			}
			else if ( currModel instanceof TwitchSearchChannelModel )
			{
				newView = new TwitchSearchChannelView( currModel ); 
			}
			else if ( currModel instanceof TwitchSearchGameModel )
			{
				newView = new TwitchSearchGameView( currModel ); 
			}

			if ( newView != null )
			{
				this._viewList.push( newView );
				this._contentDiv.appendChild( newView.renderedContent );
			}
		}
	}

	_createStreamModels( streams )
	{
		var numStreams = streams.length;

		for ( var index = 0; index < numStreams; ++index )
		{
			this._modelList.push( new TwitchSearchStreamModel( streams[ index ] ) );
		}
	}

	_createChannelModels( streams )
	{
		var numStreams = streams.length;

		for ( var index = 0; index < numStreams; ++index )
		{
			this._modelList.push( new TwitchSearchChannelModel( streams[ index ] ) );
		}
	}

	_createGameModels( streams )
	{
		var numStreams = streams.length;

		for ( var index = 0; index < numStreams; ++index )
		{
			this._modelList.push( new TwitchSearchGameModel( streams[ index ] ) );
		}
	}

	_removeViewContent()
	{
		jsUtil.removeChildren( this._contentDiv );
	}

	_setupTotalResults( totalResults )
	{
		if ( this._totalResultsNum == 0 )
		{
			this._totalResultsNum = ( totalResults == undefined ) ? this._modelList.length : totalResults;
			this._totalPages = Math.ceil( this._totalResultsNum / this._queryLimit );
			jsUtil.updateText( this._totalResultsSpan, "Total Results: " + this._totalResultsNum );
		}
	}
};