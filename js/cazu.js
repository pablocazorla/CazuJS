//App.js

;(function(){
	//Utils
	var toCamelCase = function(str){
		var newStr = str.replace(/\-(\w)/g, function (strMatch, p1){
			return p1.toUpperCase();
		});
		return newStr;
	}
	
	
	var Cazu = {
		id : null,
		elem : null,
		
		init : function(id){
			this.id = id;
			this.elem = document.getElementById(id);
			return this;
		},
		css : function(arg1,arg2){
			if(typeof arg1 == 'string'){
				if(typeof arg2 == 'string'){
					var obj = {};
					obj[arg1] = arg2;
					arg1 = obj;
				}else{
					var val = "";
					if(document.defaultView && document.defaultView.getComputedStyle){
						val = document.defaultView.getComputedStyle(this.elem, "").getPropertyValue(arg1);
					}else if(this.elem.currentStyle){
						arg1 = toCamelCase(arg1);
						val = this.elem.currentStyle[arg1];
					}
					return val;
				}
			}
			if(typeof arg1 == 'object'){
				for(var a in arg1){
					var aC = toCamelCase(a);					
					this.elem.style[aC] = arg1[a];
				}
				return this;
			}
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
