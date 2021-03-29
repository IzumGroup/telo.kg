jQuery(function ($) {

    // ===================================================== Fix fixed bg's jump

    /MSIE [6-8]|Mac/i.test(navigator.userAgent) || $("header, article, footer").each(function () {
        if ("fixed" == $(this).css("backgroundAttachment")) {
            var i = $(this), a = /WebKit/i.test(navigator.userAgent) ? 9 : 8;
            i.addClass("froid-fixed-bg").data({
                bgX: i.css("backgroundPosition").slice(0, i.css("backgroundPosition").indexOf(" ")),
                bgY: i.css("backgroundPosition").slice(i.css("backgroundPosition").indexOf(" ")),
                margin: a
            })
        }
    }), $(window).bind("SIModals.modalsOpen", function () {
        $(".froid-fixed-bg").each(function () {
            var i = $(this);
            i.css("backgroundPosition", "calc(" + i.data("bgX") + " - " + i.data("margin") + "px) " + i.data("bgY"))
        })
    }), $(window).bind("SIModals.modalsClose", function () {
        $(".froid-fixed-bg").each(function () {
            var i = $(this);
            i.css("backgroundPosition", i.data("bgX") + " " + i.data("bgY"))
        })
    });

    // ===================================================== Mobile full-width && disable animation

    if (is_mobile()) {

        // Fix mobile fixed bg's
        $("header, section, article, footer, .section-bg-block::before").each(function () {
            if ("fixed" == $(this).css("backgroundAttachment")) $(this).css('backgroundAttachment', 'scroll');
        });

        // Remove animation
        function removeAnimation(block, className) {
            block.css({
                'transform': 'none',
                '-webkit-transform': 'none',
                '-moz-transform': 'none',
                '-ms-transform': 'none',
                '-o-transform': 'none',
                'transition': 'none',
                '-webkit-transition': 'none',
                'opacity': 1
            }).removeClass(className);
        }

        function removeTransform(block, className) {
            block.css({
                'transform': 'none',
                '-webkit-transform': 'none',
                '-moz-transform': 'none',
                '-ms-transform': 'none',
                '-o-transform': 'none'
            }).removeClass(className);
        }

        removeAnimation($('.cre-animate'), 'cre-animate');
        removeTransform($('.si-floating'), 'si-floating');
        removeTransform($('.si-floating2'), 'si-floating2');
        removeTransform($('.si-floating3'), 'si-floating3');
        removeTransform($('.si-floating4'), 'si-floating4');

        // Mobile stretch
        $('html, body').css('min-width', '1280px').addClass('mobile');
        $('html').css('width', window.innerWidth + 'px');


        // ===================================================== All sound load
        $.ionSound({
            sounds: ["bip-1", "bip-2", "wuf-1", "wuf-2", "wuf-3", "wuf-4"],
            path: template_url + "/sounds/",
            volume: 0
        });
    }
    else {

        // ===================================================== All sound load
        $.ionSound({
            sounds: ["bip-1", "bip-2", "wuf-1", "wuf-2", "wuf-3", "wuf-4"],
            path: template_url + "/sounds/",
            volume: 0.3
        });

        // ===================================================== Sounds
        $(document).on('mouseenter',
            '.btn, ' +
            '.si-close, ' +
            '.phone-link, ' +
            '.si-jump, ' +
            '.swiper-button-prev, ' +
            '.swiper-button-next, ' +
            '.swiper-pagination-bullet, ' +
            '.tab-link', function () {
                $.ionSound.play('bip-2');
            });
        SIModals.beforeOpen = function () {
            $.ionSound.play('wuf-4');
        };
        SIModals.beforeClose = function () {
            $.ionSound.play('wuf-3');
        };

        // ===================================================== smooth scrolling
        SmoothScroll({stepSize: 100});

        if (navigator.userAgent.match(/Trident\/7\./)) { // if IE
            $('body').on("mousewheel", function () {
                event.preventDefault();
                var wheelDelta = event.wheelDelta;
                var currentScrollPosition = window.pageYOffset;
                window.scrollTo(0, currentScrollPosition - wheelDelta);
            });
        }
    }

    if (is_OSX()) {
        $('html, body').addClass('osx');
    }


    // ===================================================== Init all plugins and scripts
    $.fn.SIInit = function () {

        //Modal photos
        $('a[data-rel]').each(function () {
            $(this).attr('rel', $(this).data('rel'));
        });
        $('a[rel^=fancybox]').not('.cloned a').fancybox({
            helpers: {
                thumbs: true
            }
        });

        //Forms
        $('.send-form').SIForms({
            'validateFields': {
                'client_name': 'РЈРєР°Р¶РёС‚Рµ РІР°С€Рµ РёРјСЏ',
                'client_phone': 'РЈРєР°Р¶РёС‚Рµ РІР°С€ С‚РµР»РµС„РѕРЅ',
                'client_mail': 'РЈРєР°Р¶РёС‚Рµ РІР°С€ e-mail'
            },
            'sendSuccess': function (res) {
                //yaCounter.reachGoal('target' + res.id);
                //ga('send', 'event', res.gcode, res.gcode);
            }
        });

        //Jump links
        $('.si-jump').SIJump();

        //Page messages
        SIPageMessages.init();
    };

    $.fn.SIInit();


    // ===================================================== Modals
    $.fn.SIModalInit = function () {

        SIModals.init();

        // Init modals
        SIModals.attachModal('.open-phone-modal', '.phone-modal', {'.send-extra': 'extra'});
        SIModals.attachModal('.open-action-modal', '.action-modal', {'.send-extra': 'extra'});
        SIModals.attachModal('.open-record-modal', '.record-modal', {
            '.send-extra': 'extra',
            '.send-extra2': 'extra2'
        });
        SIModals.attachModal('.open-text-modal', '.text-modal', false, function () {
            return '.text-modal-' + $(this).data('id');
        });
        SIModals.attachModal('.open-master-modal', '.master-modal', {
            '.send-extra': 'extra',
            '.send-extra2': 'extra2'
        }, function () {
            return '.master-modal-' + $(this).data('id');
        });

        // Modal controls
        SIModals.attachClose('.si-close');
    };

    $.fn.SIModalInit();


    // ===================================================== fancybox video
    $(".show-video").click(function () {
        $.fancybox({
            'padding': 0,
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'title': this.title,
            'width': 640,
            'height': 385,
            'href': this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
            'type': 'swf',
            'swf': {
                'wmode': 'transparent',
                'allowfullscreen': 'true'
            }
        });

        return false;
    });

    $(".show-vimeo").click(function () {
        $.fancybox({
            'padding'		: 0,
            'autoScale'		: false,
            'transitionIn'	: 'none',
            'transitionOut'	: 'none',
            'title'			: this.title,
            'width'			: 640,
            'height'		: 385,
            'href'			: this.href.replace(new RegExp("([0-9])","i"),'moogaloop.swf?clip_id=$1'),
            'type'			: 'swf'
        });

        return false;
    });

    // ===================================================== swiper
    var teamSlider = new Swiper('.team-block', {
        slidesPerView: 4,
        spaceBetween: 30,
        nextButton: '.team-next',
        prevButton: '.team-prev',
        paginationClickable: true,
        loop: true,
        onSlideChangeStart: function (swiper) {
            $.ionSound.play('wuf-1');
        }
    });

    var gallerySlider = new Swiper('.gallery-block', {
        slidesPerView: 1,
        nextButton: '.gallery-next',
        prevButton: '.gallery-prev',
        paginationClickable: true,
        loop: true,
        onSlideChangeStart: function (swiper) {
            $.ionSound.play('wuf-1');
        }
    });

    var clubSlider = new Swiper('.club-block', {
        slidesPerView: 1,
        nextButton: '.club-next',
        prevButton: '.club-prev',
        paginationClickable: true,
        loop: true,
        onSlideChangeStart: function (swiper) {
            $.ionSound.play('wuf-1');
        }
    });

    var partnersSlider = new Swiper('.partners-block', {
        slidesPerView: 5,
        spaceBetween: 30,
        nextButton: '.partners-next',
        prevButton: '.partners-prev',
        paginationClickable: true,
        loop: true,
        onSlideChangeStart: function (swiper) {
            $.ionSound.play('wuf-1');
        }
    });

    // ===================================================== custom scripts

    //menu
    function headerBehaviour() {
        if ($(window).scrollTop() > 0) {
            $('.layout-header').addClass('active');
        }
        else {
            $('.layout-header').removeClass('active');
        }
    }

    headerBehaviour();
    $(window).resize(function () {
        headerBehaviour();
    });
    $(window).bind('scroll', function () {
        headerBehaviour();
    });

    // ===================================================== maps
    var myMap,
        centerCoord = [42.873489, 74.627999],
        markCoord = [42.873183, 74.620412];

    function mapInit(mapBlock, mapID) {
        ymaps.ready(function () {
            mapBlock = new ymaps.Map(mapID, {
                center: centerCoord,
                zoom: 16
            }, {
                searchControlProvider: 'yandex#search'
            });
            mapBlock.behaviors.disable('scrollZoom');

            pointByPlacemark(mapBlock);
        });
    }

    function pointByPlacemark(mapBlock) {
        var myPlacemark = new ymaps.Placemark(
            markCoord, {
                iconCaption: 'Магазин спортивного питания "Сделай Тело"'
            }, {
                preset: 'islands#brownCircleDotIconWithCaption',
                iconCaptionMaxWidth: '300'
            }
        );
        mapBlock.geoObjects.add(myPlacemark);
    }

    function pointWithCustomIcon(mapBlock) {
        var myPlacemark = new ymaps.Placemark(
            centerCoord, {
                hintContent: 'Магазин спортивного питания "Сделай Тело"'
            }, {
                iconLayout: 'default#image',
                iconImageHref: template_url + "images/logo-big1.png",
                iconImageSize: [55, 82],
                iconImageOffset: [-27, -82]
            }
        );
        mapBlock.geoObjects.add(myPlacemark);
    }

    mapInit(myMap, 'map');

    // ===================================================== loader
    setTimeout(function () {
        $('html').removeClass('loading');
        setTimeout(function () {
            $('.loader').hide();
        }, 500);
    }, 1000);
});