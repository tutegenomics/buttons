'use strict';

angular.module('app', [
	'tute-buttons'
])

.controller('mainCtrl', function($scope, $http) {

	$scope.requestPending = false;
	$scope.selectedPokemon = '';

	function randomIntFromInterval(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	//gets it randomly
	$scope.getPokemon = function() {
		$scope.requestPending = true;

		return $http({
			url: 'http://pokeapi.co/api/v1/sprite/' + randomIntFromInterval(1, 668),
			method: 'GET'
		})
		.then(
			function ok(res) {
				$scope.selectedPokemon = res.data.pokemon.name;
			},
			function err(e) { console.log(e); }
		)
		.finally(function() {
			$scope.requestPending = false;
		});
	};

	$scope.toggleLoadingState = function() {
		$scope.requestPending = !$scope.requestPending;
	};

	//radio buttons for radio group directive
	//the value of the directive is assigned to $scope.radioVal
	var radioClasses = 'btn btn-default';
	$scope.radios = [
		{
			label: 'Charmander',
			value: 1,
			preselected: true,
			classes: radioClasses
		},
		{
			label: 'Bulbasaur',
			value: 2,
			classes: radioClasses
		},
		{
			label: 'Squirtle',
			value: 3,
			classes: radioClasses
		}
	];


});