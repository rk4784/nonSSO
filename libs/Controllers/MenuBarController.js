var scotchApp = angular.module('FL')
    .controller('MenuBarController', function($scope, $rootScope, $location) {
        $rootScope.navBar = false;
        $rootScope.progressBar = false;
        if (localStorage.getItem('is_userLogin') == 'true') {
            if (localStorage.getItem('userEmail') == undefined) {
                $rootScope.hideInGuestMode = true;
            }
        }
        $scope.logoutButtonClicked = function() {
            localStorage.setItem('is_userLogin', "false");
            localStorage.removeItem('userId');
            localStorage.removeItem('DeveloperRole');
            localStorage.removeItem('userEmail');
            $location.path('/login');
        };
        $rootScope.activeMenu1 = "home";
        $scope.activeMenu = function(menu) {
            if (menu == 'home') {
                $rootScope.activeMenu1 = "home";
            } else if (menu == 'adcobrand') {
                $rootScope.activeMenu1 = "adcobrand";
            } else if (menu == 'syncApi') {
                $rootScope.activeMenu1 = "syncApi";
            }
        };

    });