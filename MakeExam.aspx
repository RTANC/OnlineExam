<%@ Page Title="" Language="VB" MasterPageFile="~/MasterPage.master" AutoEventWireup="false" CodeFile="MakeExam.aspx.vb" Inherits="MakeExam" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <style type="text/css">
        img {
            max-width: 100%;
            height: auto;
        }

        .bg-info label {
            color: white;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div class="row bg-info pt-2 pb-1 pl-5">
        <div class="col-3">
            <label>ปีการศึกษา&nbsp;:&nbsp;</label><label id="lbl_year" class="font-weight-bold"></label>
            <br />
            <label>วิชา&nbsp;:&nbsp;</label><label id="lbl_subject" class="font-weight-bold"></label>
        </div>
        <div class="col-3">
            <label id="lbl_term" class="font-weight-bold"></label>
            <br />
            <label>วันที่&nbsp;:&nbsp;</label><label id="lbl_date" class="font-weight-bold"></label>
            <label>เวลา&nbsp;:&nbsp;</label><label id="lbl_time" class="font-weight-bold"></label>
        </div>
        <div class="col-2">
            <button id="btn_gotoSchedule" type="button" class="btn btn-light my-2"><i class="fa fa-search">&nbsp;</i>ตารางสอบ</button>
        </div>
    </div>

    <div class="py-3">
        <div class="row my-3">
            <div class="col-3">
                <h4>รายชื่อนักเรียนผู้เข้าสอบ</h4>
            </div>
            <div class="col-6">
                <button id="btn_delAllExaminee" class="btn btn-danger"><i class="fa fa-trash">&nbsp;</i>ลบทั้งหมด</button>
                <a href="Reports/ReportExaminees.aspx" class="btn btn-info">พิมพ์ รายชื่อนักเรียนผู้เข้าสอบ</a>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <table id="show_student" class="table">
                    <thead class="table-success">
                        <tr>
                            <th class="text-center">รหัสนิสิต</th>
                            <th class="text-center w-50">ชื่อ-สกุล</th>
                            <th class="text-center">รหัสผ่าน</th>
                            <th class="text-center">ลบ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="text-center" colspan="4">ไม่มีข้อมูลในระบบ</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td>
                                <div class="container-fluid">
                                    <div class="row">
                                        <div class="col-4">
                                            <div class="input-group">
                                                <span class="input-group-addon">
                                                    <input name="stu_type" value="1" type="radio" checked="checked" />&nbsp;นรพ.&nbsp;
                                                </span>
                                                <input id="c1" name="c" type="number" class="form-control" min="0" />
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="input-group">
                                                <span class="input-group-addon">
                                                    <input name="stu_type" value="2" type="radio" />&nbsp;นรช.&nbsp;
                                                </span>
                                                <input id="c2" name="c" type="number" class="form-control" min="0" disabled="disabled" />
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="input-group">
                                                <span class="input-group-addon">
                                                    <input name="stu_type" value="3" type="radio" />&nbsp;นทน.&nbsp;
                                                </span>
                                                <input id="c3" name="c" type="number" class="form-control" min="0" disabled="disabled" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <button id="btn_addExaminee" class="btn btn-success"><i class="fa fa-plus"></i></button>
                            </td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
        <div class="row py-4 px-4">
            <div class="col-2">
                <div class="input-group">
                    <span class="input-group-addon">ชุดข้อสอบ</span>
                    <input name="numCopy" class="form-control w-100" type="number" min="1" max="255" value="1"/>
                </div>
            </div>
            <div class="col-4">
                <button id="btn_delCopy" class="btn btn-danger"><i class="fa fa-trash">&nbsp;</i>ลบชุดข้อสอบ</button>
            </div>
        </div>
        <div class="row py-2 px-4">
            <div class="col-2">
                <h5>หัวข้อเรื่อง :</h5>
            </div>
            <div class="col-3">
                <select id="select_topic" class="custom-select w-100">
                </select>
            </div>
            <div class="col-1">
                <div class="form-check form-check-inline">
                    <label class="form-check-label">
                        <input id="rad_choice" name="filter" value="0" checked="checked" class="form-check-input" type="radio" />
                        ปรนัย
                    </label>
                </div>
            </div>
            <div class="col-1">
                <div class="form-check form-check-inline">
                    <label class="form-check-label">
                        <input id="rad_explian" name="filter" value="1" class="form-check-input" type="radio" />
                        อัตนัย
                    </label>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <table id="show_question" class="table">
                    <thead class="table-info">
                        <tr>
                            <th class="text-center w-100">โจทย์</th>
                            <th class="text-center">P</th>
                            <th class="text-center">R</th>
                            <th class="text-center">ข้อมูล</th>
                            <th class="text-center">ลบ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="text-center" colspan="5">ไม่มีข้อมูลในระบบ</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td>
                                <button id="btn_addQuest" class="btn btn-success"><i class="fa fa-plus"></i></button>
                            </td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>

        <div id="modal_question" class="modal fade">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">เลือกโจทย์</h5>
                        <button type="button" class="close" data-dismiss="modal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body container-fluid">
                        <div class="row">
                            <div class="col">
                                <table id="show_select_question" class="table table-hover mt-3 table-bordered">
                                    <thead class="table-inverse">
                                        <tr>
                                            <th class="text-center w-100">โจทย์</th>
                                            <th class="text-center">P</th>
                                            <th class="text-center">R</th>
                                            <th class="text-center">เลือก<input type="checkbox" name="quest_checkAll"/></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="text-center" colspan="4">ไม่มีข้อมูลแสดง</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="quest_detail">
                            <div class="row">
                                <div class="col-1">
                                    <label>โจทย์</label>
                                </div>
                                <div class="col">
                                    <label id="lbl_quest"></label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="col px-5">
                                        <img class="pre_quest_img img-fluid d-none" src="css/Images/no_image_duplie_default.jpg" />
                                    </div>
                                </div>
                            </div>
                            <div class="row py-1 pnl_c">
                                <div class="col-2">
                                </div>
                                <div class="col px-5">
                                    <div class="input-group w-75 ans_txt">
                                        <span class="input-group-addon">1.</span>
                                        <input name="choice" class="form-control" type="text" readonly />
                                    </div>
                                    <div class="input-group w-75 d-none ans_img">
                                        <span class="input-group-addon">1.</span>
                                        <img class="pre_ans_img img-thumbnail" src="css/Images/no_image_duplie_default.jpg" />
                                    </div>
                                </div>
                            </div>
                            <div class="row py-1 pnl_c">
                                <div class="col-2">
                                </div>
                                <div class="col px-5">
                                    <div class="input-group w-75 ans_txt">
                                        <span class="input-group-addon">2.</span>
                                        <input name="choice" class="form-control" type="text" readonly />
                                    </div>
                                    <div class="input-group w-75 d-none ans_img">
                                        <span class="input-group-addon">2.</span>
                                        <img class="pre_ans_img img-thumbnail" src="css/Images/no_image_duplie_default.jpg" />
                                    </div>
                                </div>
                            </div>
                            <div class="row py-1 pnl_c">
                                <div class="col-2">
                                </div>
                                <div class="col px-5">
                                    <div class="input-group w-75 ans_txt">
                                        <span class="input-group-addon">3.</span>
                                        <input name="choice" class="form-control" type="text" readonly />
                                    </div>
                                    <div class="input-group w-75 d-none ans_img">
                                        <span class="input-group-addon">3.</span>
                                        <img class="pre_ans_img img-thumbnail" src="css/Images/no_image_duplie_default.jpg" />
                                    </div>
                                </div>
                            </div>
                            <div class="row py-1 pnl_c">
                                <div class="col-2">
                                </div>
                                <div class="col px-5">
                                    <div class="input-group w-75 ans_txt">
                                        <span class="input-group-addon">4.</span>
                                        <input name="choice" class="form-control" type="text" readonly />
                                    </div>
                                    <div class="input-group w-75 d-none ans_img">
                                        <span class="input-group-addon">4.</span>
                                        <img class="pre_ans_img img-thumbnail" src="css/Images/no_image_duplie_default.jpg" />
                                    </div>
                                </div>
                            </div>
                            <div class="row py-1 pnl_c">
                                <div class="col-2">
                                </div>
                                <div class="col px-5">
                                    <div class="input-group w-75 ans_txt">
                                        <span class="input-group-addon">5.</span>
                                        <input name="choice" class="form-control" type="text" readonly />
                                    </div>
                                    <div class="input-group w-75 d-none ans_img">
                                        <span class="input-group-addon">5.</span>
                                        <img class="pre_ans_img img-thumbnail" src="css/Images/no_image_duplie_default.jpg" />
                                    </div>
                                </div>
                            </div>
                            <div class="row py-1 pnl_c">
                                <div class="col-2">
                                    <label>คำตอบ</label>
                                </div>
                                <div class="col-2">
                                    <label id="lbl_ans_choice"></label>
                                </div>
                            </div>
                            <div class="row py-1">
                                <div class="col-2">
                                    <label>คะแนน</label>
                                </div>
                                <div class="col-2">
                                    <label id="lbl_score"></label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button id="btn_addSelectQuest" type="button" class="btn btn-primary">ยืนยัน</button>
                        <button id="btn_cancalSelectQuest" type="button" class="btn btn-secondary" data-dismiss="modal">ยกเลิก</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder2" runat="Server">
    <script src="js/MakeExam.js"></script>
</asp:Content>
