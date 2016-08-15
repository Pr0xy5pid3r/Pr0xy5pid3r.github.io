class TwitchSearchBaseModel
{
	constructor( data )
	{
		this._jsonData = data;
	}

	get urlLink()
	{
		return "";
	}

	get imageURL()
	{
		return "";
	}

	get title()
	{
		return "";
	}

	get desc1()
	{
		return "";
	}

	get desc2()
	{
		return "";
	}
};

class TwitchSearchStreamModel extends TwitchSearchBaseModel
{
	constructor( data )
	{
		super( data );
	}

	get urlLink()
	{
		return this._jsonData.channel.url;
	}

	get imageURL()
	{
		return this._jsonData.preview.medium;
	}

	get title()
	{
		return this._jsonData.channel.display_name;
	}

	get desc1()
	{
		return this._jsonData.game + " - " + this._jsonData.viewers + " viewers";
	}

	get desc2()
	{
		return this._jsonData.channel.status;
	}
};

class TwitchSearchChannelModel extends TwitchSearchBaseModel
{
	constructor( data )
	{
		super( data );
	}

	get urlLink()
	{
		return this._jsonData.url;
	}

	get imageURL()
	{
		return this._jsonData.logo;
	}

	get title()
	{
		return this._jsonData.display_name;
	}

	get desc1()
	{
		return ( ( this._jsonData.game != null ) ? this._jsonData.game : "No Game" ) + " - " + this._jsonData.views + " views";
	}

	get desc2()
	{
		return this._jsonData.status;
	}
};

class TwitchSearchGameModel extends TwitchSearchBaseModel
{
	constructor( data )
	{
		super( data );
	}

	get urlLink()
	{
		return "https://www.google.com/webhp?#q=" + this.title;
	}

	get imageURL()
	{
		return this._jsonData.box.medium;
	}

	get title()
	{
		return this._jsonData.name;
	}

	get desc1()
	{
		return "";
	}

	get desc2()
	{
		return "Popularity: " + this._jsonData.popularity;
	}
};