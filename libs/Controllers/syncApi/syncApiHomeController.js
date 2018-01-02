var scotchApp = angular.module('FL')
    .controller('syncApiController', function($scope, $rootScope, myService, $location) {
        if (localStorage.getItem('is_userLogin') == 'true') {
            if (localStorage.getItem('userEmail') == undefined) {
                $rootScope.hideInGuestMode = false;
            } else {
                $rootScope.hideInGuestMode = true;
            }
        }

        $scope.setActive1 = function(menuItem) {
            $rootScope.activeMenu2 = menuItem;
        }
        $scope.eventTrigerChange = function() {
            $scope.eventTrigerChangeInputShow = true;
            $scope.setEventTrigerButtonShow = true;
        };
        $('.collapsible').collapsible();
        $scope.setEventTrigerButtonShow = false;
        var syncApiCobrandSessionToken;
        console.log('syncApiController');
        $rootScope.navBar = true;
        $rootScope.activeMenu1 = 'syncApi';


        var FetchDeveloperCobrandListParams = {
            userId: localStorage.getItem('userId')
        };

        myService.postRequest(url.webSiteMainUrl + 'syncApi/getCobrandList.php', FetchDeveloperCobrandListParams).then(function(data) {

            var data = data.data;
            $scope.CobrandList = data;
        });

        $scope.fetchDetailsForCobrandEdit = function(cobrandname) {
            $rootScope.CobrandDetailsSyncApi = cobrandname;
            $location.path('/editCobrandSync');
        };

        $scope.CobrandDeleteButtonClicked = function(cobrandname, index) {
            $scope.CobrandList.splice($scope.CobrandList.indexOf(cobrandname), 1);
            var DeleteCobrandDetailsParams = {
                CobrandId: cobrandname.id
            };

            myService.postRequest(url.webSiteMainUrl + 'syncApi/DeleteCobrand.php', DeleteCobrandDetailsParams).then(function(data) {
                var data = data.data;

            });

        };

        $scope.CobrandLogin = function(cobrandname) {

            $('.collapsible').collapsible();
            $rootScope.progressBar = true;

            Main_URL = cobrandname.restUrl;

            $scope.SingleCobrandList = [cobrandname];

            var CobrandLoginParams = {
                url: cobrandname.YSLURL + YSLUrl.Cobrand_Login_url,
                "cobrand": {
                    "cobrandLogin": cobrandname.cobrandName,
                    "cobrandPassword": cobrandname.cobrandPassword
                }
            };

            myService.postRequestNode(BASE_URL + 'syncApi/CobrandLogin', CobrandLoginParams).then(function(data) {
                var data = data.data;
                $rootScope.progressBar = false;
                syncApiCobrandSessionToken = data.session.cobSession;
                $scope.CobrandDetailsHeader = true;
                $scope.cobrandProgressDetails = true;
                $scope.CobrandLoginStatus = "done";
                $scope.CobrandLoginStatusColor = "green";
                $scope.LaunchSectionView = true;
            });
        };

        //Event Congigure Call 

        $scope.eventConfigureButtonClicked = function() {
            console.log($scope.SingleCobrandList[0]);
            // var DeleteCobrandDetailsParams = {
            //     CobrandId: $scope.SingleCobrandList.id;
            // };

            myService.postRequest(BASE_URL + 'syncApi/DeleteCobrand.php', DeleteCobrandDetailsParams).then(function(data) {
                var data = data.data;

            });

        };

        $scope.dataExtractsEvents = function() {

            var currentdate = new Date();
            var year = currentdate.getFullYear();
            var month = currentdate.getMonth() + 1;
            var date = currentdate.getDate() - 1;
            var newMonth;
            if (month < 10) {
                newMonth = "0" + month;
            } else {
                newMonth = month;
            }

            var timeDate = new Date();
            var utc = timeDate.getTime() + (timeDate.getTimezoneOffset() * 60000);
            var nd = new Date(utc + (3600000 * '-7'));
            var timeDate1 = nd.toLocaleString();
            var ar = timeDate1.indexOf(',');
            var arr = timeDate1.substring(ar + 2);
            var arrr = arr.split(':');
            var currentTime = arrr[0] + ":" + arrr[1] + ":" + arrr[2];
            var previousHour = Number(arrr[0]) - 1;
            if (previousHour < 10) {
                newpreviousHour = "0" + previousHour;
            } else {
                newpreviousHour = previousHour;
            }

            var toDate = year + "-" + newMonth + "-" + date + "T" + currentTime;
            var fromDate = year + "-" + newMonth + "-" + date + "T" + previousHour + ":" + arrr[1] + ":" + arrr[2];

            var dataExtractsEventsParams = {
                url: $scope.SingleCobrandList[0].YSLURL + YSLUrl.dataExtractsUrl + "eventName=",
                eventName: 'DATA_UPDATES',
                fromDate: fromDate,
                toDate: toDate,
                cobSession: "cobSession=" + syncApiCobrandSessionToken
            };

            myService.postRequestNode(BASE_URL + 'syncApi/dataExtractsEvents', dataExtractsEventsParams).then(function(data) {
                var data = data.data.event.data.userData;
                $scope.dataExtractsData = data;
            });
        };
        var lastIndex = -1;
        $scope.getParticularUserData = function(parameters, index) {
            if (lastIndex != index) {
                lastIndex = index;
                $scope.dataExtractsDatatext = false;
                $scope.dataExtractsLoadingIndecator_show = false;
                var getParticularUserDataParams = {
                    url: $scope.SingleCobrandList[0].YSLURL + parameters[0].href,
                    cobSession: "cobSession=" + syncApiCobrandSessionToken
                };

                myService.postRequestNode(BASE_URL + 'syncApi/getParticularUserData', getParticularUserDataParams).then(function(data) {
                    $scope.dataExtractsLoadingIndecator_show = true;
                    var data = data.data;
                    $scope.dataExtractsDatatext = true;
                    $scope.getParticularUserDataa = JSON.stringify(data, undefined, 10);
                });
            };
        };
    });