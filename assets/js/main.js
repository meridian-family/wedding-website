/*
	Stellar by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {
	$(() => {

		var $body = $('body'), $main = $('#main');

		// Breakpoints.
		Breakpoints({
			xlarge: { min: 1281, max: 1680 },
			large: { min: 981, max: 1280 },
			medium: { min: 737, max: 980 },
			small: { min: 481, max: 736 },
			xsmall: { min: 361, max: 480 },
			xxsmall: { min: 0, max: 360 }
		});		

		Breakpoints.on('xlarge large medium', {
			enter: function(){
				$('iframe').prop('height', 450).prop('width', 600);
			}
		});	

		Breakpoints.on('small', {
			enter: function(){
				$('iframe').prop('height', 360).prop('width', 360);
			}
		});	

		Breakpoints.on('xsmall xxsmall', {
			enter: function(){
				$('iframe').prop('height', 240).prop('width', 240);
			}
		});

		// Play initial animations on page load.
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);

		// Nav.
		var $nav = $('#nav');

		if ($nav.length > 0) {

			// Shrink effect.
			$main
				.scrollex({
					mode: 'top',
					enter: function () {
						$nav.addClass('alt');
					},
					leave: function () {
						$nav.removeClass('alt');
					},
				});

			// Links.
			var $nav_a = $nav.find('a');

			$nav_a
				.scrolly({
					speed: 1000,
					offset: function () { return $nav.height(); }
				})
				.on('click', function () {

					var $this = $(this);

					// External link? Bail.
					if ($this.attr('href').charAt(0) != '#')
						return;

					// Deactivate all links.
					$nav_a
						.removeClass('active')
						.removeClass('active-locked');

					// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
					$this
						.addClass('active')
						.addClass('active-locked');

				})
				.each(function () {

					var $this = $(this), id = $this.attr('href'), $section = $(id);

					// No section for this link? Bail.
					if ($section.length < 1)
						return;

					// Scrollex.
					$section.scrollex({
						mode: 'middle',
						initialize: function () {

							// Deactivate section.
							if (browser.canUse('transition'))
								$section.addClass('inactive');

						},
						enter: function () {

							// Activate section.
							$section.removeClass('inactive');

							// No locked links? Deactivate all links and activate this section's one.
							if ($nav_a.filter('.active-locked').length == 0) {

								$nav_a.removeClass('active');
								$this.addClass('active');

							}


							// Otherwise, if this section's link is the one that's locked, unlock it.
							else if ($this.hasClass('active-locked'))
								$this.removeClass('active-locked');

						}
					});

				});

		}

		// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000
		});

	});
})(jQuery);