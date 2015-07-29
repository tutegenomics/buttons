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

		setInitialValue();

		function apiCheck() {
			if (!$scope.buttons) {
				return false;
			} else {
				return $scope.buttons.every(function (item) {
					return !(typeof item.value === 'undefined');
				});
			}
		}

		//set ngModel initially
		function setInitialValue() {
			if (!apiCheck()) {
				throw new Error('tuteRadioGroupButton: buttons must be defined and have a value property');
			} else {
				$scope.buttons.some(function (btn) {
					if (btn.preselected) {
						ngModel.$setViewValue(btn);
						return true; //break
					}
				});
			}
		}

		$scope.onBtnClick = function (btn) {
			ngModel.$setViewValue(btn);
		};

		$scope.btnIsActive = function (btn) {
			return ngModel.$viewValue.value === btn.value;
		};
	}
});