/*
Copyright (c) 2011 LectureTools Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

(function ($) {
    var methods = {
	init : function(options) {
	    var options = $.extend({
		width:"300px",
		borderColor:" #7F7F7F",
		open:"single",
		openSubMenu:0,
		opener:$(this).parent(),
		h_offset:0
	    }, options);
	    subMenuCounter = 0;
	    var h_offset = parseInt(options.opener.css("left").substring(0,options.opener.css("left").length-2)) + options.h_offset;
	    $(this).css("left",h_offset);
	    var v_offset = parseInt(options.opener.css("top").substring(0,options.opener.css("top").length-2))+options.opener.height() + 2; 
	    $(this).css("top",v_offset);
	    $(this).children(".ltmenu-wrapper").css("width",options.width);
	    $(this).children(".ltmenu-wrapper").css("border","solid 1px "+options.borderColor);
	    $(this).children(".ltmenu-wrapper").children(".ltmenu").each(function() {
		if (subMenuCounter == options.openSubMenu) {
		    $(this).addClass("open");
		} else {
		    $(this).addClass("closed");
		    $(this).children(".ltmenu-item").hide();
		}
		$(this).children(".ltmenu-header").unbind();
		$(this).children(".ltmenu-header").click(function() {
		    $(this).parent().toggleClass("closed").toggleClass("open");
		    if (options.open == "single") {
			$(this).parent().siblings(".ltmenu").each(function() {
			    if ($(this).hasClass("open")) {
				$(this).toggleClass("open").toggleClass("closed");
				$(this).children(".ltmenu-item").each(function() {
				    $(this).slideToggle('medium',function() {
					//Animation complete.
				    });
				});
			    }
			});
		    }
		    $(this).siblings(".ltmenu-item").each(function() {
			$(this).slideToggle('medium',function() {
			    // Animation complete.
			});
		    });
		});
		subMenuCounter++;
	    });
	},
	hide : function() {

	},
	show : function() {

	}
    };

    $.fn.ltmenu = function(method) {
	if (methods[method]) {
	    return methods[method].apply(this,Array.prototype.slice.call(arguments,1));
	} else if (typeof method === 'object' || !method) {
	    return methods.init.apply(this,arguments);
	} else {
	    $.error("Method "+method+" does not exist on jQuery.ltmenu");
	}
    };
})(jQuery);