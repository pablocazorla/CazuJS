//App.js

;(function(){
	//Utils
	var toCamelCase = function(str){
		var newStr = str.replace(/\-(\w)/g, function (strMatch, p1){
			return p1.toUpperCase();
		});
		return newStr;
	},
	getStyle = function(el,str){
		if(document.defaultView && document.defaultView.getComputedStyle){
			return document.defaultView.getComputedStyle(el, "").getPropertyValue(str);
		}else if(el.currentStyle){
			str = toCamelCase(str);
			return el.currentStyle[str];
		}
	},
	
	//Cazu
	Cazu = {
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
					
					return getStyle(this.elem,arg1);
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
		
		on : function (eventType, eventHandler) {
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
			return this.on('click',eventHandler);
		},
		animate : function(attrs,vel,callb){
			
			var elm = this.elem;
			var timer = setInterval(function(){
				
				for(var a in attrs){
					var current = parseInt(getStyle(elm,a)),
					difVal = (current - parseInt(attrs[a])) * vel;
					
					elm.style[a] = Math.round(current - difVal) +'px';					
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
