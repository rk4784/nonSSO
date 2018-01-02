scotchApp.controller('editCobrandsyncApiController', function($scope, $rootScope, myService, $location) {
    console.log('editCobrandsyncApiController');
    var fetchSingleCobrandDetailsParams = {
        CobrandId: $rootScope.CobrandDetailsSyncApi.id
    };

    myService.postRequest(url.webSiteMainUrl + 'syncApi/fetchSingleCobrandDetails.php', fetchSingleCobrandDetailsParams).then(function(data) {
        var data = data.data;
        $scope.BankName = data[0].BankName;
        $scope.YSLURL = data[0].YSLURL;
        $scope.cobrandName = data[0].cobrandName;
        $scope.cobrandPassword = data[0].cobrandPassword;

    });

    $scope.editButtonClicked = function() {

        $rootScope.progressBar = true;

        var EditCobrandDetailsParams = {
            CobrandId: $rootScope.CobrandDetailsSyncApi.id,
            BankName: $scope.BankName,
            YSLURL: $scope.YSLURL,
            cobrandName: $scope.cobrandName,
            cobrandPassword: $scope.cobrandPassword,
        };

        myService.postRequest(url.webSiteMainUrl + 'syncApi/UpdateCobrandsDetails.php', EditCobrandDetailsParams).then(function(data) {

            var data = data.data;

            if (data[0].status == 1) {
                $location.path('/syncApi');
                $rootScope.activeMenu1 = 'syncApi';
            } else {
                alert('Cobrand Edit Failed');
            }
            $rootScope.progressBar = false;
        });
    };



});