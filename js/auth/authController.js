angular.module("myApp")
    .service("authService", function($rootScope, $location, $firebaseAuth, $firebaseObject, FB) {
        var data = {}
        data.ref = new Firebase(FB.url);
        data.authObj = $firebaseAuth(data.ref);
        data.authData = data.authObj.$getAuth();

        this.getAuthObj = function() {
            return data.authObj;
        };

        var getUSerDataFromFB = function() {
            if (data.authData) { // Set up user object if authData present
                var userRef = new Firebase(FB.url + '/users/' + data.authData.uid);
                data.user = $firebaseObject(userRef);
                data.user.$loaded().then(function(user) { // Wait for user to be loaded before setting user details
                    data.user.lastLogin = new Date().toString();
                    if (!data.user.name) {
                        data.user.name = authData.password.email;
                    }
                    data.user.$save();
                    // user.$bindTo($scope, 'user');
                    // $location.path("/memory");
                });
            } else {
                data.user = undefined;
            }
        };
        getUSerDataFromFB();


        data.authObj.$onAuth(function(authData) {
            if (authData !== data.authData) { // auth status changed
                // console.log('authData', authData);
                data.authData = authData;
                $rootScope.$broadcast("auth", {
                    authData: data.authData
                });
                getUSerDataFromFB();
            }
        });

        this.getAuthData = function() {
            return data.authData;
        }

        this.logout = function() {
            // console.log("logout");
            data.authObj.$unauth();
        };

        this.getUserData = function() {
            return data.user;
        };

        this.saveUserData = function() {
            data.user.$save();
        };

    })
    .controller("AuthController", function($scope, $firebaseAuth, authService, FB) {
        // console.log("AuthController init");

        var authObj = authService.getAuthObj();
        $scope.authData = authService.getAuthData();
        $scope.userData = authService.getUserData();
        console.log('$scope.authData', $scope.authData);
        $scope.$on("auth", function(event, args) {
            $scope.authData = args.authData;
            $scope.userData = authService.getUserData();
            // console.log("args", args, $scope.authData);
        });

        $scope.saveUserData = function(userData) {
            authService.saveUserData(userData);
        }

        $scope.login = function(user) {
            authObj.$authWithPassword(user).then(function(authData) {
                // console.log('login authData', authData);
            }, function(error) {
                $scope.msg = error;
                console.error("Login error", error);
            });
        };

        $scope.register = function(user) {
            authObj.$createUser(user).then(function(userData) {
                // console.log('login userData', userData);
                $scope.login(user);
            }, function(error) {
                console.error("Register error", error);
            });
        };

        $scope.reset = function(user) {
            authObj.$resetPassword({
                email: user.email
            }).then(function() {
                alert('Success! Password reset email sent.');
            }, function(error) {
                alert('Error! ' + JSON.stringify(error));
            });
        };

        $scope.changePassword = function(email, oldPassword, newPassword, newPasswordConfirmed) {
            if (newPassword !== newPasswordConfirmed) {
                alert('Passwords do not match!');
            } else {
                authObj.$changePassword({
                    email: email,
                    oldPassword: oldPassword,
                    newPassword: newPassword
                }).then(function() {
                    alert('success!');
                }, function(error) {
                    alert('Failure! ' + JSON.stringify(error));
                });
            }
        };

        $scope.googlePlus = function() {
            authObj.$authWithOAuthPopup('google');
        };

    });
