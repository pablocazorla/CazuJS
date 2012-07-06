//App.js

;(function(){
	
	var Cazu = {
		id : null,
		elem : null,
		
		init : function(id){
			this.id = id;
			this.elem = document.getElementById(id);
			return this;
		},
		
		bind : function (eventType, eventHandler) {
			if (this.elem.addEventListener) {
				this.elem.addEventListener(eventType, eventHandler,false);
			} else if (this.elem.attachEvent) {
				eventType = "on" + eventType;
				this.elem.attachEvent(eventType, eventHandler);
			} else {
				this.elem["on" + eventType] = eventHandler;
			}
			return this;
		},
		click : function(eventHandler){
			return this.bind('click',eventHandler);
		},
		animate : function(attrs,duration,callb){
			
			var elm = this.elem,
				time = 0;
			elm.style.left = "0px";
			var timer = setInterval(function(){
				
				for(var a in attrs){
					var aVal = parseInt(elm.style[a]);
					elm.style[a] = aVal + 1 +'px';					
				}
				time++;
				log(time)
				if(time==duration){
					clearInterval(timer);
					callb();
				}
				
				
			},16)
		}
		
		
		
		
		
		
		
		
		
		
		
	};	
	if(!window.Cazu){
		window.Cazu = function(id){
			return Cazu.init(id);
		}
	};	
})();
