var screenRes_ = {
	isDesktop: true,
	isTablet: false,
	isMobile: false
};

$(document).ready(function() {
	checkScreenSize();
	imgToSvg();
	burgerMenu();
	dropdownMenu();
	portfolioSlider();
	portfolioTabs();
	invAccrodion();

	// dev2
	lazyLoadNative();
	initMap();

}); // ready

$(window).on('resize', function() {
	checkScreenSize();
}); // resize

$(window).on('load', function() {

	
}); // load

function checkScreenSize() {
	var winWidth = $(window).outerWidth();

	screenRes_.isDesktop = (winWidth > 1024);
	screenRes_.isMobile = (winWidth < 768);
	screenRes_.isTablet = ( !screenRes_.isMobile && (winWidth < 992) );
}

// convert img to svg
function imgToSvg() {
	$('img.img-svg').each(function(){
		var $img = $(this);
		var imgClass = $img.attr('class');
		var imgURL = $img.attr('src');
		$.get(imgURL, function(data) {
			var $svg = $(data).find('svg');
				if(typeof imgClass !== 'undefined') {
					$svg = $svg.attr('class', imgClass+' replaced-svg');
				}
			$svg = $svg.removeAttr('xmlns:a');
				if(!$svg.attr('viewBox') && 
					$svg.attr('height') && 
					$svg.attr('width')) {

						$svg.attr('viewBox', '0 0 ' + 
						$svg.attr('height') + ' ' + $svg.attr('width'))
				}
			$img.replaceWith($svg);
		}, 'xml');
	});
}

// Burger menu
function burgerMenu() {
	var burger = $('#burger'),
		nav = $('.nav'),
		price = $('#header .price');

	burger.on('click', function(e) {
		e.preventDefault();

		if (!burger.hasClass('active')) {
			burger.addClass('active');
			nav.addClass('open');
			price.addClass('open');
		} else {
			burger.removeClass('active');
			nav.removeClass('open');
			price.removeClass('open');
		}
	});
	$(document).on('click', function(e) {

		if (burger.hasClass('active')) {

			if (!nav.is(e.target) && nav.has(e.target).length === 0 &&
				!price.is(e.target) && price.has(e.target).length === 0 &&
				!burger.is(e.target) && burger.has(e.target).length === 0) {

				burger.removeClass('active');
				nav.removeClass('open');
				price.removeClass('open');
			}
		}
	});
}

// Dropdown menu
function dropdownMenu() {
	var dropdown = $('.down-menu'),
		submenu = $('.submenu'),
		price = $('#header .price');

	dropdown.on('click', function(e) {
		e.preventDefault();

		if (!submenu.hasClass('open')) {
			submenu.addClass('open');
			price.css('z-index', 1);
		} else {
			submenu.removeClass('open');
			price.css('z-index', 2)
		}

	});
}

// Portfolio slider
function portfolioSlider() {
	var slider = $('#slider');

	slider.slick({
		infinite: true,
		dots: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		speed: 800,
		fade: true,
		prevArrow: $('#slick-left'),
		nextArrow: $('#slick-right')
	});
}

// portfolio summary tabs
function portfolioTabs(){

	$(".tab-content .item").not(":first").hide();

	$(".tab-nav li").click(function() {
	event.preventDefault();

	$(".tab-nav li a").removeClass("active").eq($(this).index()).addClass("active");

	$(".tab-content .item").hide().eq($(this).index()).fadeIn(150)
	}).eq(0).addClass("active");

}

// investors accordion
function invAccrodion() {

	$("[data-collapse]").on("click", function(event) {
		event.preventDefault();

		var $this = $(this),
			 blockId = $this.data("collapse");

		$this.toggleClass("active");
	});

}

// dev2
function lazyLoadNative() {
	if ('loading' in HTMLImageElement.prototype) {
		const images = document.querySelectorAll('img.lazyload');
		images.forEach(function(img) {
			img.src = img.dataset.src;
			img.classList.add('lazyloaded');
		});
	} else {
		let script = document.createElement('script');
		script.async = true;
		script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/4.1.8/lazysizes.min.js';
		document.body.appendChild(script);
	}
}

function initMap() {
	var marker;
	var mapContainer = document.getElementsByClassName('map');

	if (mapContainer.length) {
		for (var i = mapContainer.length - 1; i >= 0; i--) {
			var el = mapContainer[i];
			var latLng = {
				lat: parseFloat(el.dataset.lat),
				lng: parseFloat(el.dataset.lng)
			};
			var zoom = parseFloat(el.dataset.zoom);
			initMap(el, latLng, zoom);
		}
	}

	function initMap(container, latLng, zoom) {
		var map = new google.maps.Map(container, {
			zoom: zoom,
			center: latLng,
			disableDefaultUI: true
		});

		marker = new google.maps.Marker({
			map: map,
			draggable: true,
			animation: google.maps.Animation.DROP,
			position: latLng
		});

		marker.addListener('click', toggleBounce);
	}

	function toggleBounce() {
		if (marker.getAnimation() !== null) {
			marker.setAnimation(null);
		} else {
			marker.setAnimation(google.maps.Animation.BOUNCE);
		}
	}
}