class PageNavigation
{
	constructor( leftArrow, rightArrow, results )
	{
		this._leftArrow = leftArrow;
		this._rightArrow = rightArrow;
		this._results = results;
		this._prevURL = null;
		this._nextURL = null;
		this._prevCallback = null;
		this._nextCallback = null;

		this._leftArrow.addEventListener( "click", this._onLeftArrowClicked.bind( this ) );
		this._rightArrow.addEventListener( "click", this._onRightArrowClicked.bind( this ) );

		this.reset();
	}

	reset()
	{
		this.updateURLS( null, null );
		this.updatePageNumbers( 0, 0 );
	}

	setupCallbacks( prevCallback, nextCallback )
	{
		this._prevCallback = prevCallback;
		this._nextCallback = nextCallback;
	}

	updateURLS( prevURL, nextURL)
	{
		this._prevURL = prevURL;
		this._nextURL = nextURL;
	}

	updatePageNumbers( curr, total )
	{
		this._setVisibilty( this._leftArrow, this._prevURL != null && curr > 1 );
		this._setVisibilty( this._rightArrow, this._nextURL != null && curr != total );

		if ( curr == 0 )
		{
			this._setVisibilty( this._results, false );
		}
		else
		{
			this._setVisibilty( this._results, true );
			jsUtil.updateText( this._results, curr + "/" + total );
		}
	}

	_setVisibilty( element, shouldShow )
	{
		element.style.visibility = ( shouldShow == true ) ? "visible" : "hidden";
	}

	_onLeftArrowClicked()
	{
		if ( this._prevCallback != null )
		{
			this._prevCallback( this._prevURL );
		}
	}

	_onRightArrowClicked()
	{
		if ( this._nextCallback != null )
		{
			this._nextCallback( this._nextURL );
		}
	}
};