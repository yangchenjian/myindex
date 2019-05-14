
// $(function () { 
//start
  $(document).ready(function(){


// 纵向导航栏 开始
	$(".menu-list>li").hover(
  		function () {
    		$(this).find($('.item-list')).fadeIn(200)
  		},
  		function () {
  			$(this).find($('.item-list')).fadeOut(200)
  		}
	);
// 纵向导航栏 结束

// banner轮播图 开始
  $(".owl-carousel").owlCarousel({
    items:1,
    autoplay:true,
    autoplayTime:3000,
    autoplayHoverPause:false,
    loop: true,
  });


// function Carousel($ct) {
//   this.$ct = $ct
//   this.init()
//   this.bind()
// }
// Carousel.prototype = {
//   init:function () {
//     var bannerList  = this.bannerList = this.$ct.find('.banner-list'),
//         bannerLi    = this.bannerLi = this.$ct.find('.banner-list>li'),
//         bulletLi    = this.bulletLi = this.$ct.find('.bullet-list>li'),
//         imgWidth    = this.imgWidth = bannerLi.width(),
//         imgTotal    = this.imgTotal = bannerLi.length;
//         this.pageIndex= 0,
//         this.animateLock = false
//         bannerList.append(bannerLi.first().clone())
//         bannerList.prepend(bannerLi.last().clone())
//         bannerList.width((imgTotal+2)*imgWidth)
//         bannerList.css({left: -imgWidth})
//   },
//   bind:function () {
//     var me = this
//     this.bulletLi.on('click',function () {
//       var index = $(this).index()
//       if (index>me.pageIndex) {
//        me.playNext(index - me.pageIndex)
//       }else if (index<me.pageIndex) {
//         me.playPre(me.pageIndex - index)
//       }
//     })
//     setInterval(function(){
//      me.playNext(1)
//    },35000)
//   },
//   playPre:function (len) {
//      var me = this
//      if(this.animateLock) return;
//     this.animateLock = true
//     this.bannerList.animate({
//       left: '+='+ len*me.imgWidth
//     },function () {
//       me.pageIndex-=len;
//       if( me.pageIndex < 0  ){
//         me.pageIndex = me.imgTotal-1
//         me.bannerList.css({left: - (me.imgWidth*me.imgTotal)})
//       } 
//       me.setBullet()
//       me.animateLock = false
//     }) 
//   },
//   playNext:function (len) {
//     var me = this
//      if(this.animateLock) return;
//       this.animateLock = true
//       this.bannerList.animate({
//         left: '-=' + len * me.imgWidth
//       },320,
//       function() {
//         me.pageIndex += len
//         if( me.pageIndex === me.imgTotal ){
//           //记得减1
//           me.pageIndex = 0
//           //这一块儿的计算 自己没有想起来
//           me.bannerList.css({left: - me.imgWidth})
//         }
//         me.setBullet()
//         me.animateLock = false
//       })  
//   },
//   setBullet:function () {
//     this.bulletLi.removeClass('bullet-active')
//           .eq(this.pageIndex)
//           .addClass('bullet-active')  
//   }
// }
// new Carousel($('.banner-wrap'))



  // banner轮播图 结束


  // 电梯-滚动查询 开始

  var sideNave = $('.side-nav')
  var arrOffsetTop = [
         $('.recommended-wrap').offset().top,
         $('.license-wrap').offset().top,
         $('.industry-wrap').offset().top,
         $('.more-wrap').offset().top,
         $('.news-wrap').offset().top,
         $('.youshi-section').offset().top,
         $('.panter-section').offset().top
      ];
  var fTotalHgt = 0;
      for(var i=0; i<$('section').length; i++) {
         fTotalHgt += $('section').eq(i).outerHeight();
      }
  var fAverageHgt = parseFloat(fTotalHgt / $('section').length);


  // 显示与隐藏电梯 开始
  var preTop= 0
  var winHeight = 0
  $(window).on('scroll',function () {
     winHeight = $(this).scrollTop()
     if(winHeight<preTop){
       sideNave.removeClass('slide-show')
      }else if(winHeight>600){
        // sideNave.fadeIn(800)
        sideNave.addClass('slide-show')
      }else{
        // sideNave.fadeOut(200)
        sideNave.removeClass('slide-show')
      }
    preTop = $(this).scrollTop()
  // 显示与隐藏电梯 结束

    // 到达位置 带上颜色
  	for(var i=0; i<$('section').length; i++) {
      if($(this).scrollTop() > arrOffsetTop[i] - fAverageHgt) {
        $('.side-nav>li').eq(i).addClass('side-active').siblings().removeClass('side-active');
      }
    }
  })
  // 定位快速滚动 开始
  sideNave.find('li').on('click',function () {
  	var index = $(this).index()
  	$(this).removeClass('side-active').eq(index).addClass('side-active')
  	$('body,html').animate({
  		scrollTop: arrOffsetTop[index]
  	},200)

  })
  // 定位快速滚动 结束
// 电梯-滚动查询 结束


// 数字快速滚动 开始 给 la6 用上～

  var targentLa  = $('.pingtai-section')
      tarOne   = targentLa.find('.number-wrap .number-list>li .one').text()
      tarTwo   = targentLa.find('.number-wrap .number-list>li .two').text()
      tarThree = targentLa.find('.number-wrap .number-list>li .three').text()
      tarFour =  targentLa.find('.number-wrap .number-list>li .four').text()
      numLock = true

	//指定节点 是否出现在用户眼前
 function isShow($node){
      var windowHeight = $(window).height(),
          scrollTop = $(window).scrollTop(),
          offsetTop = $node.offset().top,
          nodeHeight = $node.height();
      if(windowHeight + scrollTop > offsetTop && scrollTop < offsetTop + nodeHeight){
        return true;
      }else{
        return false;
      }
 }


  /*
  *
   * options参数：
  *     from   {Number}    起始数字
  *     to   {Number}    终点数字
  *     duration   {Number}   动画时间
  *     callback   {Function}   数字变化时的回调函数
  */
   $.fn.animatingNumber = function(options) {
        var settings = {
            element: this,
            startNum: options.from,
            endNum: options.to,
            duration: options.duration || 2000,
            callback: options.callback
        }
        var timer = null

        var methods = {
            start: function() {
                var _this = this
                _this.animate()
            },
            stop: function() {
                if(timer) {
                    clearTimeout(timer)
                    timer = null
                }
            },
            animate: function() {
                var _this = this;
                var curNum = settings.startNum;
                var animateTime = 0;
                var range = settings.endNum - settings.startNum;
                var timerStep = Math.abs( Math.floor(settings.duration / range) );
                    timerStep = timerStep > 20 ? timerStep : 20;
                var numStep = (range / settings.duration) * timerStep;

                _this.stop();

                (function animate() {
                    timer = setTimeout(function() {
                        curNum = Math.ceil( curNum + numStep );
                        if( (settings.endNum > settings.startNum && curNum >= settings.endNum) || (settings.endNum < settings.startNum && curNum <= settings.endNum) ) {
                            curNum = settings.endNum;
                        }
                        settings.element.text(curNum);
                        animateTime++;
                        if(typeof settings.callback == 'function') {
                            settings.callback(curNum);
                        }
                        animate();
                        if(curNum >= settings.endNum) {
                            _this.stop();
                        }
                    }, timerStep);
                })();
            }
        };
        return this.each(function() {
            return methods.start();
        });

    };


  $(window).on('scroll',function () {
  	if(isShow(targentLa)&&numLock){
  		animatNum1()
  		animatNum2()
  		animatNum3()
      animatNum4()
  		numLock = false
  	}
  })


  function animatNum1() {
    $('.pingtai-section .number-wrap .number-list>li .one').animatingNumber({
      from: 600,
      to: tarOne,
      duration:  1500

    })
  }
  function animatNum2() {
    $('.pingtai-section .number-wrap .number-list>li .two').animatingNumber({
      from: 0,
      to: tarTwo,
      duration:  1700

    })
  }
  function animatNum3() {
    $('.pingtai-section .number-wrap .number-list>li .three').animatingNumber({
      from: 600,
      to: tarThree,
      duration:  2500

    })
  }
  function animatNum4() {
    $('.pingtai-section .number-wrap .number-list>li .four').animatingNumber({
      from: 0,
      to: tarFour,
      duration:  3500

    })

  }

  // 数字快速滚动 结束



  // 快速查询 部分代码
  var userName = $('#user_name'),
      userPhone = $('#user_phone'),
      userBusiness = $('#user_business'),
      searchBtn = $('.search-btn'),
      userInput = $('.user-input input')


      userInput.each(function() {
        var _this = $(this)
        var inputValue = _this.attr('placeholder')
          _this
            .focus(function() {
              _this.attr({placeholder: ''})
            })
            .blur(function() {
              _this.attr({placeholder: inputValue})
            });
      })
  		searchBtn.on('click',function () {
  		 if (userPhone.val() === '') {
  		 	userPhone.addClass('warn-text')
  			userPhone.focus()
  			 return
  		 }
  	 })

    // 若有数值，进行判断处理
    function testInput(targentInput,regExp,passClass,errClass) {
      targentInput.blur(function() {
        if(regExp($(this).val())  ){
          $(this).addClass(passClass)
					$(this).siblings('.tip').hide('300');
        }else{
           $(this).addClass(errClass)
					 // console.log($(this));
					$(this).siblings('.tip').animate({
						zIndex: 0,
						top: '-39px'
					},
						600)
           $(this).focus()
           return
        }
      })
    }
    testInput(userName,isChineseName,'pass-text','warn-text')
    testInput(userPhone,isPhone,'pass-text','warn-text')
    testInput(userBusiness,isBusiness,'pass-text','warn-text')
// 提交成功后的处理
    // searchBtn.on('click',function () {
    //   searchBtn.addClass('passOK')
    //   searchBtn.text('您已成功提交 ! ')
    //   userInput.val('').removeClass('pass-text')

    // })

      function isChineseName(name) {
        var pattern = /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/
        return pattern.test(name)
      }
      function isPhone(number) {
        var pattern = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
        return pattern.test(number)
      }
      function isBusiness(busCon) {
        var pattern = /^([a-zA-Z0-9\u4e00-\u9fa5\·]{2,15})$/
        return pattern.test(busCon)
      }
  // 快速查询部分代码


  // help-bar start

  helpBar( $('.help-list-small .adv-btn'), $('.help-list-small .adv-btn .tip-block'),'-80px',0 )
  helpBar( $('.help-list-small .company-num'), $('.help-list-small .company-num .tip-block'),'-105px',0 )

  function helpBar( $tarNode,$movNode,distance,resDistance){
    $tarNode.mouseenter(function(){
     $movNode.animate({left: distance}, 300);
    }).mouseleave(function(){
     $movNode.animate({left: resDistance}, 200);
    })
  }


  toggleNode($('.help-list-small .qr-bar'),$('.help-list-small .qr-bar .pic-wrap'))
  toggleNode($('.help-list-small>li.go-top'),$('.help-list-small>li.go-top .item-text'))

  function toggleNode($tarNode,$showNode) {
   $tarNode.mouseenter(function () {
    $showNode.show(250)
  }).mouseleave(function () {
     $showNode.hide(200)
    })
  }


  function goTop($node,speed){
  	$node.on('click',function () {
  	  $('html').animate({
  	    scrollTop: '0px'
  	  },speed)
  	})
  }
  goTop($('.go-top'),300)
  goTop($('.help-list-big .to-top'),300)
  // help-bar end




  var navLis = $('.header-wrap .nav-list>li')
  navLis.each(function(index, ele) {
  	$(ele).on('click',function(e){
  		var target = $(e.target)
  		navLis.each(function(index, li) {
  			li = $(li)
  			li.removeClass('active')
  		});
  		target.parents().addClass('active')

  	})
  })


  function testType(obj) {
  	return {}.toString.call(obj).slice(8,-1)

  }

})//end
