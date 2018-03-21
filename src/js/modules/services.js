$(document).ready(()=>{
    $('.services-wr').fullpage({
        navigation: true,
        navigationPosition: 'left',
        css3: true,
        scrollingSpeed: 1000,
        easingcss3: 'ease',
        fadingEffect: true,
        parallax: true,
        parallaxOptions: {type: 'reveal', percentage: 96, property: 'translate'}
    });

    $('.tabs-items').on('click', function () {
        var index = $(this).index(),
             tabsActive = $('.tab-content-service.active');
        $('.tabs-items').removeClass('active');
        $(this).addClass('active');
        tabsActive.removeClass('active');

        console.log(index);
        if(tabsActive.hasClass('active')){
            $(this).removeClass('active');
        }else {
            $('.tab-content-service').eq(index).addClass('active');
        }



    });
});