window.onload=function(){

	//dropdown event
	function ShowTab(tabid,menuid){
		this.li = document.getElementById(tabid);
		this.menu = document.getElementById(menuid);
		this.selectOver();
		this.selectOut(); 
	}
	//mouse over event
	ShowTab.prototype.selectOver = function(){
		var that = this;
		this.li.onmouseover=function(){
			this.className="on";
			that.menu.style.display="block";
		}
	}
	//mouse out event
	ShowTab.prototype.selectOut = function(){
		var that = this;
		this.li.onmouseout=function(){
			this.className="";
			that.menu.style.display="none";
		}
	}

	var tab1 = new ShowTab('dropdown-li1','toggle-menu1');
	var tab2 = new ShowTab('dropdown-li2','toggle-menu2');
	var tab2 = new ShowTab('dropdown-li3','toggle-menu3');
	//dropdown event ends



	//slider event with big pictures



	function MoveSlides(slideid,indexid,slide_width,slide_num,index_class){
		this.slides = document.getElementById(slideid);
		this.lis = document.getElementById(indexid).getElementsByTagName("li");
		this.slideWidth = slide_width;
		this.slideNum = slide_num;
		this.indexClass = index_class;
		this.slides.style.left = "0";
		
		this.init();
		this.run();
		
		this.moveOver();
		this.moveOut();

	}

	//showing first slide and first index number;
	MoveSlides.prototype.init = function(){
			this.count = 0;
			this.lis[this.count].className = this.indexClass;
	}

	//slide and index number move together
	MoveSlides.prototype.run = function(){
		var that = this;
		this.timer = setInterval(function(){
			that.count++;
			that.count %= that.slideNum;
			that.slides.style.left = -1*parseInt(that.slideWidth)*that.count+'px';
			that.moveIndex();
		},2000);
		this.bindIndex();
	};

	//give corresponding index number a class(background color)
	MoveSlides.prototype.moveIndex = function(){
		for(var i=0; i<this.lis.length;i++){
			this.lis[i].className = "";
		}
		this.lis[this.count].className = this.indexClass;
	}

	//two events
	MoveSlides.prototype.moveOver = function(){
		var that = this;
		this.slides.onmouseover = function(){
			clearInterval(that.timer);
		}
		//this.bindIndex();
	}
	MoveSlides.prototype.moveOut = function(){
		var that = this;
		this.slides.onmouseout = function(){
			that.run();
		}
	}
	//bind index with each slides
	MoveSlides.prototype.bindIndex = function(){
		var that = this;
		for(var i=0;i<this.lis.length;i++){
			this.lis[i].onclick = (function(index){
				return function(){
					clearInterval(that.timer);
					for(var j=0;j<that.lis.length;j++){
						that.lis[j].className="";
					}
					this.className = that.indexClass;
					that.slides.style.left = -1*parseInt(that.slideWidth)*index+'px';
				}
			})(i);
		}
		
	}

	var myslides = new MoveSlides('pic-slider','nav','1000px',5,"slideOn");

	//slider event with big pictures ends.


	//small pictures mouse over/out event:
	var small_lis = document.getElementById("small_li").getElementsByTagName("li");
	showContent(small_lis);
	
	function showContent(con_li){
		for(var i=0, len=con_li.length;i<len;i++){
		con_li[i].onmouseover=function(){
			this.className="smallOn";
		}
		con_li[i].onmouseout=function(){
			this.className="";
		}
	}
	}
	
	//rolling news function
	function Move(id){
		var that = this;
		this.ul = document.getElementById(id);
		this.h = this.ul.offsetHeight;
		this.ul.style.top = "0";
		//get a copy of the news list
		this.ul.innerHTML += this.ul.innerHTML;
		this.start();
		this.switch();
	}
	Move.prototype.start = function(){
		var that = this;
		//set timer to let the news move up
		this.timer = setInterval(function(){
			that.go();
		},100);
		
	}
	Move.prototype.switch = function(){
		var that = this;
		//set mouse over and out event for browing the news
		this.ul.onmouseover = function(){
			clearInterval(that.timer);
		}
		this.ul.onmouseout = function(){
			that.start();
		}
	}
	Move.prototype.go = function(){
		var t = Math.abs(parseInt(this.ul.style.top));
		//when the news list is moving out of the wrapper, pull back the list to let the top value = 0
		if(t>=this.h){
			this.ul.style.top = "0";
		}else{
			this.ul.style.top = parseInt(this.ul.style.top) - 5 +'px';
		}
	}

	var movingNews = new Move('moving_news');

	//moving text
	var run_text = document.getElementById("run_text");
	var welcome = document.getElementById("welcome");
	var step = 5;
	ele_move(run_text,welcome,step);

	function ele_move(ele,wrapper,step){
		var run_len = wrapper.offsetWidth-ele.offsetWidth;
		setInterval(function(){
			ele.style.left = (ele.offsetLeft + step) +'px';
			if(ele.offsetLeft>=run_len || ele.offsetLeft<=0){
				step = -step;
			}
		},100);
	}

}