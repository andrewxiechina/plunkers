var app = angular.module('plunker', []);

app.controller('MainCtrl', function($scope) {
  $scope.name = 'World';
  $scope.answer = "我是老师";
});


app.component('edVoiceRecognizer', {
  bindings:{
    answer: '<'
  },
  template:'<div class="voice-recognition-bar" ng-class="{rightanswer: $ctrl.rightAnswer}">'+
      '<span ng-click="$ctrl.toggleSpeech()" class="fa fa-microphone mic-icon"></span>'+
      '<span class="message">{{$ctrl.msg}}</span>'+
      '</div>',
  controller: ['$scope', function($scope){
    var ctrl = this;
    var lang = "zh-CN";
    var spaceKeyPressed = false;
    ctrl.msg = "Click to say something to me...";
    var isStarted = false;
    ctrl.rightAnswer = false;
    
    var recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.lang = lang;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    ctrl.toggleSpeech = function(){
      console.log("Starting speech...");
      if(isStarted){
        recognition.stop();
        isStarted = false;
      }else{
        recognition.start();
        isStarted = true;
      }
    };

    recognition.onresult = function(event) {
        ctrl.msg = event.results[0][0].transcript;
        if(ctrl.answer === ctrl.msg){
          ctrl.rightAnswer = true;
        }else{
          ctrl.rightAnswer = false;
        }
        $scope.$apply();
    };
    
    recognition.onaudiostart = function() {
      ctrl.msg = 'I\'m lisening...';
      $scope.$apply();
    };
    
    recognition.onaudioend = function() {
    };
    
    recognition.onerror = function(event) {
      console.log('Speech recognition error detected: ' + event.error);
    };

  }]
});
