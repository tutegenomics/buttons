angular.module('tute-buttons.radioGroup', [])

.directive('tuteRadioGroupButton', function() {

	return {

		restrict: 'EA',

		replace: true,

		scope: {
			buttons: '=', //object with button definitions
		},

		require: 'ngModel',

		template: `
		<div class="btn-group" data-toggle="buttons">
			<label ng-repeat="btn in buttons" class="{{ btn.classes }}" ng-class="{ 'active': btnIsActive(btn) }">
				<input 
					type="radio" 
					name="{{ groupName }}" 
					id="{{ groupName + ':' + $index }}" 
					autocomplete="off" 
					ng-checked="btn.preselected" 
					ng-click="onBtnClick(btn)"
				> {{ btn.label }}
			</label>
		</div>
		`,

		link: link
	};

	function link($scope, $el, $attrs, ngModel) {

		function generateUID() {
			return ("0000" + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4);
		}
		//prevent "name" attr collisions
		$scope.groupName = 'tuteBtnGroup' + '-' + generateUID();

		setInitialValue();

		function apiCheck() {
			if(!$scope.buttons) {
				return false;
			}
			else {
				return $scope.buttons.every(item => {
					return !(typeof item.value === 'undefined');
				});
			}
		}

		//set ngModel initially
		function setInitialValue() {
			if(!apiCheck()) {
				throw new Error('tuteRadioGroupButton: buttons must be defined and have a value property');
			}
			else {
				$scope.buttons.some(btn => {
					if(btn.preselected) {
						ngModel.$setViewValue(btn);
						return true; //break
					}
				});
			}
		}

		$scope.onBtnClick = function(btn) {
			ngModel.$setViewValue(btn);
		};

		$scope.btnIsActive = function(btn) {
			return ngModel.$viewValue.value === btn.value;
		};

	}

});