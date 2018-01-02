var url = {

    'Cobrand_Login_url': 'v1.0/authenticate/coblogin/',

    'User_Login_url': 'v1.0/authenticate/login',

    'Get_Token_url': 'v1.0/authenticator/token/',

    'register_User_url': 'v1.0/jsonsdk/UserRegistration/register3/',

    'get_ItemAccount_Id_url': 'v1.0/jsonsdk/TransferAccountManagement/addTransferAccount',

    'get_Account_Success_Data_url': 'v1.0/jsonsdk/InstantAccountVerificationService/getMatchingAccountVerificationData',
    // 'webSiteMainUrl': 'http://customerbilling.esy.es/Cobrands/Fastlink_launch/CobrandsWebServices/'
    'webSiteMainUrl': 'http://192.168.57.181/FL2.2/WebServices/'
    // 'webSiteMainUrl': 'http://localhost/FL2.2/WebServices/'

};

var YSLUrl = {
    'Cobrand_Login_url': 'v1/cobrand/login/',

    'User_Login_url': 'v1/user/login',

    'Get_Token_url': 'v1/user/accessTokens',

    'register_User_url': 'v1/user/register',

    'get_ItemAccount_Id_url': 'v1.0/jsonsdk/TransferAccountManagement/addTransferAccount',

    'webSiteMainUrl': 'http://192.168.57.181/FL2.2/WebServices/',
    // 'webSiteMainUrl': 'http://localhost/FL2.2/WebServices/',

    'eventConfig': 'v1/cobrand/config/notifications/events/',

    'dataExtractsUrl': 'v1/dataExtracts/events?'
};

// var NODE_URL = 'http://192.168.57.181:3006/';
var NODE_URL = 'http://localhost:3006/';
// var BASE_URL = 'http://192.168.57.181:3005/';
var REST_URL;
var finAppUrl;
var userSessionToken;
var cobrandSessionToken;
var Token;
var SelectedCobrandDetails;
var finAppid;
var itemAccountId;
var userRegisterLoginName;
var flowString;
var editCobrandId;
var SiteData;
var UserRegisterParams;
var userFlowType;
var userTypee;
var userEmail;