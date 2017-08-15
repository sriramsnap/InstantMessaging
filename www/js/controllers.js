angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$ionicPopup,$ionicLoading,$ionicHistory,$state) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
    
    
    $scope.logout=function(){
      var confirmPopup = $ionicPopup.confirm({
     title: 'Sure to Logout!',
     template: 'Are you sure to Logout?'
   });
      
      confirmPopup.then(function(res) {
     if(res) {
       console.log('You are sure');
        $ionicHistory.nextViewOptions({
                    disableBack: true
                });
                $ionicHistory.clearHistory();
         $ionicLoading.show({
                        template: 'Successfully Logged Out!'
                        , duration: 1000
                    , });
                $state.go("introduce");
                localStorage.removeItem("InstaMessageUserName");
     } else {
       console.log('You are not sure');
     }
   });
    };
})

.controller('messgingPageCtrl', function($scope,$ionicLoading,$http,$ionicSideMenuDelegate,$ionicScrollDelegate,$rootScope) {

    $scope.Username=localStorage.getItem("InstaMessageUserName");
var list=[];
$scope.send=function(msg){
if(msg)
    {
        console.log(msg);
        var payload_msg={
  "notification":{
    "title":"A new Message from "+localStorage.getItem("InstaMessageUserName"),
    "body":msg.message,
    "sound":"default",
    "click_action":"FCM_PLUGIN_ACTIVITY",
    "icon":"fcm_push_icon"
  },
  "data":{
    "message": msg.message,
      "sender":localStorage.getItem("InstaMessageUserName")
  },
    "to":"/topics/topicExample",
    "priority":"high",
    "restricted_package_name":""
}
        var messge_data = $http({        
                    url: 'https://fcm.googleapis.com/fcm/send'
                    , method: "POST"
                    , data: JSON.stringify(payload_msg)
                    , headers: {            
                      'Content-Type': 'application/json',
                      'Authorization':'key=AIzaSyDo0nYbBoZgGm8Z6RmtggfjO8zU0Wmp_CY'
                                }    
                                });
        $ionicLoading.show({
                content: '<i class="icon ion-loading-c"></i>'
                , animation: 'fade-in'
                , showBackdrop: false
                , maxWidth: 50
                , showDelay: 0
            });
        messge_data.success(function (response) {
            console.log("Successfully Snet");
            $ionicLoading.hide();     
            
        })
        messge_data.error(function (response) {
            alert("Error" +response);
            $ionicLoading.hide();
            
        })
        
    }
    else
        {
             $ionicLoading.show({
                    template: 'Enter Some Message!',
                    noBackdrop: false,
                    duration: 2000
                });
        }
};
    
    
    $rootScope.live_update=function(data){
         $ionicLoading.show({
                    template: 'Refreshing...',
                    noBackdrop: true,
                    duration: 1000
                });
                    console.log(data);
                 var user=data.sender+' : '+data.message;
                    console.log(user);
            list.push(user);
                console.log(list);
                $scope.datas=list;
    
    };
    
})

.controller('introduceCtrl', function($scope, $stateParams,$state,$ionicPopup,$ionicLoading) {
      // Perform the login action when the user submits the login form
  $scope.doLogin = function(loginData) {
    console.log('Doing login', loginData);
      var confirmPopup = $ionicPopup.confirm({
     title: 'Sure to submit!',
     template: 'Are you sure to save this name , as this name will be visble to everyone ?'
   });
      
      confirmPopup.then(function(res) {
     if(res) {
       console.log('You are sure');
         $state.go('app.messgingPage');
                    localStorage.setItem("InstaMessageUserName", loginData.username);
                    console.log(localStorage.getItem("InstaMessageUserName"));
                    $ionicLoading.show({
                        template: 'Welcome ' + localStorage.getItem("InstaMessageUserName")
                        , duration: 1000
                    , });
     } else {
       console.log('You are not sure');
     }
   });
 };
       

});
