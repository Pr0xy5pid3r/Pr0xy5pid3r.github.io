var twitchAPI = (function ()
{
	var _searchController;

	var _contentDivName;
	var _totalResultsSpan;
	var _pageNavigation;

	function init( contentDivName, totalResultsSpan, pageNavigation)
	{
		this._contentDivName = contentDivName;
		this._totalResultsSpan = totalResultsSpan;
		this._pageNavigation = pageNavigation;
		this._pageNavigation.setupCallbacks( this.onNavLeftArrowPressed, this.onNavRightArrowPressed );

		//create the mvc
		jsUtil.loadJS("scripts/mvc/twitch_search_controller.js");

		//initialize the api
		jsUtil.loadJSONP( "https://api.twitch.tv/kraken/?", "twitchAPI.onAPIInit" );
	}

	function onAPIInit( data )
	{
		this._searchController = new TwitchSearchController( data._links.search, this._contentDivName, this._totalResultsSpan, this._pageNavigation );
	}

	function searchStreams( query )
	{
		this._searchController.searchStreams( query, "twitchAPI.onContentLoaded");
	}

	function searchChannels( query )
	{
		this._searchController.searchChannels( query, "twitchAPI.onContentLoaded");
	}

	function searchGames( query )
	{
		this._searchController.searchGames( query, "twitchAPI.onContentLoaded");
	}

	function onContentLoaded( data )
	{
		this._searchController.parseContent( data );
	}

	function onNavLeftArrowPressed( url )
	{
		jsUtil.loadJSONP( url, "twitchAPI.onContentLoaded" );
	}

	function onNavRightArrowPressed( url )
	{
		jsUtil.loadJSONP( url, "twitchAPI.onContentLoaded" );
	}

	return {
		init,
		onAPIInit,
		searchStreams,
		searchChannels,
		searchGames,
		onContentLoaded,
		onNavLeftArrowPressed,
		onNavRightArrowPressed
	};
})();