// JavaScript Document
$('.responsive').slick({
		  prevArrow:'<i class="buttonCarousel fa fa-arrow-circle-left d-lg-none d-block" style="opacity: 0.5"></i>',
		  nextArrow:'<i class="buttonCarousel fa fa-arrow-circle-right d-lg-none d-block" style="opacity: 0.5"></i>',
		  dots: true,
		  arrows:true,
		  infinite: false,
		  speed: 300,
		  slidesToShow: 6,
		  slidesToScroll: 4,
		  responsive: [
			{
			  breakpoint: 1024,
			  settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
				infinite: true,
				dots: true
			  }
			},
			{
			  breakpoint: 600,
			  settings: {
				slidesToShow: 3,
				slidesToScroll: 3
			  }
			},
			{
			  breakpoint: 480,
			  settings: {
				slidesToShow: 3,
				slidesToScroll: 3
			  }
			}
			// You can unslick at a given breakpoint now by adding:
			// settings: "unslick"
			// instead of a settings object
		  ]
		});