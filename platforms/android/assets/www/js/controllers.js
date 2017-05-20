angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

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
})

.controller('PlaylistsCtrl', function($scope,$ionicLoading,$http,$ionicSideMenuDelegate) {
/*$scope.$on('$ionicView.enter', function(){
    $ionicSideMenuDelegate.canDragContent(false);
  });*/
/*if(window.cordova)
    {
         FCMPlugin.onNotification(function (data) {
                    if (data.wasTapped) {
                        //Notification was received on device tray and tapped by the user. 
//                        $scope.datas=data;
                        alert(data.message);
                        localStorage.setItem("Message",data.message);
                        
                        console.log(data);
                    } else {
                        //Notification was received in foreground. Maybe the user needs to be notified. 
//                        $scope.datas=data;
                        alert(JSON.stringify(data.message));
                        localStorage.setItem("Message",data.message);
                        console.log(JSON.stringify(data));
                    }
                });
    }*/
var list=[];
//$scope.datas=localStorage.getItem("Message");
$scope.send=function(msg){
if(msg)
    {
        console.log(msg);
        var payload_msg={
  "notification":{
    "title":"Notification title",
    "body":"Notification body",
    "sound":"default",
    "click_action":"FCM_PLUGIN_ACTIVITY",
    "icon":"fcm_push_icon"
  },
  "data":{
    "message": msg
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
        messge_data.success(function (response) {
//            alert("Success");
            list.push(msg);
           $scope.datas=list;
            
        })
        messge_data.error(function (response) {
            alert("Error");
            
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
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
