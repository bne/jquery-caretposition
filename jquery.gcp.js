/*
 * jQuery plugin:	cursorPosition - v0.1.0 - last change: 2008-08-28
 * Author	Annan Yearian
 * Licence	Creative Commons ( http://creativecommons.org/licenses/by-sa/2.5/scotland )
 *
 * Updated 2010-06-08 by Ben Miller <ben.miller@isotoma.com>
 * Computed style of originating input is applied to rendered span
 *  
 */

(function(Q){
	jQuery.fn.getCursorPosition = function()
	{
        var _css = [ 
            'border-top-width', 'border-right-width', 
            'border-bottom-width', 'border-left-width',
            'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
            'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
            'font-family', 'font-size', 'font-style', 'font-variant', 'font-weight',
            'outline-width', 'white-space', 'direction', 'letter-spacing',
            'line-height', 'text-align', 'text-transform', 'word-spacing'];
            
		var el = this[0];
		
		/*
		 * get the text that is before the cursur
		 */
		var selStart = (
			(
				'selectionStart' in el /*DOM 3*/
				&& function()
				{
					return el.selectionEnd;
				}
			) ||
			/* exploder */
			(
				document.selection
				&& function()
				{
					el.focus();
					var range = document.selection.createRange();
					if (range == null)
						return '';
					var re = el.createTextRange();
					var rc = re.duplicate();
					re.moveToBookmark(range.getBookmark());
					rc.setEndPoint('EndToStart', re);
					
					return rc.text.length;
				}
			) ||
			/* browser not supported */
			function()
			{
				return 0;
			}
		)();
		
		var text = el.value.substr(0, selStart);
		
		/* 
		 * render the text so we can measure it
		 */
		$('body').append('<span id="gcp-span"></span>');
		var span = $('#gcp-span');		

		for(var i=0; i<_css.length; i++) {
		    span.css(_css[i], this.css(_css[i]));

		}
		// handle multiple white space
		span.css('white-space', 'pre');
		
		/* 
		 * calculate values
		 */
		
		var wraps = text.split('\n');
		span.text(wraps[wraps.length-1]);	
		
		var textHeight = Math.min((span.height() * wraps.length), this.height());
		var textWidth = Math.min(span.width(), this.width());		
				
		var top = this.offset().top + textHeight;
		var left = this.offset().left + textWidth;
			 
		span.remove();
		
		return {
			'rows': wraps, 
			'text': text, 
			'textWidth': textWidth, 
			'textHeight': textHeight, 
			'top': top, 
			'left':left
		};
	};
})(jQuery);
