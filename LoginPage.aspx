<%@ Page Language="VB" AutoEventWireup="false" CodeFile="LoginPage.aspx.vb" Inherits="LoginPage" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>OnlineExam System</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css" />
    <link rel="stylesheet" type="text/css" href="css/Login.css" />
    <link rel="stylesheet" type="text/css" href="font-awesome-4.7.0/css/font-awesome.min.css" />
    <link rel="stylesheet" type="text/css" href="css/jquery-confirm.min.css"/>
</head>
<body>
    <div class="container">
        <div class="row my-sm-5">
            <div class="col-sm-3">
            </div>
            <div class="col-sm-6 login">
                <div class="container-fluid">
                    <div class="row my-sm-5">
                        <div class="col-sm-4">
                        </div>
                        <div class="col-sm-3">
                            <img src="css/Images/logo_v.png" />
                        </div>
                    </div>
                </div>
                <div class="container">
                    <form>
                        <div class="row form-group">
                            <div class="col-sm-12 input-group">
                                <span class="input-group-addon"><i class="fa fa-user-circle" aria-hidden="true"></i></span>
                                <input class="form-control" id="txt_uname" type="text" placeholder="Username" />
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-sm-12 input-group">
                                <span class="input-group-addon"><i class="fa fa-key" aria-hidden="true"></i></span>
                                <input class="form-control" id="txt_pass" type="password" placeholder="Password" />
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-sm-12">
                                <button id="btn_login" type="button" class="btn btn-primary btn-lg btn-block">Login</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <script src="js/jquery-3.2.1.min.js"></script>
    <script src="js/popper.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/jquery-confirm.min.js"></script>
    <script src="js/js.cookie.js"></script>
    <script src="js/LoginPage.js"></script>
</body>
</html>
