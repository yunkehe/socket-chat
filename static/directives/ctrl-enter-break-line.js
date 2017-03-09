
chatRoomApp.directive('ctrlEnterBreakLine', function(){
	return function(scope, element, attrs){
		var ctrlDown = false;

		element.bind('keydown', function(e){
			if(e.keyCode === 17){
				ctrlDown = true;
				setTimeout(function(){
					ctrlDown = false;
				}, 1000)
			}

			if(e.keyCode === 13){
				if(ctrlDown){
					element.val(element.val()+'\n');
				}else{
					scope.$apply(function(){
						scope.$eval(attrs.ctrlEnterBreakLine);
					})
					e.preventDefault();
				}
			}
		})

	};
});