var scotchApp = angular.module('FL');
scotchApp.controller('homeController', function($scope, $location, $rootScope, myService, $route, $routeParams,$mdDialog) {
        $('.button-collapse').sideNav();
        $scope.siteLists = Dag;
        $rootScope.navBar = true;
        $scope.userFlowType = 'Success';
        $scope.userType = 'newUser';
        $scope.openStyle = 'newWindow';
        $scope.accountType = 2;
        $scope.UserLocales = ['en_US', 'en_CA', 'fr_CA'];
        $scope.UserLocale = 'en_US';
        $scope.showCobrandList = "pages/showCobrandList.html";
        // $scope.ShowSSOCobrandFields = "pages/ShowSSOCobrandFields.html";
        // $scope.ShowNONSSOCobrandFields = "pages/ShowNONSSOCobrandFields.html";
        // $scope.viewProgressDetails = "pages/viewProgressDetails.html";

        // if (localStorage.getItem('guestLogin') == null) {
        //     $location.path('/login');
        // };

        /*  
            Checking who is login guest or user 
            userEmail declare in GlobalVariables.js file
            userEmail used for create user to launch IAV,FL,PFM
            */
          
        if (localStorage.getItem('is_userLogin') == 'true') {
            if (localStorage.getItem('userEmail') == undefined) {
                // $rootScope.hideInGuestMode is used for hide element which are not show to a guest
                $rootScope.hideInGuestMode = false;
                userEmail = "guest@yodlee.com";
            } else {
                $rootScope.hideInGuestMode = true;
                userEmail = localStorage.getItem('userEmail');
            }

            var FetchDeveloperCobrandListParams = {
                userId: localStorage.getItem('userId')
            };

            myService.postRequest(url.webSiteMainUrl + 'FetchDeveloperCobrandList.php', FetchDeveloperCobrandListParams).then(function(data) {
                var data = data.data;
                $scope.CobrandList = data;
            });

        } else {
            userEmail = "guest@yodlee.com";
            $rootScope.hideInGuestMode = false;
            myService.postRequest(url.webSiteMainUrl + 'FetchCobrandsList.php').then(function(data) {
                var data = data.data;
                $scope.CobrandList = data;

            });
        };

        $scope.chooseMultipleFinapp = "false";
        $scope.chooseMultipleFinappChange = function() {
            if ($scope.chooseMultipleFinapp == "false") {
                $scope.chooseMultipleFinappInputShow = false;
            } else {
                $scope.chooseMultipleFinappInputShow = true;
            }

        };

        // searchBanks Start
        // used to search a bank for whome want to create itemAccoutId in IAV MS
        $scope.searchBanks = function(str, people) {
            var matches = [];
            people.forEach(function(person) {
                var fullName = person.BankName;
                if ((person.BankName.toLowerCase().indexOf(str.toString().toLowerCase()) >= 0) ||
                    (fullName.toLowerCase().indexOf(str.toString().toLowerCase()) >= 0)) {
                    matches.push(person);
                }
            });
            return matches;
        };

        // searchBanks END

        // set active menu in menubar
        $scope.setActive = function(menuItem) {
            $rootScope.activeMenu = menuItem;
        };
        $scope.setActive1 = function(menuItem) {
            $rootScope.activeMenu2 = menuItem;
        }

        // Set First and Last name for IAV MS
        $scope.chooseUserChange = function() {
            $scope.UDFname = $scope.UserSelect.firstName;
            $scope.UDLname = $scope.UserSelect.lastName;
            $scope.UDANumber = $scope.UserSelect.accountNumber;
            SiteData = $scope.UserSelect;
        };
        // Set First and Last name for IAV MS according to FLOW Success flow or failure flow
        $scope.userFlowTypeChange = function() {

            switch ($scope.userFlowType) {
                case "Failure":
                    $scope.UDFname = 'Rahul'
                    $scope.UDLname = 'Yadav';
                    $scope.UDANumber = 9876543212;
                    break;
                default:
                    $scope.UDFname = SiteData.firstName;
                    $scope.UDLname = SiteData.lastName;
                    $scope.UDANumber = SiteData.accountNumber;
                    break;
            }
        };

        // if Developer select login via old user then fetch old username from localhost server
        $scope.userTypeChange = function() {
            console.log($scope.userType);
            switch ($scope.userType) {
                case 'lastusercreated':
                    $scope.lastusercreatedShow = true;
                    var fetchCobrandUserNameSaveParams = {
                        CobrandId: SelectedCobrandDetails.id,
                        status: 'lastUserCreated',
                        product: SelectedCobrandDetails.Product
                    };
                    myService.postRequest(url.webSiteMainUrl + 'fetchCobrandUserNameSave.php', fetchCobrandUserNameSaveParams).then(function(data) {
                        var data = data.data;
                        if (data.length == 0) {
                            alert('No User Found. Please create a user.');
                        };
                        $scope.lastUserCreatedData = data;
                        $scope.lastUserCreatedDataa = data[0].userName;
                    });
                    break;
                default:
                    $scope.lastusercreatedShow = false;
            };
        };

        // Set user details in Matching Details Section in Home Page
        $scope.lastUserCreatedDataChange = function() {
            $scope.UDUsername = $scope.lastUserCreatedDataa.userName;
            $scope.UDPassword = $scope.lastUserCreatedDataa.password;
            $scope.UDitemAccountId = $scope.lastUserCreatedDataa.itemAccountId;
        };


        // Call after click on a cobrand from cobrand list
        $scope.CobrandLogin = function(cobrandname) {

            $('.collapsible').collapsible();
            $rootScope.progressBar = true;

            SelectedCobrandDetails = cobrandname;

            switch (SelectedCobrandDetails.cobrand_Type) {
                case "SSO":
                    $rootScope.progressBar = false;
                    $scope.showSSOField = true;
                    $scope.shownonSSOField = false;
                    // set default finapp id
                    if (SelectedCobrandDetails.Product == "PFM3.0") {
                        $scope.defaultFinappId = "10003700";
                    } else if (SelectedCobrandDetails.Product == "FL") {
                        $scope.defaultFinappId = "10003600";
                    } else if (SelectedCobrandDetails.Product == "IAV") {
                        $scope.defaultFinappId = "10003620";
                    };
                    $scope.defaultSubject = "Arvind";
                    $scope.defaultExtraParams = "callback=https://www.yodlee.com";
                    $scope.samlAttributes = '<YodleeAttributes><Version>2.0</Version><AuthenticationInfo><Status>Authenticated</Status></AuthenticationInfo><ProfileInfo><EMAIL>jane_doe@yodlee.com</EMAIL></ProfileInfo></YodleeAttributes>';
                    break;
                case "nonsso":
                    $scope.showSSOField = false;
                    $scope.shownonSSOField = true;
                    if(SelectedCobrandDetails.is_YSL == "YSL"){
                        YSLnonSSOCobrandLogin();
                    }else{
                        nonSSOCobrandLogin();
                    }
                    break;
                }
                var fetchDagUserParams = {
                    userId:localStorage.getItem('userId')
                }
                myService.postRequest(url.webSiteMainUrl + 'fetchDagUser.php', fetchDagUserParams).then(function(data) {
                    $rootScope.UserSelects = data.data;
                });
        };

        function nonSSOCobrandLogin() {
            
            REST_URL = SelectedCobrandDetails.restUrl;

            // $scope.SingleCobrandList = [cobrandname];
            // Show||Hide itemAccount field from UI if Cobrand is not IAV
            // 1 means true
            switch (SelectedCobrandDetails.is_itemAccountIdFlow) {
                case "1":
                    $scope.GetitemAccountIdStatus1 = true;
                    break;
                default:
                    $scope.GetitemAccountIdStatus1 = false;
                    break;
            }

            var CobrandLoginParams = {
                url: SelectedCobrandDetails.restUrl + url.Cobrand_Login_url,
                cobrandLogin: SelectedCobrandDetails.cobrandName,
                cobrandPassword: SelectedCobrandDetails.cobrandPassword
            };
            myService.postRequestNode(NODE_URL + 'CobrandLogin', CobrandLoginParams).then(function(data) {

                var data = data.data;
                if (data && data.error) {
                    // alert(data.error);
                    alert("Cobrand Login Failed");
                } else {
                    cobrandSessionToken = data.cobrandConversationCredentials.sessionToken;
                    $rootScope.progressBar = false;
                    $scope.CobrandDetailsHeader = true;
                    $scope.cobrandProgressDetails = true;

                    if (SelectedCobrandDetails.Product != "IAV") {
                        $scope.hideInFL = false;
                    } else {
                        if (SelectedCobrandDetails.is_itemAccountIdFlow == "0") {
                            $scope.hideInFL = false;
                            $scope.showMatchingDetails = true;
                        } else {
                            $scope.hideInFL = true;
                        }
                    };

                    $scope.CobrandLoginStatus = "done";
                    $scope.CobrandLoginStatusColor = "green";
                    $scope.LaunchSectionView = true;
                    if (SelectedCobrandDetails.Product == "IAV") {

                    } else {
                        $scope.userType = "lastusercreated";
                        $scope.lastusercreatedShow = true;
                        var fetchCobrandUserNameSaveParams = {
                            CobrandId: SelectedCobrandDetails.id,
                            status: 'lastUserCreated',
                            product: SelectedCobrandDetails.Product
                        };

                        myService.postRequest(url.webSiteMainUrl + 'fetchCobrandUserNameSave.php', fetchCobrandUserNameSaveParams).then(function(data) {

                            var data = data.data;
                            if (data.length == 0) {
                                alert('No User Found. Please create a user.');
                                $scope.userType = "newUser";
                            }
                            $scope.lastUserCreatedData = data;
                            $scope.lastUserCreatedDataa = data[0].userName;
                        });
                    };
                }
            },function(error){
                alert("Node Server Down");
                $rootScope.progressBar = false;
            });

        };

        $scope.SSOCobrandLogin = function() {
            console.log('SSOCobrandLogin Called');
            var ssoParams = {
                'UNIQUE_ISSUER': SelectedCobrandDetails.UNIQUE_ISSUER,
                'USER_GUID': $scope.defaultSubject,
                'CONSUMER_URL': SelectedCobrandDetails.CONSUMER_URL + $scope.defaultFinappId + "?" + $scope.defaultExtraParams,
                'TARGET_URL': SelectedCobrandDetails.TARGET_URL + $scope.defaultFinappId + "?" + $scope.defaultExtraParams,
                'PROXY_URL': SelectedCobrandDetails.PROXY_URL + $scope.defaultFinappId + "?" + $scope.defaultExtraParams,
                'attributeString': $scope.samlAttributes,
                'SAML_VERSION': SelectedCobrandDetails.SAML_VERSION,
                'ASS_ENCRYPT_FLAG': SelectedCobrandDetails.ASS_ENCRYPT_FLAG,
                'MULTI_KEY_FLAG': SelectedCobrandDetails.MULTI_KEY_FLAG,
                'CUSTOM_ENCRYPTION_FLAG': SelectedCobrandDetails.CUSTOM_ENCRYPTION_FLAG,
                'ENCRYPT_FLAG': SelectedCobrandDetails.ENCRYPT_FLAG,
                'ATTRIB_ENCRYPTION_MECHANISM': SelectedCobrandDetails.ATTRIB_ENCRYPTION_MECHANISM,
                'ENCODE_ATTR_FLAG': SelectedCobrandDetails.ENCODE_ATTR_FLAG,
                'SIGN_RES_FLAG': SelectedCobrandDetails.SIGN_RES_FLAG,
                'SIGN_ASSER_FLAG': SelectedCobrandDetails.SIGN_ASSER_FLAG,
                'SIGN_ALIAS_KEY': SelectedCobrandDetails.SIGN_ALIAS_KEY,
                'SSO_ATTRIB_KEY': 'sso_attrib_key_2016',
                'LIT_FLAG': SelectedCobrandDetails.LIT_FLAG,
                'url': 'http://172.18.25.183/opensamldemo/index.jsp'
            };
            myService.postRequestNode(NODE_URL + 'SSOLogin', ssoParams).then(function(data) {
                if(data && data.data && data.data.error){
                    alert('Rest Server Down');
                }else{
                var win = window.open();
                win.document.body.innerHTML = data.data;

                if (window.focus) {
                    win.focus()
                }
                 win.document.body.style.display = "none";
                 win.document.forms[0].submit();
                 $rootScope.progressBar = false;
             }
            }, function(error) {
                alert("Node Server Down");
                $rootScope.progressBar = false;
            });
        };

        function YSLnonSSOCobrandLogin() {

            
            YSL_URL = SelectedCobrandDetails.YSLURL;

            switch (SelectedCobrandDetails.is_itemAccountIdFlow) {
                case "1":
                    $scope.GetitemAccountIdStatus1 = true;
                    break;
                default:
                    $scope.GetitemAccountIdStatus1 = false;
                    break;
            };
            var cobrandLoginParams = {
                'cobrandLogin': SelectedCobrandDetails.cobrandName,
                'cobrandPassword':SelectedCobrandDetails.cobrandPassword,
                'url':SelectedCobrandDetails.YSLURL+YSLUrl.Cobrand_Login_url
            };

            myService.postRequestNode(NODE_URL + 'YSLCobrandLogin', cobrandLoginParams).then(function(data) {

                var data = data.data;
                if (data && data.error) {
                    // alert(data.error);
                    alert("Cobrand Login Failed");
                } else {
                    cobrandSessionToken = data.session.cobSession;
                    $rootScope.progressBar = false;
                    $scope.CobrandDetailsHeader = true;
                    $scope.cobrandProgressDetails = true;

                    if (SelectedCobrandDetails.Product != "IAV") {
                        $scope.hideInFL = false;
                    } else {
                        if (SelectedCobrandDetails.is_itemAccountIdFlow == "0") {
                            $scope.hideInFL = false;
                            $scope.showMatchingDetails = true;
                        } else {
                            $scope.hideInFL = true;
                        }
                    };

                    $scope.CobrandLoginStatus = "done";
                    $scope.CobrandLoginStatusColor = "green";
                    $scope.LaunchSectionView = true;
                    if (SelectedCobrandDetails.Product == "IAV") {

                    } else {
                        $scope.userType = "lastusercreated";
                        $scope.lastusercreatedShow = true;
                        var fetchCobrandUserNameSaveParams = {
                            CobrandId: SelectedCobrandDetails.id,
                            status: 'lastUserCreated',
                            product: SelectedCobrandDetails.Product
                        };

                        myService.postRequest(url.webSiteMainUrl + 'fetchCobrandUserNameSave.php', fetchCobrandUserNameSaveParams).then(function(data) {

                            var data = data.data;
                            if (data.length == 0) {
                                // alert('No User Found. Please create a user.');
                                $scope.userType = "newUser";
                            }
                            $scope.lastUserCreatedData = data;
                            $scope.lastUserCreatedDataa = data[0].userName;
                        });
                    };
                }
            },function(error){
                alert("Server Down");
                $rootScope.progressBar = false;
            });


        };
        // Edit Cobrand button click 
        $scope.fetchDetailsForCobrandEdit = function(cobrandname) {
            $rootScope.CobrandDetails = cobrandname;
            if(cobrandname.cobrand_Type == "SSO"){
                $location.path('/editSSOCobrand')
            }else{
                $location.path('/editCobrand')
            }
        };
        // Delete cobrand
        $scope.DeleteCobrandButtonClicked = function(cobrandname, index) {
            $scope.CobrandList.splice($scope.CobrandList.indexOf(cobrandname), 1);
            var DeleteCobrandDetailsParams = {
                CobrandId: cobrandname.id
            };

            myService.postRequest(url.webSiteMainUrl + 'DeleteCobrand.php', DeleteCobrandDetailsParams).then(function(data) {
                var data = data.data;
                // console.log('DeleteCobrandStatus=============================' + angular.toJson(data));
            });
        };

        $scope.launchButtonClicked = function() {
            $rootScope.progressBar = true;
            console.log("SelectedCobrandDetails============== " + SelectedCobrandDetails);
            if (SelectedCobrandDetails.Product == 'IAV' && SelectedCobrandDetails.is_itemAccountIdFlow != "0") {
                if ($scope.selectedSite == undefined) {
                    alert("Please Select a Bank");
                    return;
                } else if (SiteData == undefined) {
                    alert("Please Select Dag Catelog");
                    return;
                }
            };

            switch ($scope.userFlowType) {
                case 'Success':
                    break;
                case 'Failure':
                    SiteData.firstName = "Rahul";
                    SiteData.lastName = "Yadav";
                    SiteData.accountNumber = 98765432112;
                    break;
            };

            switch ($scope.userType) {
                case 'newUser':
                    newUser();
                    break;
                case 'loginUser':
                    break;
                case 'lastusercreated':
                    lastusercreated();
                    break;
            };
        };
        // start newuser function
        function newUser() {
            var fetchCobrandUserNameSaveParams = {
                CobrandId: SelectedCobrandDetails.id,
                status: 'newUser'
            };

            var updateCobrandUserNameSaveParams = {
                cid: SelectedCobrandDetails.id,
                username: $scope.lastUserCreatedDataa,
                password: 'TEST@123',
                status: 'new'
            };
            myService.postRequest(url.webSiteMainUrl + 'updateCobrandUserNameSave.php', updateCobrandUserNameSaveParams).then(function(data) {
                var data = data.data;
                $rootScope.last_inserted_id = data[0].last_inserted_id;
            });


            if(SelectedCobrandDetails.is_YSL == "YSL"){
                YSL_New_User();
            }else{
                REST_New_User();
            }


        };

        function REST_New_User(){
            
            switch (SelectedCobrandDetails.Product) {
                    case 'IAV':
                        UserRegisterParams = {
                            'url': REST_URL + url.register_User_url,
                            'userProfile.lastName': SiteData.lastName,
                            'userProfile.firstName': SiteData.firstName,
                            'userProfile.emailAddress': userEmail,
                            'userCredentials.objectInstanceType': 'com.yodlee.ext.login.PasswordCredentials',
                            'userCredentials.password': 'TEST@123',
                            'userCredentials.loginName': $scope.lastUserCreatedDataa,
                            'cobSessionToken': cobrandSessionToken,
                            'userPreferences[0]': 'COM.YODLEE.USER.LOCALE~' + $scope.UserLocale
                        };
                        break;
                    default:
                        UserRegisterParams = {
                            'url': REST_URL + url.register_User_url,
                            'userProfile.emailAddress': userEmail,
                            'userCredentials.objectInstanceType': 'com.yodlee.ext.login.PasswordCredentials',
                            'userCredentials.password': 'TEST@123',
                            'userCredentials.loginName': $scope.lastUserCreatedDataa,
                            'cobSessionToken': cobrandSessionToken,
                            'userPreferences[0]': 'COM.YODLEE.USER.LOCALE~' + $scope.UserLocale
                        };
                        break;
                };

                myService.postRequestNode(NODE_URL + 'RegisterUser', UserRegisterParams).then(function(data) {

                    var data = data.data;
                    if (data.message) {
                        $scope.UserLoginStatus = "not_interested";
                        $scope.UserLoginStatusColor = "red";
                        alert('User Already Exist');
                        $rootScope.progressBar = false;
                        return;
                    }
                    userSessionToken = data.userContext.conversationCredentials.sessionToken;
                    $scope.UserLoginStatus = "done";
                    $scope.UserLoginStatusColor = "green";
                    getToken('newUser');
                },function(error){
                    $rootScope.progressBar = true;
                });
            

        };
        function YSL_New_User(){

            switch (SelectedCobrandDetails.Product) {
                case "IAV":
                    var UserRegisterParams = {
                    'url': YSL_URL + YSLUrl.register_User_url,
                    'email': userEmail,
                    'password': 'TEST@123',
                    'loginName': $scope.lastUserCreatedDataa,
                    'cobSessionToken': cobrandSessionToken,
                    'fname':SiteData.firstName,
                    'lname':SiteData.lastName
                };
                break;
                default:

                    var UserRegisterParams = {
                    'url': YSL_URL + YSLUrl.register_User_url,
                    'email': userEmail,
                    'password': 'TEST@123',
                    'loginName': $scope.lastUserCreatedDataa,
                    'cobSessionToken': cobrandSessionToken,
                    'fname':'Arvind',
                    'lname':'Tiwari'
                };
                break;
                    
            };
                 
                myService.postRequestNode(NODE_URL + 'YSLUserRegister', UserRegisterParams).then(function(data) {
                    var data = data.data;
                    if (data.errorMessage) {
                        $scope.UserLoginStatus = "not_interested";
                        $scope.UserLoginStatusColor = "red";
                        alert('User Already Exist');
                        $rootScope.progressBar = false;
                        return;
                    }
                    userSessionToken = data.user.session.userSession;
                    $scope.UserLoginStatus = "done";
                    $scope.UserLoginStatusColor = "green";
                    getToken('newUser');

                },function(error){
                    $rootScope.progressBar = false;
                });
        };

        // End newUser function 

        // lastusercreated functin start

        function lastusercreated() {
            if(SelectedCobrandDetails.is_YSL == "YSL"){
                    YSL_User_Login();
                }else{
                    REST_User_Login();
                };
           
        };
        function REST_User_Login(){
             var UserLoginParams = {
                url: REST_URL + url.User_Login_url,
                cobSessionToken: cobrandSessionToken,
                login: $scope.lastUserCreatedDataa,
                password: 'TEST@123'
            };
            myService.postRequestNode(NODE_URL + 'LoginUser', UserLoginParams).then(function(data) {

                var data = data.data;
                if (data.Error && data.Error[0] && data.Error[0].errorDetail) {
                    alert(data.Error[0].errorDetail);
                    $scope.UserLoginStatus = "not_interested";
                    $scope.UserLoginStatusColor = "red";
                    $rootScope.progressBar = false;
                } else {
                    userSessionToken = data.userContext.conversationCredentials.sessionToken;
                    $scope.UserLoginStatus = "done";
                    $scope.UserLoginStatusColor = "green";
                    getToken('loginUser');
                }
            },function(error){
                $rootScope.progressBar = false;
                alert('Node Server Down');
            });
        };
        function YSL_User_Login(){
            var UserLoginParams = {
                url: YSL_URL + YSLUrl.User_Login_url,
                cobSessionToken: cobrandSessionToken,
                loginName: $scope.lastUserCreatedDataa,
                password: 'TEST@123'
                // password: '$scope.lastUserCreatedDataa.password'
            };
            myService.postRequestNode(NODE_URL + 'YSLUserlogin', UserLoginParams).then(function(data) {

                var data = data.data;
                if (data && data.errorMessage) {
                    alert(data.errorMessage);
                    $scope.UserLoginStatus = "not_interested";
                    $scope.UserLoginStatusColor = "red";
                    $rootScope.progressBar = false;
                } else {
                    userSessionToken = data.user.session.userSession;
                    $scope.UserLoginStatus = "done";
                    $scope.UserLoginStatusColor = "green";
                    getToken('loginUser');
                }
            },function(error){
                $rootScope.progressBar = false;
                alert('Node Server Down');
            });
        }
        // end lastusercreated function
        //* * * * * * * * * * * * * * * * * * * * * * * * Get Token * * * * * * * * * * * * * * * * * * * * * * * * 
        // get token function start
        function getToken(status) {

            switch (SelectedCobrandDetails.Product) {
                case "IAV":
                    finAppid = 10003620;
                    break;
                    swich(SelectedCobrandDetails.Product)
                case "FL":
                    finAppid = 10003600;
                    break;
                default:
                    finAppid = 10003700;
            };

            if ($scope.chooseMultipleFinappInput == '' || $scope.chooseMultipleFinappInput == ' ' || $scope.chooseMultipleFinappInput == undefined) {

            } else {
                finAppid = $scope.chooseMultipleFinappInput;
            }
            if(SelectedCobrandDetails.is_YSL == "YSL"){
                    YSL_GET_TOKEN();
                }else{
                    REST_GET_TOKEN(status);
                }
            
            
        };
        // get token function End

        function REST_GET_TOKEN(status){
            // alert('YSL_GET_TOKEN');
            var GetTokenParam = {
                url: REST_URL + url.Get_Token_url,
                cobSessionToken: cobrandSessionToken,
                rsession: userSessionToken,
                finAppId: finAppid
            };
            // get token service start 
            myService.postRequestNode(NODE_URL + 'getToken', GetTokenParam).then(function(data) {
                var data = data.data;
                console.log(finAppid);
                if ($scope.chooseMultipleFinappInput == '' || $scope.chooseMultipleFinappInput == ' ' || $scope.chooseMultipleFinappInput == undefined) {} else {
                    var finAppid1 = finAppid.split(',');
                    finAppid = finAppid1[0];
                    console.log(finAppid);
                }
                // error check if start
                if (data.Error && data.Error[0] && data.Error[0].errorDetail) {
                    alert(data.Error[0].errorDetail);
                    $scope.GetTokenStatus = "not_interested";
                    $scope.GetTokenStatusColor = "red";
                    $rootScope.progressBar = false;
                    return;
                } else {
                    Token = data.finappAuthenticationInfos[0].token;
                    $scope.GetTokenStatus = "done";
                    $scope.GetTokenStatusColor = "green";
                    // Switch newUser Start
                    switch (status) {
                        case 'newUser':
                            if (SelectedCobrandDetails.Product == 'IAV') {
                                if (SelectedCobrandDetails.is_itemAccountIdFlow == "0") {
                                    $scope.GetitemAccountIdStatus = "done";
                                    $scope.GetitemAccountIdStatusColor = "green";
                                    $scope.launchFastlinkStatusColor = "green";
                                    $scope.launchFastlinkStatus = "done";
                                    lauchIAVWithOutItemAccountId($scope.openStyle);
                                } else {
                                    getItemAccountId();
                                }
                            } else {
                                launchFL($scope.openStyle);
                            }
                            break;

                        default:

                            if (SelectedCobrandDetails.Product == 'IAV') {
                                lauchIAVForLoginUser($scope.openStyle);
                            } else {
                                launchFL($scope.openStyle);
                            }
                            break;
                    };
                    // Switch newUser End
                };
                // error check if END
            },function(error){
                $rootScope.progressBar = false;
            });
            // get token service end 
        };

        function YSL_GET_TOKEN(status){
            // alert('YSL_GET_TOKEN');
            var GetTokenParam = {
                url: YSL_URL + YSLUrl.Get_Token_url,
                cobSessionToken: cobrandSessionToken,
                userSessionToken: userSessionToken,
                finAppId: finAppid
            };
            // get token service start 
            myService.postRequestNode(NODE_URL + 'YSLGetToken', GetTokenParam).then(function(data) {
                var data = data.data

                if ($scope.chooseMultipleFinappInput == '' || $scope.chooseMultipleFinappInput == ' ' || $scope.chooseMultipleFinappInput == undefined) {} else {
                    var finAppid1 = finAppid.split(',');
                    finAppid = finAppid1[0];
                    console.log(finAppid);
                }
                // error check if start
                if (data.Error && data.Error[0] && data.Error[0].errorDetail) {
                    alert(data.Error[0].errorDetail);
                    $scope.GetTokenStatus = "not_interested";
                    $scope.GetTokenStatusColor = "red";
                    $rootScope.progressBar = false;
                    return;
                } else {
                    Token = data.user.accessTokens[0].value;
                    $scope.GetTokenStatus = "done";
                    $scope.GetTokenStatusColor = "green";
                    // Switch newUser Start
                    switch (status) {
                        case 'newUser':
                            if (SelectedCobrandDetails.Product == 'IAV') {

                                if (SelectedCobrandDetails.is_itemAccountIdFlow == "0") {
                                    $scope.GetitemAccountIdStatus = "done";
                                    $scope.GetitemAccountIdStatusColor = "green";
                                    $scope.launchFastlinkStatusColor = "green";
                                    $scope.launchFastlinkStatus = "done";
                                    lauchIAVWithOutItemAccountId($scope.openStyle);

                                } else {
                                    getItemAccountId();

                                }

                            } else {
                                launchFL($scope.openStyle);
                            }
                            break;

                        default:

                            if (SelectedCobrandDetails.Product == 'IAV') {
                                lauchIAVForLoginUser($scope.openStyle);
                            } else {
                                launchFL($scope.openStyle);
                            }
                            break;
                    };
                    // Switch newUser End
                };
                // error check if END
            },function(error){
                $rootScope.progressBar = false;
            });
            // get token service end 
        };

        //* * * * * * * * * * * * * * * * * * * * * * * * Get itemAccountId * * * * * * * * * * * * * * * * * * * *

        function getItemAccountId() {

            var GetItemAccountIdParam = {
                url: REST_URL + url.get_ItemAccount_Id_url,
                'cobSessionToken': cobrandSessionToken,
                'userSessionToken': userSessionToken,
                'transferAccount.objectInstanceType': 'com.yodlee.core.fundstransfer.transferaccountmanagement.BankTransferAccount',
                'transferAccount.bankName': $scope.selectedSite.description.BankName,
                'transferAccount.contentServiceId': $scope.selectedSite.description.Details.contentServiceId,
                'transferAccount.transferAccountType': $scope.accountType,
                'transferAccount.transferAccountCategoryId': 1,
                'transferAccount.transferAccountPrivilege.acctPrivilegeId': 2,
                'transferAccount.additionalAttribute': true,
                'transferAccount.dfiAccount.accountNumber': SiteData.accountNumber,
                'transferAccount.dfiAccount.routingNumber': $scope.selectedSite.description.Details.routingNumber,
                'transferAccount.dfiAccount.isVerified': false,
                'transferAccount.dfiAccount.additionalAttribute': true,
                'userToken': Token,
                'transferAccount.nickname': $scope.selectedSite.description.BankName
            };
            myService.postRequestNode(NODE_URL + 'addTransferAccount', GetItemAccountIdParam).then(function(data) {

                var data = data.data;
                if (data.errorOccurred && data.exceptionType) {
                    alert(data.message);
                    $scope.GetitemAccountIdStatus = "not_interested";
                    $scope.GetitemAccountIdStatusColor = "red";
                    $rootScope.progressBar = false;
                    return;
                } else {
                    itemAccountId = data.itemAccountId;
                    $scope.UDitemAccountId = itemAccountId;
                    $rootScope.dfiAccountId = data.dfiAccount.dfiAccountId;
                    $scope.GetitemAccountIdStatusColor = "green";
                    $scope.GetitemAccountIdStatus = "done";
                    $rootScope.progressBar = false;
                    if ($scope.openStyle == "popup") {
                        var newWindow = window.open("", " ", "width=1000,height=800");
                        if(!newWindow || newWindow.closed || typeof newWindow.closed=='undefined') 
                        { 
                            alert('Please disable popup blocking.');
                        }
                        newWindow.document.write('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN"><HTML><HEAD><script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js"></script></HEAD><BODY><form action="' + SelectedCobrandDetails.finAppUrl + '" method="post">User Session: <input type="text" name="rsession" size="150" value="' + userSessionToken + '"><br><br> User Token:<input type="text" name="token" size="150" value="' + Token + '"><input type="text" name="extraParams" value="&callback=http://developer.yodlee.com&itemAccountId=' + itemAccountId + '"><br><br> App ID:<input type="text" name="app" value="' + finAppid + '"><br><br> Request Redirect:<input type="text" name="redirectReq" value="true"><br><br><input type="submit" value="Submit"></form><script type="text/javascript">window.document.forms[0].submit();</script></body></html>');
                    } else {
                        var newWindow = window.open();
                        if(!newWindow || newWindow.closed || typeof newWindow.closed=='undefined') 
                        { 
                            alert('Please disable popup blocking.');
                        }
                        newWindow.document.write('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN"><HTML><HEAD><script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js"></script></HEAD><BODY><form action="' + SelectedCobrandDetails.finAppUrl + '" method="post">User Session: <input type="text" name="rsession" size="150" value="' + userSessionToken + '"><br><br> User Token:<input type="text" name="token" size="150" value="' + Token + '"><input type="text" name="extraParams" value="&callback=http://developer.yodlee.com&itemAccountId=' + itemAccountId + '"><br><br> App ID:<input type="text" name="app" value="' + finAppid + '"><br><br> Request Redirect:<input type="text" name="redirectReq" value="true"><br><br><input type="submit" value="Submit"></form><script type="text/javascript">window.document.forms[0].submit();</script></body></html>');
                    }
                    $scope.launchFastlinkStatus = "done";
                    $scope.launchFastlinkStatusColor = "green";

                    var updateCobrandUserNameSaveParams = {
                        cid: SelectedCobrandDetails.id,
                        itemAccountId: itemAccountId,
                        last_inserted_id1: $rootScope.last_inserted_id,
                        dfiAccountId: $rootScope.dfiAccountId,
                        status: 'updateItemAccountId'
                    };
                    myService.postRequest(url.webSiteMainUrl + 'updateCobrandUserNameSave.php', updateCobrandUserNameSaveParams).then(function(data) {
                        var data = data.data;
                    },function(error){
                        $rootScope.progressBar = false;
                    });
                }
            },function(error){
                $rootScope.progressBar = false;
            });
        };

        $scope.getAccountSuccessData = function() {

            var FetchDfiAccountIdParams = {
                'userName': $scope.UDUsername,
                'cid': SelectedCobrandDetails.id
            }

            myService.postRequest(url.webSiteMainUrl + 'FetchDfiAccountId.php', FetchDfiAccountIdParams).then(function(data) {

                var data = data.data;

                var GetAccountSuccessDataParam = {
                    url: REST_URL + url.get_Account_Success_Data_url,
                    'cobSessionToken': cobrandSessionToken,
                    'userSessionToken': userSessionToken,
                    'verifiableAccount.verifiableAccountStatus.verifiableAccountStatus': 2,
                    'verifiableAccount.verifiableAccountId': data[0].dfiAccountId,
                    'verifiableAccount.verifiableTargetAccount.targetAccountId': data[0].dfiAccountId,
                    'verifiableAccount.verifiableTargetAccount.targetAccountCategory.verifiableAccountCategory': 2
                };
                myService.postRequestNode(NODE_URL + 'get_Account_Success_Data', GetAccountSuccessDataParam).then(function(data) {
                    var data = data.data;
                    $scope.accountVerificationData = JSON.stringify(data, undefined, 10);
                });

            });
        };

        function lauchIAVWithOutItemAccountId(status) {
            $rootScope.progressBar = false;
            switch (status) {
                case "popup":
                    setTimeout(function() {
                        var newWindow = window.open("", " ", "width=1000,height=800");
                        if(!newWindow || newWindow.closed || typeof newWindow.closed=='undefined') 
                        { 
                            alert('Please disable popup blocking.');
                        }
                        newWindow.document.write('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN"><HTML><HEAD><script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js"></script></HEAD><BODY><form action="' + SelectedCobrandDetails.finAppUrl + '" method="post">User Session: <input type="text" name="rsession" size="150" value="' + userSessionToken + '"><br><br> User Token:<input type="text" name="token" size="150" value="' + Token + '"><input type="text" name="extraParams" value="callback=http://developer.yodlee.com"><br><br> App ID:<input type="text" name="app" value="' + finAppid + '"><br><br> Request Redirect:<input type="text" name="redirectReq" value="true"><br><br><input type="submit" value="Submit"></form><script type="text/javascript">window.document.forms[0].submit();</script></body></html>');
                    }, 500);
                    break;
                default:
                    setTimeout(function() {
                        var newWindow = window.open();
                        if(!newWindow || newWindow.closed || typeof newWindow.closed=='undefined') 
                        { 
                            alert('Please disable popup blocking.');
                        }
                        newWindow.document.write('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN"><HTML><HEAD><script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js"></script></HEAD><BODY><form action="' + SelectedCobrandDetails.finAppUrl + '" method="post">User Session: <input type="text" name="rsession" size="150" value="' + userSessionToken + '"><br><br> User Token:<input type="text" name="token" size="150" value="' + Token + '"><input type="text" name="extraParams" value="callback=http://developer.yodlee.com"><br><br> App ID:<input type="text" name="app" value="' + finAppid + '"><br><br> Request Redirect:<input type="text" name="redirectReq" value="true"><br><br><input type="submit" value="Submit"></form><script type="text/javascript">window.document.forms[0].submit();</script></body></html>');
                    }, 500);
                    break;
            };
        };

        function lauchIAVForLoginUser(status) {
            var getItemAccountId = {
                'username':$scope.lastUserCreatedDataa
            }
            myService.postRequest(url.webSiteMainUrl + 'getItemAccountIdLogin.php', getItemAccountId).then(function(data) {
                    var data = data.data;
                    itemAccountId = data[0].itemAccountId;
                });
            $rootScope.progressBar = false;
            switch (status) {
                case "popup":
                    setTimeout(function() {
                        var newWindow = window.open("", " ", "width=1000,height=800");
                        if(!newWindow || newWindow.closed || typeof newWindow.closed=='undefined') 
                        { 
                            alert('Please disable popup blocking.');
                        }
                        newWindow.document.write('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN"><HTML><HEAD><script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js"></script></HEAD><BODY><form action="' + SelectedCobrandDetails.finAppUrl + '" method="post">User Session: <input type="text" name="rsession" size="150" value="' + userSessionToken + '"><br><br> User Token:<input type="text" name="token" size="150" value="' + Token + '"><input type="text" name="extraParams" value="&callback=http://developer.yodlee.com&itemAccountId=' + itemAccountId + '"><br><br> App ID:<input type="text" name="app" value="' + finAppid + '"><br><br> Request Redirect:<input type="text" name="redirectReq" value="true"><br><br><input type="submit" value="Submit"></form><script type="text/javascript">window.document.forms[0].submit();</script></body></html>');
                    }, 500);
                    break;
                default:
                    setTimeout(function() {
                        var newWindow = window.open();
                        if(!newWindow || newWindow.closed || typeof newWindow.closed=='undefined') 
                        { 
                            alert('Please disable popup blocking.');
                        }
                        newWindow.document.write('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN"><HTML><HEAD><script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js"></script></HEAD><BODY><form action="' + SelectedCobrandDetails.finAppUrl + '" method="post">User Session: <input type="text" name="rsession" size="150" value="' + userSessionToken + '"><br><br> User Token:<input type="text" name="token" size="150" value="' + Token + '"><input type="text" name="extraParams" value="&callback=http://developer.yodlee.com&itemAccountId=' + itemAccountId + '"><br><br> App ID:<input type="text" name="app" value="' + finAppid + '"><br><br> Request Redirect:<input type="text" name="redirectReq" value="true"><br><br><input type="submit" value="Submit"></form><script type="text/javascript">window.document.forms[0].submit();</script></body></html>');
                    }, 500);
                    break;
            }

        };

        function launchFL(status) {
            $rootScope.progressBar = false;
            switch (status) {
                case "popup":
                    setTimeout(function() {
                        var newWindow = window.open("", " ", "width=1000,height=800");
                        if(!newWindow || newWindow.closed || typeof newWindow.closed=='undefined') 
                        { 
                            alert('Please disable popup blocking.');
                        }
                        newWindow.document.write('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN"><HTML><HEAD><script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js"></script></HEAD><BODY><form action="' + SelectedCobrandDetails.finAppUrl + '" method="post">User Session: <input type="text" name="rsession" size="150" value="' + userSessionToken + '"><br><br> User Token:<input type="text" name="token" size="150" value="' + Token + '"><input type="text" name="extraParams" value="&callback=http://developer.yodlee.com"><br><br> App ID:<input type="text" name="app" value="' + finAppid + '"><br><br> Request Redirect:<input type="text" name="redirectReq" value="true"><br><br><input type="submit" value="Submit"></form><script type="text/javascript">window.document.forms[0].submit();</script></body></html>');
                        // newWindow.document.write('');
                    }, 500);
                    break;
                default:
                console.log("finAppUrl=="+SelectedCobrandDetails.finAppUrl);
                console.log("userSessionToken==="+userSessionToken);
                console.log("Token===="+Token);
                console.log("finAppid====="+finAppid);
                    setTimeout(function() {
                        var newWindow = window.open();
                        if(!newWindow || newWindow.closed || typeof newWindow.closed=='undefined') 
                        { 
                            alert('Please disable popup blocking.');
                        }
                        newWindow.document.write('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN"><HTML><HEAD><script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js"></script></HEAD><BODY><form action="' + SelectedCobrandDetails.finAppUrl + '" method="post">User Session: <input type="text" name="rsession" size="150" value="' + userSessionToken + '"><br><br> User Token:<input type="text" name="token" size="150" value="' + Token + '"><input type="text" name="extraParams" value="&callback=http://developer.yodlee.com"><br><br> App ID:<input type="text" name="app" value="' + finAppid + '"><br><br> Request Redirect:<input type="text" name="redirectReq" value="true"><br><br><input type="submit" value="Submit"></form><script type="text/javascript">window.document.forms[0].submit();</script></body></html>');
                    }, 500);
                    break;
            }
        };

          $scope.showAdvanced = function(ev) {
                $mdDialog.show({
                  template: `<div class="AddCatelogPopup"><div class="AddCatelogHeader">Please enter your custom dag catelog information.</div>
                  <div class="content">
                  Name:<input type="text" id="addCatelogName"><br>
                  First Name: <input type="text" id="addCatelogFName"><br>
                  Last Name: <input type="text" id="addCatelogLName"><br>
                  Account Number: <input type="text" id="addCatelogAccountNumber"><br>
                  <div class="button addutton" onclick="addCatelog()">Add</div>
                  </div>
                  </div>`,
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  clickOutsideToClose:true,
                  fullscreen: false
              })
                .then(function(answer) {

                }, function() {

                });
            };

    })











    .controller('projectsController', function($scope) {

    })

    .controller('contactController', function($scope) {

    })
// .filter('prettify', function() {

//     function syntaxHighlight(json) {
//         json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
//         return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
//             var cls = 'number';
//             if (/^"/.test(match)) {
//                 if (/:$/.test(match)) {
//                     cls = 'key';
//                 } else {
//                     cls = 'string';
//                 }
//             } else if (/true|false/.test(match)) {
//                 cls = 'boolean';
//             } else if (/null/.test(match)) {
//                 cls = 'null';
//             }
//             return '<span class="' + cls + '">' + match + '</span>';
//         });
//     }

//     return syntaxHighlight;
// })
function addCatelog(){  
    var name = document.getElementById('addCatelogName').value;
    var fname = document.getElementById('addCatelogFName').value;
    var lname = document.getElementById('addCatelogLName').value;
    var accumber = document.getElementById('addCatelogAccountNumber').value;
    var uid = localStorage.getItem('userId');
    $.ajax({
      type: "POST",
      url: url.webSiteMainUrl+'addCatelog.php',
      contentType:'application/x-www-form-urlencoded',
      dataType:'json',
      data: {'addCatelogName':name,'addCatelogFName':fname,'addCatelogLName':lname,'addCatelogAccountNumber':accumber,'uid':uid},
      success: function(data){
        if (data[0].status == 0) {
            alert('Fail');
        }else{
            alert('Done');
        }
      }
  });
};