jQuery(document).ready(function() {
	// Open/Close left menu elements
    jQuery('article aside i.ddexp').on('click', function() {
    	console.log($(this))
        $( this ).toggleClass("fa-chevron-right fa-chevron-down") ;
        $( this ).parent().children('ul').toggle() ;
        return false;
    });

    // Execute actions on images generated from Markdown pages

    var images = $("article section.page img");
    // Change styles, depending on parameters set to the image
    images.each(function (index) {
        var image = $(this);
        var o = getUrlParameter(image[0].src);
        if (typeof o !== "undefined") {
            var h = o["height"];
            var w = o["width"];
            var c = o["classes"];
            image.css({
                width: function () {
                    if (typeof w !== "undefined") {
                        return w;
                    }
                },
                height: function () {
                    if (typeof h !== "undefined") {
                        return h;
                    }
                }
            });
            if (typeof c !== "undefined") {
                var classes = c.split(',');
                $.each(classes, function(i) {
                    image.addClass(classes[i]);
                });
            }
        }
    });

});


(function scrollSpy() {
  var OFFSET = 10;
  var timer;
  var headingsCache;

  var findHeadings = function findHeadings() {
    return headingsCache || document.querySelectorAll('.TableOfContents li > a');
  };

  var onScroll = function onScroll() {
    if (timer) {
      // throttle
      return;
    }

    timer = setTimeout(function() {
      timer = null;
      var activeNavFound = false;
      var headings = findHeadings(); // toc nav anchors

      /**
       * On every call, try to find header right after  <-- next header
       * the one whose content is on the current screen <-- highlight this
       */

      for (var i = 0; i < headings.length; i++) {
        // headings[i] is current element
        // if an element is already active, then current element is not active
        // if no element is already active, then current element is active
        var currNavActive = !activeNavFound;
        /**
         * Enter the following check up only when an active nav header is not yet found
         * Then, check the bounding rectangle of the next header
         * The headers that are scrolled passed will have negative bounding rect top
         * So the first one with positive bounding rect top will be the nearest next header
         */

        if (currNavActive && i < headings.length - 1) {
          var heading = headings[i + 1];
          var next = decodeURIComponent(heading.href.split('#')[1]);
          var nextHeader = document.getElementById(next);

          if (nextHeader) {
            var top = nextHeader.getBoundingClientRect().top;
            currNavActive = top > OFFSET;
          } else {
            console.error('Can not find header element', {
              id: next,
              heading: heading,
            });
          }
        }
        /**
         * Stop searching once a first such header is found,
         * this makes sure the highlighted header is the most current one
         */

        if (currNavActive) {
          activeNavFound = true;
          headings[i].parentElement.classList.add('active');
        } else {
          headings[i].parentElement.classList.remove('active');
        }
      }
    }, 100);
  };

  document.addEventListener('scroll', onScroll);
  document.addEventListener('resize', onScroll);
  document.addEventListener('DOMContentLoaded', function() {
    // Cache the headings once the page has fully loaded.
    headingsCache = findHeadings();
    onScroll();
  });
})();




// Get Parameters from some url
var getUrlParameter = function getUrlParameter(sPageURL) {
    var url = sPageURL.split('?');
    var obj = {};
    if (url.length == 2) {
        var sURLVariables = url[1].split('&'),
            sParameterName,
            i;
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
            obj[sParameterName[0]] = sParameterName[1];
        }
        return obj;
    } else {
        return undefined;
    }
};