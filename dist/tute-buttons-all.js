(function(){ 'use strict';

angular.module('tute-buttons', ['tute-buttons.loadingButton', 'tute-buttons.radioGroup']);
'use strict';

angular.module('tute-buttons.loadingButton', []).directive('tuteLoadingButton', function () {

	//the DDO
	return {

		restrict: 'E',

		replace: true,

		scope: {
			btnType: '@', //string, valid values: submit|button. Changes if <button> or <input type="submit" />
			loadingClass: '@', //string, CSS class that gets added when the button is loading. Default: 'btn-is-loading'
			loading: '=', //bool, toggles loading/normal state
			loadingText: '=', //string, text to change button when in loading state
			text: '=' },

		//string, default button text
		//dynamically specify what template should be
		template: function template(el, attrs) {
			if (!attrs.btnType || attrs.btnType === 'button') {
				return '<button>{{btnText}}</button>';
			} else if (attrs.btnType === 'submit') {
				return '<button type="submit">{{btnText}}</button>';
			} else {
				throw new Error('invalid btnType on tuteButton directive: ', attrs.btnType);
			}
		},

		link: link

	};

	function link($scope, el, attrs) {
		$scope.btnText = $scope.text;
		var loadingClass = attrs.loadingClass || 'btn-is-loading';

		$scope.$watch('loading', function (newVal, oldVal) {
			if (newVal !== oldVal) {
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

			if (classIndex === -1) {
				classes.push(loadingClass);
			} else {
				classes.splice(classIndex, 1);
			}

			return classes.join(' ');
		}
	}
});
'use strict';

angular.module('tute-buttons.radioGroup', []).directive('tuteRadioGroupButton', function () {

	return {

		restrict: 'EA',

		replace: true,

		scope: {
			buttons: '=' },

		//object with button definitions
		require: 'ngModel',

		template: '\n\t\t<div class="btn-group" data-toggle="buttons">\n\t\t\t<label ng-repeat="btn in buttons" class="{{ btn.classes }}" ng-class="{ \'active\': btnIsActive(btn) }">\n\t\t\t\t<input \n\t\t\t\t\ttype="radio" \n\t\t\t\t\tname="{{ groupName }}" \n\t\t\t\t\tid="{{ groupName + \':\' + $index }}" \n\t\t\t\t\tautocomplete="off" \n\t\t\t\t\tng-checked="btn.preselected" \n\t\t\t\t\tng-click="onBtnClick(btn)"\n\t\t\t\t> {{ btn.label }}\n\t\t\t</label>\n\t\t</div>\n\t\t',

		link: link
	};

	function link($scope, $el, $attrs, ngModel) {

		function generateUID() {
			return ("0000" + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
		}
		//prevent "name" attr collisions
		$scope.groupName = 'tuteBtnGroup' + '-' + generateUID();

		if ($scope.buttons && $scope.buttons.length > 0) {
			//set ngModel initially
			$scope.buttons.some(function (btn) {
				if (btn.preselected) {
					ngModel.$setViewValue(btn.label);
					return true; //break
				}
			});
		}

		$scope.onBtnClick = function (btn) {
			ngModel.$setViewValue(btn.label);
		};

		$scope.btnIsActive = function (btn) {
			return ngModel.$viewValue === btn.label;
		};
	}
}); })();