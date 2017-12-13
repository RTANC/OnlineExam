<%@ Page Language="VB" AutoEventWireup="false" CodeFile="ChangePasswd.aspx.vb" Inherits="ChangePasswd" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>OnlineExam</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css" />
    <link rel="stylesheet" type="text/css" href="css/jquery-confirm.min.css"/>
    <link rel="stylesheet" type="text/css" href="font-awesome-4.7.0/css/font-awesome.min.css"/>
    <link rel="stylesheet" type="text/css" href="css/ChangePasswd.css" />
</head>
<body>
    <div class="container my-5">
        <div class="row">
            <div class="col-3">
            </div>
            <div class="col-6 card">
                <div class="card-body">
                    <div class="card-title alert alert-info">
                        <h5 class="card-text font-weight-bold font-italic">นโยบายความปลอดภัย</h5>
                        <p class="card-text">เนื่องจากเป็นการเข้าใช้งานระบบครั้งแรก ท่านจำเป็นต้องกำหนดรหัสผ่านใหม่!</p>
                        <h6 class="card-text font-weight-bold">คำแนะนำ:</h6>
                        <h6>รหัสผ่านต้องเป็นตัวอักษรภาษาอังกฤษเท่านั้น!</h6>
                        <h6>รหัสผ่านควรมีความยาว 8-16 ตัวอักษร</h6>
                        <input id="txt_passwd1" class="form-control is-valid is-invalid my-3" placeholder="รหัสผ่านใหม่" type="password" />
                        <input id="txt_passwd2" class="form-control is-valid is-invalid my-3" placeholder="ยืนยัน รหัสผ่านใหม่" type="password"/>
                        <h6 id="txt_msg" class="text-danger text-hide my-3">รหัสผ่านไม่ตรงกัน!</h6>
                        <button id="btn_submit" class="btn btn-block btn-primary text-center disabled" type="button" disabled="disabled">ยืนยัน</button>                     
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="js/jquery-3.2.1.min.js"></script>
    <script src="js/popper.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/jquery-confirm.min.js"></script>
    <script src="js/js.cookie.js"></script>
    <script src="js/jquery.userTimeout.min.js"></script>
    <script src="js/CheckSessionExpire.js"></script>
    <script src="js/ChangePasswd.js"></script>
</body>
</html>
