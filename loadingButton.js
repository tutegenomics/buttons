.directive('tuteButton', function() {
  
  return {
    restrict: 'E',
    scope: {
      type: '=',
      loading: '=',
      loadingText: '=',
      text: '=',
    },
    template: '<button class="{{btnClass}}">{{text}}</button>',
    link: function($scope) {      
      $scope.btnClass= 'btn-' + $scope.type;
      $scope.firstClick = false;
      
      $scope.$watch('loading', function() {
        if($scope.loading) {
          $scope.originalText = $scope.text;
          $scope.text = $scope.loadingText;
          $scope.firstClick = true;
        }
        else if($scope.firstClick) {
          $scope.text = $scope.originalText;
        }
      });
      
      
    }
  };
  
});