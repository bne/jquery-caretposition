/*
 * jQuery plugin:   cursorPosition - v0.1.0 - last change: 2008-08-28
 * Author   Annan Yearian
 * Licence  Creative Commons ( http://creativecommons.org/licenses/by-sa/2.5/scotland )
 *
 * Updated 2010-06-08 by Ben Miller <ben.miller@isotoma.com>
 * Computed style of originating input is applied to rendered span
 *
 */

(function($){
    var _css = [
        'border-top-width', 'border-right-width',
        'border-bottom-width', 'border-left-width',
        'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
        'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
        'font-family', 'font-size', 'font-style', 'font-variant', 'font-weight',
        'outline-width', 'white-space', 'direction', 'letter-spacing',
        'line-height', 'text-align', 'text-transform', 'word-spacing'];

    $.fn.getCursorPosition = function()
    {
        var $el = this;
        var el = $el[0];

        /*
         * get the text that is before the cursur
         */
        var selStart = (
            (
                'selectionStart' in el && function()
                {
                    return el.selectionEnd;
                }
            )
            ||
            ( // IE<=8
                document.selection && function()
                {
                    el.focus();
                    var range = document.selection.createRange();
                    if (range == null) {
                        return '';
                    }
                    var re = el.createTextRange();
                    var rc = re.duplicate();
                    re.moveToBookmark(range.getBookmark());
                    rc.setEndPoint('EndToStart', re);

                    return rc.text.length;
                }
            )
            ||
            function() // browser not supported
            {
                return 0;
            }
        )();

        var text = $el.val().substr(0, selStart);
        var wraps = text.split('\n');

        // render the text so we can measure it
        var span = $('<span>')
        .css('white-space', 'pre')
        .text(wraps[wraps.length-1]);

        $.each(_css, function(i, attr) {
            span.css(attr, $el.css(attr));
        });

        $('body').append(span);

        var textHeight = Math.min((span.height() * wraps.length), $el.height());
        var textWidth = Math.min(span.width(), $el.width());

        var top = $el.offset().top + textHeight;
        var left = $el.offset().left + textWidth;

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
