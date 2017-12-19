<%@ Page Title="" Language="VB" MasterPageFile="~/MasterPage.master" AutoEventWireup="false" CodeFile="Check.aspx.vb" Inherits="Check" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div class="row bg-success pt-2 pb-1 pl-5 mb-3" style="color: white;">
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
            <label>เกณฑ์ผ่าน&nbsp;:&nbsp;</label><label id="lbl_exam_gain" class="font-weight-bold"></label><label>&nbsp;%</label>
        </div>
        <div class="col-2">
            <button id="btn_gotoSchedule" type="button" class="btn btn-light my-2"><i class="fa fa-search">&nbsp;</i>ตารางสอบ</button>
        </div>
    </div>
    <div class="row px-2 py-2">
        <div class="col-2 text-center">
            <h4>คะแนนสอบ</h4>
        </div>
        <div class="col">
            <button id="btn_ReportScore" class="btn btn-info d-none">ออกรายงานคะแนน</button>
        </div>
    </div>
    <div class="row">
        <table id="show_student" class="table table-bordered">
            <thead class="table-inverse">
                <tr>
                    <th class="text-center">รหัสนิสิต</th>
                    <th class="text-center">ชื่อ-สกุล</th>
                    <%--<th class="text-center">รุ่น</th>
                    <th class="text-center">คะแนน</th>
                    <th class="text-center">ตรวจแล้ว</th>
                    <th class="text-center">รายละเอียด</th>
                    <th class="text-center">ตรวจข้อสอบอัตนัย</th>--%>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="text-center" colspan="6">ไม่มีข้อมูลในระบบ</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="row py-4 px-4">
        <div class="col-2">
            <div class="input-group">
                <span class="input-group-addon">ชุดข้อสอบ</span>
                <select id="select_exam_copy" class="custom-select w-50"></select>
            </div>
        </div>
        <div class="col-3">
            <button id="btn_exam_analysis" class="btn btn-primary d-none">วิเคราะห์ข้อสอบ</button>
        </div>
    </div>
    <div class="row">
        <table id="show_analysis" class="table table-responsive table-bordered">
            <thead class="table-info">
                <tr>
                    <th class="text-center">รหัสโจทย์</th>
                    <th class="text-center">ตัวเลือก</th>
                    <th class="text-center">กลุ่มสูง</th>
                    <th class="text-center">กลุ่มต่ำ</th>
                    <th class="text-center">pH</th>
                    <th class="text-center">pL</th>
                    <th class="text-center">P</th>
                    <th class="text-center">r</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="text-center" colspan="8">ไม่มีข้อมูลในระบบ</td>
                </tr>
            </tbody>
        </table>
    </div>

    <%--Modal Show Question Detail--%>
    <div id="modal_question" class="modal fade">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">โจทย์</h5>
                        <button type="button" class="close" data-dismiss="modal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body container-fluid">
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
                                    <label>Bloom taxonomy</label>
                                </div>
                                <div class="col-5">
                                    <label id="lbl_bloom"></label>
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

    <!-- Modal Explain-->
    <div class="modal fade" id="check_explain" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">โจทย์ข้อสอบ อัตนัย</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body container">
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
                <div class="modal-footer">
                    <button id="btn_saveScore" type="button" class="btn btn-primary">บันทึกคะแนน</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">ยกเลิก</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder2" runat="Server">
    <script src="js/Check.js"></script>
</asp:Content>
