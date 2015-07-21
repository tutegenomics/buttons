angular.module('tute-buttons', [])

.directive('tuteButton', function() {

	//the DDO
	return {
		
		restrict: 'E',
		
		replace: true,
		
		scope: {
			btnType: '@',      //string, valid values: submit|button. Changes if <button> or <input type="submit" />
			loadingClass: '@', //string, CSS class that gets added when the button is loading. Default: 'btn-is-loading'
			loading: '=',      //bool, toggles loading/normal state
			loadingText: '=',  //string, text to change button when in loading state
			text: '=',         //string, default button text
		},

		//dynamically specify what template should be
		//<input type="submit" /> requires some extra love
		template: function(el, attrs) {
			if(!attrs.btnType || attrs.btnType === 'button') {
				return '<button>{{btnText}}</button>';
			}
			else if(attrs.btnType === 'submit') {
				return '<input type="submit" ng-value="btnText" />';
			}
			else {
				throw new Error('invalid btnType on tuteButton directive: ', attrs.btnType);
			}
		},

		link: link

	};


	function link($scope, el, attrs) {
		$scope.btnText = $scope.text;		
		var loadingClass = attrs.loadingClass || 'btn-is-loading';


		$scope.$watch('loading', function(newVal, oldVal) {
			if(newVal !== oldVal) {
				toggleState();
			}
		});


		function toggleState() {
			$scope.btnText = toggleText();
			el[0].className = toggleClass();
		}


		function toggleText() {
			return $scope.loading ? $scope.loadingText : $scope.text;
		}


		function toggleClass() {
			var classes = el[0].className.split(' ');
			var classIndex = classes.indexOf(loadingClass);

			if(classIndex === -1) {
				classes.push(loadingClass);
			}
			else {
				classes.splice(classIndex, 1);
			}

			return classes.join(' ');
		}
	}


});