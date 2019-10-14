$(() => {
  let stickyTop = 0,
  scrollTarget = false;

  let timeline = $('.timeline__nav'),
  items = $('li', timeline),
  milestones = $('.timeline__section .milestone'),
  offsetTop = parseInt(timeline.css('top'));

  const TIMELINE_VALUES = {
    start: 190,
    step: 30 };


  $(window).resize(function () {
    timeline.removeClass('fixed');

    stickyTop = timeline.offset().top - offsetTop;

    $(window).trigger('scroll');

  }).trigger('resize');

  $(window).scroll(function () {
    if ($(window).scrollTop() > stickyTop) {          //scrolltop jquery = Return the vertical scrollbar position
      timeline.addClass('fixed');

    } else {
      timeline.removeClass('fixed');

    }
  }).trigger('scroll');




  items.find('span').click(function () {                              //Click function
    let li = $(this).parent(),
    index = li.index(),
    milestone = milestones.eq(index);

    if (!li.hasClass('active') && milestone.length) {
      scrollTarget = index;
      let scrollTargetTop = milestone.offset().top - 80;

      $('html, body').animate({ scrollTop: scrollTargetTop }, {
        duration: 400,
        complete: function complete() {
            setBgImage(index);        //letak sini kalau nk click tahun then kluar gambar //window.alert(index);
          scrollTarget = false;
        } });

    }
  });





  $(window).scroll(function () {                                    //scroll function
    let viewLine = $(window).scrollTop() + $(window).height() / 3,
    active = -1;

    if (scrollTarget === false) {
      milestones.each(function () {
        if ($(this).offset().top - viewLine > 0) {
          return false;
        }

        active++;
      });
    } else {
      active = scrollTarget;
    }

    timeline.css('top', -1 * active * TIMELINE_VALUES.step + TIMELINE_VALUES.start + 'px');

    items.filter('.active').removeClass('active');

    items.eq(active != -1 ? active : 0).addClass('active');
    setBgImage(active);                                           //Value active = value current bold list

  }).trigger('scroll');


});


//=========function letak gmbr


var $bgImage = $(".backimage");


// preload the given total amount of iamges
function create(totalImages) {
  for (var i = 0; i < totalImages; i++) {
        var img = $('<img/>')
        img[0].src = getImgUrl(i);
        $bgImage.append(img)
    }
    setBgImage(0)
}

create(100);                               //LETAK TOTAL BERAPA BNYK GAMBAR ***********PENTING*****************  (NAMA GAMBAR MULA DARI 0 - TOTAL)

function setBgImage(index){
  var imageNum;
  var lineCount = 0;
  
    imageNum = index;                       //imagenum = position gambar

  console.log("IMG: " + imageNum + ", Position: " + index);
  
    $bgImage.find("img").hide().eq(imageNum).show()
}


function getImgUrl(num){
    return "PICS/" + num + ".jpg";          //return "img/" + num + ".png"; //return "http://placehold.it/200x200/&text=" + num;
}