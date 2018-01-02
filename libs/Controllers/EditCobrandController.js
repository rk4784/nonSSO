scotchApp.controller('editCobrandController', function($scope, $rootScope, myService, $location) {
    // console.log($rootScope.CobrandDetails);
    // console.log($rootScope.CobrandDetails.id);
    $rootScope.navBar = true;
    $rootScope.progressBar = true;
    var fetchSingleCobrandDetailsParams = {
        CobrandId: $rootScope.CobrandDetails.id
    };

    myService.postRequest(url.webSiteMainUrl + 'fetchSingleCobrandDetails.php', fetchSingleCobrandDetailsParams).then(function(data) {

        var data = data.data;
        // console.log('fetchSingleCobrandDetails=====================' + angular.toJson(data));
        if (data[0].Product == "FL") {
            $scope.hideInFL = false;
        } else {
            $scope.hideInFL = true;
        }
        $scope.envsType = data[0].is_YSL;
        $scope.BankName = data[0].BankName;
        $scope.ProductType = data[0].Product;
        $scope.productTypes = ['IAV', 'FL', 'PFM3.0'];
        $scope.envsTypes = ['YSL', 'REST'];
        $scope.restUrl = data[0].restUrl;
        $scope.finAppUrl = data[0].finAppUrl;
        $scope.cobrandName = data[0].cobrandName;
        $scope.cobrandPassword = data[0].cobrandPassword;
        $scope.YSLURL = data[0].YSLURL;
        var checkLastCharofRestUrl = $scope.restUrl.slice(-1);
        var checkLastCharoffinAppUrl = $scope.finAppUrl.slice(-1);
        var checkLastCharofYSLUrl = $scope.YSLURL.slice(-1);
        if (checkLastCharofRestUrl != "/") {
            $scope.restUrl = $scope.restUrl + '/';
        }
        if (checkLastCharoffinAppUrl != "/") {
            $scope.finAppUrl = $scope.finAppUrl + '/';
        }
        if (checkLastCharofYSLUrl != "/") {
            $scope.YSLURL = $scope.YSLURL + "/";
        }
        $rootScope.progressBar = false;
        if (data[0].is_itemAccountIdFlow == '1') {
            $scope.is_itemAccoutIdFlow = true;
        } else {
            $scope.is_itemAccoutIdFlow = false;
        };

        if (data[0].is_AccountNumberMatch == '1') {
            $scope.is_ANM = true;
        } else {
            $scope.is_ANM = false;
        }
        $rootScope.activeMenu = 'home';
        $scope.itemAccoutIdFlowType = ['true', 'false'];
        $scope.ANMTypes = ['true', 'false'];

    });

    $scope.editButtonClicked = function() {
        $rootScope.progressBar = true;
        var EditCobrandDetailsParams = {
            CobrandId: $rootScope.CobrandDetails.id,
            BankName: $scope.BankName,
            restUrl: $scope.restUrl,
            cobrandName: $scope.cobrandName,
            cobrandPassword: $scope.cobrandPassword,
            finAppUrl: $scope.finAppUrl,
            is_itemAccountIdFlow: $scope.is_itemAccoutIdFlow,
            is_ANM: $scope.is_ANM,
            Product: $scope.ProductType,
            YSLURL:$scope.YSLURL,
            is_YSL:$scope.envsType
        };

        myService.postRequest(url.webSiteMainUrl + 'UpdateCobrandsDetails.php', EditCobrandDetailsParams).then(function(data) {

            var data = data.data;

            if (data[0].status == 1) {
                $location.path('/home');
                $rootScope.activeMenu = 'home';
            } else {
                alert('Cobrand Edit Failed');
            }
            $rootScope.progressBar = false;
            // console.log('EditCobrandDetails=============================' + angular.toJson(data));
        });
    };

});