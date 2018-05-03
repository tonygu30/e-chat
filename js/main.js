var time, m, d, h, mi, s;

function getTime() {
    time = new Date();
    m = time.getMonth() + 1;
    d = time.getDate();
    h = time.getHours();
    mi = time.getMinutes();
    s = time.getSeconds();
    var nowtime = m + "/" + d + " " + h + ":" + mi + ":" + s;
    return nowtime;
}


offScroll = false;


$(function () {

    $('body').on('mousewheel', function (event) {
        if(offScroll){
            return false;
        }
    });

    $('body').on('touchmove', '.scrollable', function (e) {
        if (offScroll) {
            e.stopPropagation();
        }
    });

    $('.close_alert').click(function(){
        $('.alert_bg').hide();
        //關閉 offClick & offScroll
        offClick = false;
        offScroll = false;
    });

    $('.good_btn').click(function () {
        $(this).hasClass('like') ? $(this).removeClass('like') : $(this).addClass('like')
    });


    $('.close').click(function () {
        $('.warring_txt').remove();
    });


    $.get('menu.json', function (data) {

        var html = '';

        html += '<ul class=\'msg_t_menu\'>';

        for (var i = 0; i < data.length; i++) {

            html += '<li data-id=' + data[i].Id + '><div>' + data[i].menuName + '</div></li>';
        }

        html += '</ul>';

        $('.massage_menu').append(html);

    }).done(function (data) {

        var mdata = data;

        $.get('twoMenu.json', function (data) {

            console.log('5656');

        }).done(function (data) {

            start(mdata, data);

        });

    });

});

$('#massage_view').scroll(function (e) {
    e.preventDefault()
})

var offClick = false;

function start(mdata, tmdata) {

    var mdata = mdata;
    var tmdata = tmdata;

    $('.massage_menu').on('click', 'li', function () {

        if(offClick === true)return;

        if ($(this).hasClass('up')) {
            $('.menu_load').remove();
            $('.massage_menu li').removeClass('up');
            return
        }

        $(this).addClass('up').siblings().removeClass('up');

        console.log($(window).scrollTop() + $('.massage_box').innerHeight())

        $('body,html').animate({ scrollTop: ($(window).scrollTop() + $('.massage_box').innerHeight()) }, 400);

        if ($(this).data('id') == 'Menu3') {


            $('.massage_info_box').css('display', 'block');
            $('.msg_t_menu').css('display', 'none');
            $('.tt_box').remove();
            $('.massage_box').removeClass('add')
            $('.menu_load').remove();
            $('.warring_txt').remove();

            $(window).scrollTop(0);

            var html = '';

            html += '<div class=\'tt_box me\'>';
            html += '<div class=\'talk_big_box\' data-time=\'' + getTime() + '\'>';
            html += '<div class=\'talk_box\'>幫我轉接客服即時通專員</div>';
            html += '</div>';
            html += '</div>';


            $('.massage_box').append(html);




            setTimeout(function () {
                $('.massage_box').addClass('talk');

                var html = '';
                html += '<div class=\'tt_box citi\'>';
                html += '<div class=\'talk_big_box\' data-time=\'' + getTime() + '\'>';
                html += '<div class=\'talk_box miss\'>簡訊動態密碼OTP驗證成功囉！</div>';
                html += '<div class=\'talk_box miss\'>請問有什麼可以為您服務的地方？</div>';
                html += '</div>';
                html += '</div>';

                $('.massage_box').append(html);

            }, 1000);

            return;

        }


        $('.menu_load').remove();

        var html = '';

        for (var i = 0; i < tmdata.length; i++) {
            if (tmdata[i].Pid === $(this).data('id')) {
                html += '<a class=\'menu_load\' data-id=' + tmdata[i].Id + '>' + tmdata[i].name + '</a>'
            }
        }

        $('.massage_box').append(html);

        resetTmenu();

    });

}


function resetTmenu() {

    $('.menu_load').css('width', $('#massage_view').innerWidth() / 2 - 15);

    var getId = [];

    for (var i = 0; i < $('.menu_load').length; i++) {

        if (i % 2) {

            var mgr = $('.massage_box').offset().left + 10

            console.log(mgr)

            $('.menu_load').eq(i).css('right', mgr);

        } else {

            var mgr = $('.massage_box').offset().left

            mgr = mgr + $('#massage_view').innerWidth() / 2 + 5

            $('.menu_load').eq(i).css('right', mgr);


        }

        var th = $('.t_height').innerHeight();
        var dh = $('.d_height').innerHeight();

        if (i == 0 | i == 1) {

            getId.push('10');

        } else if (i == 2 | i == 3) {

            getId.push('' + (th * 1 + 10));

        } else if (i == 4 | i == 5) {

            getId.push('' + (th * 2 + 10));

        } else if (i == 6 | i == 7) {

            getId.push('' + (th * 3 + 10));

        } else if (i == 8 | i == 9) {

            getId.push('' + (th * 4 + 10));

        }

    }

    resetTOP(getId.reverse());

    $('.menu_load').click(function (e) {

        offClick = true;
        offScroll = true;
        var getId = ''; 
        getId = $(this).data('id');

        if (getId === 'Item08') {
            $('.alert_bg').show();
            return
        }

        var talk = {
            "Item01": "查詢我的本期帳單應繳金額及繳款日",
            "Item02": "查詢我的可用額度",
            "Item03": "查詢我的未出帳交易明細",
            "Item04": "請補寄我的電子月結單",
            "Item05": "",
            "Item06": "",
            "Item07": "我想用ATM繳信用卡費/貸款",
            "Item08": "",
        }

        $('.massage_menu li').removeClass('up');

        if (talk[getId] !== "") {

            $(this).css('width', 'auto');

            $(this).html(talk[getId]);

            var html = '';
            html += '<div class=\'tt_box me hide\' >';
            html += '<div class=\'talk_big_box me\' data-time=\'' + getTime() + '\'>';
            html += '<div class=\'talk_box\'>' + talk[getId] + '</div>';
            html += '</div>';
            html += '</div>';

            $('.massage_box').append(html);

            moveItem(e.target, getId);

        }else{

            $.get('item.json', function (data) {

                getId = data.filter(function (item) {
                    return item.Id === getId
                });

                getId = getId[0];

                getData(getId);

            });

        }

        
        
    });

}

function resetTOP(yo) {

    var getId = $(window).innerHeight();

    yo.map(function (item, i) {

        $('.menu_load').eq(i).css('bottom', (parseInt(item) + 49) + 'px');

    });

}


function getData(data) {

    if (data.link) {
        location.href = data.link;

        return;
    }

    $('.tt_box.typeing').remove();

    var html = '';
    html += '<div class=\'tt_box citi\' >';
    html += '<div class=\'talk_big_box\' data-time=\'' + getTime() + '\'>';
    for (var i = 0; i < data.citiTalk.length; i++) {
        html += '<div class=\'talk_box\'>' + data.citiTalk[i] + '</div>';
    }
    if (data.content) {
        html += data.content;
    }
    html += '</div>';
    html += '</div>';

    $('.massage_box').append(html);

    offClick = false;
    offScroll = false;

}


function moveItem(tar,getId) {

    

    console.log($('.tt_box.me').last());

    var targetThis = tar;

    var top_add = $('.talk_big_box.me').last().children().innerHeight();

    var top = $(window).innerHeight() - ($('.talk_big_box.me').last().offset().top - $(window).scrollTop()) - top_add;

    console.log($(window).innerHeight(), ($('.talk_big_box.me').last().offset().top - $(window).scrollTop()), top_add)


    var paddingW = 15;

    if($(window).innerWidth() < 780){
       
        paddingW = 13;
    }else{
        paddingW = 15;
        
    }

    console.log(paddingW)

    $('.menu_load').css('opacity', '0');
    $(targetThis).css('opacity', '1');
    $(targetThis).addClass('active');
    $(targetThis).css({ 'bottom': top, 'right': $('.massage_box').offset().left + paddingW });
    $('.tt_box.me').last().removeClass('hide');

    setTimeout(function () {

        $('.menu_load').remove();

        $('html,body').animate({ scrollTop: $('.tt_box').last().offset().top }, 400);

        $('.massage_box').addClass('add');

        var html = '';

        html += '<div class=\'tt_box citi typeing\'>';
        html += '<div class=\'talk_big_box\'>';
        html += '<div class=\'talk_box\'><img class=\'loading\' src="images/loading_dots.gif"></div>';
        html += '</div>';
        html += '</div>';

        $('.massage_box').append(html);

        setTimeout(function () {

            $.get('item.json', function (data) {

                getId = data.filter(function (item) {
                    return item.Id === getId
                });

                getId = getId[0];

                getData(getId);

            });

        }, 1000);



    }, 1500);


}



$('.submit').click(function () {
    send();

    $('body,html').stop().animate({ scrollTop: $(window).scrollTop() + $('.massage_box').innerHeight() }, 400);

});


$('.infotext').keydown(function (e) {

    if (e.keyCode == '13') {
        send();
        return false;
    }
    $('body,html').stop().animate({ scrollTop: $(window).scrollTop() + $('.massage_box').innerHeight() }, 400);

});

function send() {

    var html = '';

    if ($('.infotext').val() !== '') {

        html += '<div class=\'tt_box me\' >';
        html += '<div class=\'talk_big_box me\' data-time=\'' + getTime() + '\'>';
        html += '<div class=\'talk_box\'>' + $('.infotext').val() + '</div>';
        html += '</div>';
        html += '</div>';

    }

    $('.massage_box').append(html);

    $('.infotext').val("");

}