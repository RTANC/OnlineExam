<%@ Page Language="VB" AutoEventWireup="false" CodeFile="RegisterPage.aspx.vb" Inherits="RegisterPage" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Register</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css" />
    <link rel="stylesheet" type="text/css" href="css/RegisterPage.css" />
    <link rel="stylesheet" type="text/css" href="font-awesome-4.7.0/css/font-awesome.min.css" />
    <link rel="stylesheet" type="text/css" href="css/jquery-confirm.min.css"/>
</head>
<body>
    <form action="RegisterPage.aspx" method="post" enctype="multipart/form-data">
        <div class="container register-form pb-5">
            <div class="row mt-4">
                <div class="col-12 topic py-3">
                    <h1 class="d-inline">ลงทะเบียน</h1>
                </div>
            </div>
            <div class="row my-4">
                <label class="col-2 col-form-label text-right">Username</label>
                <input class="form-control col-3 is-valid is-invalid" name="username" type="text" />
                <label id="valmsg" class="col col-form-label text-danger text-hide">Username นี้มีอยู่ในระบบแล้วไม่สามารถใช้ได้!</label>
            </div>
            <div class="row my-4">
                <label class="col-2 col-form-label text-right">Password</label>
                <input class="form-control col-3 is-valid is-invalid" name="pass" type="password" />
                <label class="col col-form-label text-muted">ต้องมีความยาวไม่ต่ำกว่า 6 ตัวอักษร</label>
            </div>
            <div class="row my-4">
                <label class="col-2 col-form-label text-right">ยศ</label>
                <select id="select_rank" name="rank" class="custom-select w-100 col-2">
                    
                </select>
            </div>
            <div class="row my-4">
                <label class="col-2 col-form-label text-right">ชื่อ</label>
                <input class="form-control col-4 is-valid is-invalid" name="fname" type="text" />
            </div>
            <div class="row my-4">
                <label class="col-2 col-form-label text-right">นามสกุล</label>
                <input class="form-control col-4 is-valid is-invalid" name="lname" type="text" />
            </div>
            <div class="row my-4">
                <label class="col-2 col-form-label text-right">เพศ</label>              
                <label class="col-1 col-form-label text-right align-middle" for="rb1"><input name="gender" class="align-middle" id="rb1" type="radio" value="1" />&nbsp;&nbsp;&nbsp;ชาย</label>
                <label class="col-2 col-form-label text-right align-middle"><input name="gender" class="align-middle" type="radio" value="0" checked="checked" />&nbsp;&nbsp;&nbsp;หญิง</label>
            </div>
            <div class="row my-4">
                <label class="col-2 col-form-label text-right">สังกัด</label>
                <select id="select_dept" name="dept" class="custom-select w-100 col-4">
                    
                </select>
            </div>
            <div class="row my-4">
                <div class="col-6">
                    
                </div>
                <div class="col-2">
                    <button id="btn_submit" type="button" class="btn btn-primary d-inline-block">ยืนยัน</button>
                </div>
                <div class="col-2 text-left">
                    <button id="btn_reset" type="reset" class="btn btn-secondary d-inline-block">ยกเลิก</button>
                </div>
            </div>
        </div>
    </form>

    <script src="js/jquery-3.2.1.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/popper.js"></script>
    <script src="js/jquery-confirm.min.js"></script>
    <script src="js/RegisterPage.js"></script>

</body>
</html>
