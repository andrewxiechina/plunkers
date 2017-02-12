var app = angular.module('plunker', []);

app.controller('MainCtrl', ['$scope',function($scope) {
  $scope.finish = function(){
    console.log("Turn to next page");
  }
}]);


app.component('edVoiceRecognizer', {
  bindings: {
    url: '@',
    autoplay: '<',
    onFinish: '&'
  },
  template: '<span class="fa" ng-click="$ctrl.togglePlay()" ng-class=\'{"fa-volume-up": $ctrl.isPlaying, "fa-volume-off": !$ctrl.isPlaying}\'></span>',
  controller: ['$scope', function($scope) {
    var ctrl = this;
    ctrl.isPlaying = false;
    var sound = new Howl({
      src: [ctrl.url],
      volume: 0.2
    });

    ctrl.togglePlay = function() {
      if (ctrl.isPlaying) {
        sound.pause();
      } else {
        sound.play();
      }
    };

    sound.on('play', function() {
      ctrl.isPlaying = true;
      $scope.$apply();

    });

    sound.on('pause', function() {
      ctrl.isPlaying = false;
      $scope.$apply();
    });

    sound.on('end', function() {
      ctrl.isPlaying = false;
      $scope.$apply();
      ctrl.onFinish();
    });
    
    if(ctrl.autoplay){
      sound.play();
    }
  }]
});