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
	}
	MoveSlides.prototype.moveOut = function(){
		var that = this;
		this.slides.onmouseout = function(){
			that.run();
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
	


	//moving text
	var run_text = document.getElementById("run_text");
	var welcome = document.getElementById("welcome");
	var run_len = welcome.offsetWidth-run_text.offsetWidth;
	var step = 5;

	var text_run = setInterval(function(){
		run_text.style.left = (run_text.offsetLeft + step) +'px';
		if(run_text.offsetLeft>=run_len || run_text.offsetLeft<=0){
			step = -step;
		}
	},100);

	
}