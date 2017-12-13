<%@ Page Language="VB" AutoEventWireup="false" CodeFile="StudentLogin.aspx.vb" Inherits="StudentLogin" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>OnlineExam System</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css" />
    <link rel="stylesheet" type="text/css" href="css/StyleSheet.css" />
    <link rel="stylesheet" type="text/css" href="font-awesome-4.7.0/css/font-awesome.min.css" />
    <link rel="stylesheet" type="text/css" href="css/jquery-confirm.min.css" />
    <%--<link rel="shortcut icon" href="data:image/x-icon;," type="image/x-icon" />--%>
    <link rel="stylesheet" type="text/css" href="css/Login.css" />
</head>
<body class="student">
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
                    <div class="row form-group">
                        <div class="col-sm-12 input-group">
                            <span class="input-group-addon"><i class="fa fa-user-circle" aria-hidden="true"></i></span>
                            <input class="form-control" id="txt_uname" type="text" placeholder="รหัสประจำตัวนักเรียน" />
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-sm-12 input-group">
                            <span class="input-group-addon"><i class="fa fa-key" aria-hidden="true"></i></span>
                            <input class="form-control" id="txt_pass" type="password" placeholder="รหัสผ่าน" />
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-sm-12">
                            <button id="btn_login" type="button" class="btn btn-primary btn-lg btn-block">เข้าสู่ระบบ</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="modal_warning" class="modal fade">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">ข้อควรระวัง</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col">
                                <ul class="list-group">
                                    <li class="list-group-item list-group-item-info">
                                        ข้อ 1. กดปุ่ม "ส่งข้อสอบ" เมื่อต้องการจะส่งข้อสอบเท่านั้น!
                                    </li>
                                    <li class="list-group-item list-group-item-info">
                                        ข้อ 2. ระวังอย่าปิดหน้าต่างโปรแกรมห้องสอบ Online!
                                    </li>
                                    <li class="list-group-item list-group-item-info">
                                        ข้อ 3. เมื่อทำข้อสอบเสร็จ กดปุ่ม "ส่งข้อสอบ" แล้วสามารถเดินออกจากห้องสอบได้เลย!
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal">ทราบ</button>
                </div>
            </div>
        </div>
    </div>
    <%--JavaScript--%>
    <script src="js/jquery-3.2.1.min.js"></script>
    <script src="js/popper.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/jquery-confirm.min.js"></script>
    <script src="js/js.cookie.js"></script>
    <script src="js/paging.js"></script>
    <script src="fullcalendar-3.6.2/lib/moment.min.js"></script>
    <script src="js/jquery.userTimeout.min.js"></script>
    <script src="js/StudentLogin.js"></script>
</body>
</html>
