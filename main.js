(function ($) {
    "use strict";
    
    // Initiate the wowjs
    new WOW().init();
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    
    
    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 90) {
            $('.nav-bar').addClass('nav-sticky');
            $('.carousel, .page-header').css("margin-top", "73px");
        } else {
            $('.nav-bar').removeClass('nav-sticky');
            $('.carousel, .page-header').css("margin-top", "0");
        }
    });
    
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });
    
    
    // jQuery counterUp
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });
    
    
    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('hidden.bs.modal', function () {
    var video = document.getElementById("localVideo");
    video.pause();
    video.currentTime = 0; // optional: resets video to start
  });

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Testimonial Slider
    $('.testimonial-slider').slick({
        infinite: true,
        autoplay: true,
        arrows: false,
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.testimonial-slider-nav'
    });
    $('.testimonial-slider-nav').slick({
        arrows: false,
        dots: false,
        focusOnSelect: true,
        centerMode: true,
        centerPadding: '22px',
        slidesToShow: 3,
        asNavFor: '.testimonial-slider'
    });
    $('.testimonial .slider-nav').css({"position": "relative", "height": "160px"});
    
    
    // Blogs carousel
    $(".related-slider").owlCarousel({
        autoplay: true,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            }
        }
    });
    
    
    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('filter-active');
        $(this).addClass('filter-active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });
    
})(jQuery);


  function checkOfficeStatus() {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const hour = now.getHours();
    const minute = now.getMinutes();
    const holidays = [
      "01-01", // New Year's Day
      "04-09", // Araw ng Kagitingan
      "04-17",
      "04-18",
      "04-19",
      "12-25", // Christmas
      "12-30"  // Rizal Day
    ];
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const date = String(now.getDate()).padStart(2, '0');
    const today = `${month}-${date}`;
    const isHoliday = holidays.includes(today);
    const isWeekday = day >= 1 && day <= 6;
    const status = document.getElementById('office-status');
    if (!isHoliday && isWeekday) {
      if (hour === 12) {
        status.innerHTML = '<span style="color: #ffc107;"><i class="fas fa-utensils"></i> We are currently on <strong>LUNCH BREAK</strong>.</span>';
      } else if ((hour > 8 || (hour === 8 && minute >= 0)) && (hour < 17)) {
        status.innerHTML = '<span style="color:rgb(80, 233, 85);"><i class="fas fa-check-circle"></i> We are currently <strong>OPEN</strong>.</span>';
      } else {
        status.innerHTML = '<span style="color: #f44336;"><i class="fas fa-times-circle"></i> We are currently <strong>CLOSED</strong>.</span>';
      }
    } else {
      status.innerHTML = '<span style="color: #f44336;"><i class="fas fa-times-circle"></i> We are currently <strong>CLOSED</strong>.</span>';
    }
  }
  // Run the function on page load
  window.onload = checkOfficeStatus;

    document.addEventListener('DOMContentLoaded', function () {
        const toggleBtn = document.getElementById('toggleBtn');

        if (toggleBtn) {
            toggleBtn.addEventListener('click', function () {
                let hiddenMembers = document.querySelectorAll('.hidden-member');

                if (toggleBtn.textContent === 'View More') {
                    hiddenMembers.forEach(function (member) {
                        member.classList.remove('hidden-member');
                    });
                    toggleBtn.textContent = 'View Less';
                } else {
                    let allMembers = document.querySelectorAll('.team-card');
                    allMembers.forEach(function (member, index) {
                        if (index >= 8) {
                            member.classList.add('hidden-member');
                        }
                    });
                    toggleBtn.textContent = 'View More';
                }
            });
        }
    });

    
  document.addEventListener("DOMContentLoaded", function () {
    const currentPage = window.location.pathname.split("/").pop(); // gets the file name (e.g., 'team.html')
    
    document.querySelectorAll('.nav-link, .dropdown-menu a').forEach(link => {
      const linkPage = link.getAttribute('href');

      if (linkPage === currentPage) {
        link.classList.add('active');

        // If the link is inside a dropdown, also highlight its parent dropdown toggle
        const parentDropdown = link.closest('.dropdown');
        if (parentDropdown) {
          parentDropdown.querySelector('.nav-link').classList.add('active');
        }
      }
    });
  });