window.onload = function () {
	

	//第一部分：banner轮播图


	var bannerSwipe = (function () {
		var image_wrap = document.querySelector(".image");

		function next_pic () {
			index++;
			if(index > 2){
				index = 0;
			}
			var newLeft;
			if(image_wrap.style.left === "-4616px"){
				newLeft = -2308;
			}else{
				newLeft = parseInt(image_wrap.style.left)-1154;
			}
			image_wrap.style.left = newLeft + "px"; 
			showCurrentDot();
		}

		var timer = null;
		function autoPlay () {
			timer = setInterval(function () {
				next_pic();
			},3000);
		}
		autoPlay();


		// 下面这段代码表示当鼠标划过banner时停止计时器
		var img_container = document.querySelector(".image-outer");
		img_container.onmouseenter = function () {
			clearInterval(timer);
		}
		img_container.onmouseleave = function () {
			autoPlay();
		}

		var index = 0;
		var dots = document.querySelectorAll(".list-num li");
		function showCurrentDot () {
			for (var i = 0, len = dots.length; i < len; i++) {
				dots[i].className = "";
			}
			dots[index].className = "selected";
		}


		var list_nums = document.querySelector(".list-num").querySelectorAll("li");
		for (var i = 0, len = list_nums.length;i < len; i++) {
			(function (i) {
				list_nums[i].onclick = function () {
					var distance = index - i;
					if(index == "0" && image_wrap.style.left == "-4616px"){
						distance = 3 + distance;
					}
					image_wrap.style.left = (parseInt(image_wrap.style.left) + 1154*distance) + "px";
					index = i;
					showCurrentDot();
				}
			})(i);
		}

	})();

    // 产品展示平滑滚动
    (function ($) {
        var scorllTo = function (scrollTop, duration) {
            var scrollTop = scrollTop || 0;
            var duration = duration || 500;
            $('body').animate({scrollTop: scrollTop}, duration);
        };
        $('.show-product').click(function(){
            scorllTo($('.intro-image').offset().top);
        });
    })(jQuery);


	// 第二部分：成员风采图片切换



	var fade = (function () {
		$(".left-arrow,.right-arrow").click(function(){
			if(!$(".presence").is(":animated")){
				var imgpattern = /presence_2/;
				if(imgpattern.test($(".presence-img").attr("src"))){
					$(".presence-img").fadeOut("fast", function () {
                        $(".presence-img").attr("src","./img/presence_1.png")
                        .fadeIn("slow");
                    });
				}else{
					$(".presence-img").fadeOut("fast", function () {
                        $(".presence-img").attr("src","./img/presence_2.png")
                        .fadeIn("slow");
                    })
				}
			}
		});
	})();





	//第三部分：我们的团队下拉菜单和轮播图
	var teamSwipe = (function () {
		var links = document.getElementsByClassName("big-team");
		var link = null;
		var small_lists = document.getElementsByClassName("small-list");
		var li_items = null;
		for (var i = 0,len = links.length; i < len; i++) {
			link = links[i];
			link.index = i;
			link.onmouseenter = function () {
				for (var j = 0; j < len; j++) {
					small_lists[j].style.display = "none";
				}
				small_lists[this.index].style.display = "block";
				this.className = "big-team big-team-selected";
				li_items = small_lists[this.index].getElementsByTagName("li");
		        for(var k = 0,len = li_items.length;k<len;k++){
		        	(function(k){
			        	li_items[k].onmouseenter = function () {
			        		var src = this.getElementsByTagName("img")[0].getAttribute("src");
			        		var newSrc = src.replace(".png","_hover.png");
			        		this.style.backgroundColor = "#ffffff";
			        		this.getElementsByTagName("img")[0].setAttribute("src",newSrc);
			        	}
			        	li_items[k].onmouseleave = function () {
			        		var src = this.getElementsByTagName("img")[0].getAttribute("src");
			        		var newSrc = src.replace("_hover.png",".png");
			        		this.style.backgroundColor = "#e9e9e9";
			        		this.getElementsByTagName("img")[0].setAttribute("src",newSrc);
			        	}
			        })(k);
		        }
			};
			link.onmouseleave = function () {
				var that = this;
				this.className = "big-team";
				small_lists[that.index].style.display = "none";
			};

		}
		for(var i = 0; i < 12; i++){
			(function (i) {
				$(".team-list li:not(.big-team)").eq(i).click(function () {
				var distance = currentIndex - i;
				$(".team-image").animate({left:"+="+distance*1207+"px"},500,lightCurrentImg);			
				currentIndex = i;
				showCurrentName();
				});
			})(i);
		}


		// 下面使用jquery制作“我们的团队”模块轮播图
		var currentIndex = 0;

		$(".team-right").click(function () {
			if(!$(".team-image").is(":animated")){
				next_pic();
			}
		});
		$(".team-left").click(function () {
			if(!$(".team-image").is(":animated")){
				prev_pic();
			}
		});
		function next_pic () {
			currentIndex++;
			if(currentIndex > 11){
				currentIndex = 0;
			}
			if(parseInt($(".team-image").position().left) === -14484){
				$(".team-image").animate({left:"0"},0);			
				$(".team-image").animate({left:"-=1207px"},500,lightCurrentImg);			
			}else{
				$(".team-image").animate({left:"-=1207px"},500,lightCurrentImg);			
			}
			showCurrentName();
		} 
		function prev_pic () {
			currentIndex--;
			if(currentIndex < 0){
				currentIndex = 11;
			}
			if(parseInt($(".team-image").position().left) === -1207){
				$(".team-image").animate({left:"-15691px"},0);			
				$(".team-image").animate({left:"+=1207px"},500,lightCurrentImg);			
			}else{
				$(".team-image").animate({left:"+=1207px"},500,lightCurrentImg);			
			}
			showCurrentName();
		} 

		// 使下面的部门名称同步更新
		function showCurrentName () {
			for(var i = 0; i < 12; i++){
				$(".image-name img").eq(i).removeClass("on");
			}
			$(".image-name img").eq(currentIndex).addClass("on");
		}
		showCurrentName();

		// 是当前图片明亮，其他图片添加black类
		function lightCurrentImg () {
			var currentImg = Math.abs(parseInt($(".team-image").position().left)/1207);
			for(var i = 1; i < 13; i++){
				$(".team-image div").eq(i).addClass("black");
			}
			$(".team-image div").eq(currentImg).removeClass("black");
		}
		lightCurrentImg();
	})();





	// 第四部分：产品展示动画显示，固定img外层div宽度和高度
	var setImgWrapperSize = (function () {
		var img_wraps = document.querySelectorAll(".img-wrap");
		var img_wrap_img = document.querySelectorAll(".img-wrap img");
		for(var i = 0; i < 7; i++){
			img_wraps[i].style.width = window.getComputedStyle(img_wrap_img[i]).width;
			img_wraps[i].style.height = window.getComputedStyle(img_wrap_img[i]).height;
		}
	})();
};