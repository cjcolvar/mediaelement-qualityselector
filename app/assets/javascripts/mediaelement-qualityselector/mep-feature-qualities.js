(function($) {

	// add extra default options 
	$.extend(mejs.MepDefaults, {
		// this will automatically turn on a <track>
		startQuality: 'low',

		qualitiesText: 'Stream Quality'
	});

	$.extend(MediaElementPlayer.prototype, {
	
		hasChapters: false,

		buildqualities: function(player, controls, layers, media) {
			var t = this, 
				i, 
				options = '';

      // If list exists, nuke it
      if ($(".mejs-qualities-selector").length > 0) {
        $(".mejs-qualities-selector ul li").remove();
      } else {
  			player.qualitiesButton = 
					$('<div class="mejs-button mejs-qualities-button">'+
					  	'<button type="button" aria-controls="' + t.id + '" title="' + t.options.qualitiesText + '" aria-label="' + t.options.qualitiesText + '"></button>'+
						  '<div class="mejs-qualities-selector">'+
		  					'<ul></ul>'+
			  			'</div>'+
				  	'</div>').appendTo(controls);
         player.selectedQuality = mejs.MepDefaults.startQuality;
			}

		  player.sources = $(player.domNode).find("source");		

      player.qualities = [];
			for (var i = 0; i < player.sources.length; i++) {
				if (player.sources[i].getAttribute("data-plugin-type") == player.media.pluginType) {
          player.qualities.push(player.sources[i]);
				}
			}

			// if only one language then just make the button a toggle
			if (player.qualities.length == 1){
				// click
				player.qualitiesButton.on('click',function() {
          alert("This stream only has 1 quality");
				});
			} else {
				// hover
				player.qualitiesButton.hover(function() {
					$(this).find('.mejs-qualities-selector').css('visibility','visible');
				}, function() {
					$(this).find('.mejs-qualities-selector').css('visibility','hidden');
				})

				// handle clicks to the quality radio buttons
				.on('click','input[type=radio]',function() {
          player.switchQuality($(this).siblings('label').text(), this.getAttribute("value"), this.getAttribute("data-mimetype"));
				});
			}

			if (!player.options.alwaysShowControls) {
				// move with controls
				player.container
					.bind('controlsshown', function () {
						// push captions above controls
						player.container.find('.mejs-qualities-position').addClass('mejs-qualities-position-hover');

					})
					.bind('controlshidden', function () {
						if (!media.paused) {
							// move back to normal place
							player.container.find('.mejs-qualities-position').removeClass('mejs-qualities-position-hover');
						}
					});
			} else {
				player.container.find('.mejs-qualities-position').addClass('mejs-qualities-position-hover');
			}

			// Adds to list and pre-selects the quality
			for (var i = 0; i < player.qualities.length; i++) {
        var q = player.qualities[i];
        var isSelected = q.getAttribute("data-quality") === player.selectedQuality;
			  player.addQualityButton(q.getAttribute("data-quality"), q.getAttribute("src"), q.getAttribute("type"), isSelected);

        // Makes current player use the pre-selected quality
        if (isSelected) {
          player.switchQuality(q.getAttribute("data-quality"), q.getAttribute("src"), q.getAttribute("type"));
        }
			}

		},

		addQualityButton: function(label, url, mimetype, isSelected) {
			var t = this;
			if (label === '') {
				label = "Unknown"; 
			}
      var checkedAttr = isSelected ? "checked" : "";

			t.qualitiesButton.find('ul').append(
				'<li>'+
					'<input type="radio" name="' + t.id + '_qualities" id="' + t.id + '_qualities_' + label + '" value="' + url + '"' + ' data-mimetype="' + mimetype + '"' + checkedAttr + '/>' +
					'<label for="' + t.id + '_qualities_' + label + '">' + label + '</label>'+
				'</li>'
			);
		},
 
    switchQuality: function(quality, url, mimetype) {
      var player = this;
      player.pause();
      player.setSrc([{ src: url, type: mimetype }]);
      player.selectedQuality = quality;
      player.load();  
    }
  });

})(mejs.$);
