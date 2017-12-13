<%@ Page Language="VB" AutoEventWireup="false" CodeFile="Test.aspx.vb" Inherits="Test" %>

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
</head>
<body style="background-color: darkgreen;">
    <div class="container-fluid">
        <div class="row py-2 text-white bg-dark">
            <div class="col-1 text-right">
                <img src="css/Images/logo_v.png" width="60" height="60" />
            </div>
            <div class="col-2">
                <h4>RTANC</h4>
                <h6>Online Exam</h6>
            </div>
            <div class="col-3">
                <label>รหัสนักเรียน :</label>
                <label id="lbl_stu_id" class="font-weight-bold"></label>
                <br />
                <label>ชื่อ - นามสกุล :</label>
                <label id="lbl_stu_name" class="font-weight-bold"></label>
            </div>
            <div class="col-3">
                <label>ปีการศึกษา :</label>
                <label id="lbl_year" class="font-weight-bold"></label>
                <label id="lbl_term" class="font-weight-light"></label>
                <br />
                <label>วิชา :</label>
                <label id="lbl_sub" class="font-weight-bold"></label>
            </div>
            <div class="col-2">
                <label>วันที่ :</label>
                <label id="lbl_date" class="font-weight-bold"></label>
                <br />
                <label>เวลา :</label>
                <label class="font-weight-bold" id="lbl_startTime"></label>
                <label>ถึง</label>
                <label class="font-weight-bold" id="lbl_endTime"></label>
            </div>
            <div class="col-1">
                <button id="btn_finish" class="btn btn-success my-2">ส่งข้อสอบ</button>
            </div>
        </div>
        <div class="row">
            <div class="col-9">
            </div>
            <div class="col alert alert-info">
                <div class="countdown">
                    เวลาคงเหลือ: <span id="clock"></span>
                </div>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="col py-3">
                <div id="pnl_quest" class="card">
                    <div class="card-footer">
                        <button id="btn_preQuest" class="btn btn-secondary d-none">ก่อนหน้า</button>
                        <button id="btn_nextQuest" class="btn btn-primary float-right">ถัดไป</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <footer>
        <div class="d-flex flex-wrap forgot">
            
        </div>
    </footer>
    <%--JavaScript--%>
    <script src="js/jquery-3.2.1.min.js"></script>
    <script src="js/popper.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/jquery-confirm.min.js"></script>
    <script src="js/js.cookie.js"></script>
    <script src="js/paging.js"></script>
    <script src="fullcalendar-3.6.2/lib/moment.min.js"></script>
    <script src="js/jquery.countdown.min.js"></script>
    <script type="text/javascript" src="js/Test.js"></script>
</body>
</html>
