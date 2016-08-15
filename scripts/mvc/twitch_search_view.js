class TwitchSearchBaseView
{
	constructor( model )
	{
		this._model = model;

		this._renderContent();
	}

	_renderContent()
	{
		var divContainer = document.createElement("div");
		divContainer.id = "contentResult";
		divContainer.className = "contentResult";

		var img = document.createElement("img");
		img.className = "contentResult-img";
		img.src = ( this._model.imageURL != null ) ? this._model.imageURL : "images/default_img.jpg";
		divContainer.appendChild( img );

		var titleText = document.createElement("a");
		titleText.className = "contentResult-title";
		jsUtil.addText( titleText, this._model.title, "Title");
		titleText.href = this._model.urlLink;
		titleText.target = "_blank";
		divContainer.appendChild( titleText );

		var desc1Text = document.createElement("span");
		desc1Text.className = "contentResult-desc1";
		jsUtil.addText( desc1Text, this._model.desc1, "Description");
		divContainer.appendChild( desc1Text );

		var desc2Text = document.createElement("span");
		desc2Text.className = "contentResult-desc2";
		jsUtil.addText( desc2Text, this._model.desc2, "Status");
		divContainer.appendChild( desc2Text );

		this._finalContent = divContainer;
	}

	get renderedContent()
	{
		return this._finalContent;
	}
};

class TwitchSearchStreamView extends TwitchSearchBaseView
{
	constructor( model )
	{
		super( model );
	}
};

class TwitchSearchChannelView extends TwitchSearchBaseView
{
	constructor( model )
	{
		super( model );
	}
};

class TwitchSearchGameView extends TwitchSearchBaseView
{
	constructor( model )
	{
		super( model );
	}
};