<%@ Page Title="" Language="VB" MasterPageFile="~/MasterPage.master" AutoEventWireup="false" CodeFile="MakeSchedule.aspx.vb" Inherits="MakeSchedule" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div class="row">
        <div class="col">
            <input id="Hidden1" type="hidden" value="<%=HttpContext.Current.Request.Cookies("myCookies")("dept_id") %>" />
        </div>
    </div>
    <div class="row py-2">
        <div class="col">
            <div id='calendar'></div>
        </div>
    </div>

    <div id="modal_addExam" class="modal fade">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">เพิ่มการสอบ</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body container">
                    <div class="row">
                        <div class="col-5">
                            <div class="input-group">
                                <span class="input-group-addon">ปีการศึกษา</span>
                                <input id="txt_year" class="form-control" type="number" />
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-check form-check-inline">
                                <label class="form-check-label">
                                    <input name="term" class="form-check-input" value="1" type="radio" checked="checked" />
                                    ภาคการเรียนที่&nbsp;1
                                </label>
                            </div>
                            <div class="form-check form-check-inline">
                                <label class="form-check-label">
                                    <input name="term" class="form-check-input" value="2" type="radio" />
                                    ภาคการเรียนที่&nbsp;2
                                </label>
                            </div>
                            <div class="form-check form-check-inline">
                                <label class="form-check-label">
                                    <input name="term" class="form-check-input" value="3" type="radio" />
                                    ภาคฤดูร้อน
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="row py-3">
                        <div class="col-5">
                            <div class="input-group">
                                <span class="input-group-addon">วิชา</span>
                                <select id="select_subject" class="custom-select w-100">
                                </select>
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="input-group">
                                <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                <input id="txt_date" class="form-control" type="text" readonly />
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="input-group">
                                <span class="input-group-addon"><i class="fa fa-clock-o"></i></span>
                                <input id="txt_time" class="form-control" type="text" readonly />
                            </div>
                        </div>                        
                    </div>
                    <div class="row">
                        <div class="col-4">
                            <div class="input-group">
                                <span class="input-group-addon">เกณฑ์ผ่าน</span>
                                <input id="txt_exGain" class="form-control" type="number" min="0" max="100" value="50"/>
                                <span class="input-group-addon">%</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="btn_addExam" class="btn btn-success d-none" type="button">สร้างการสอบ</button>
                    <button id="btn_submitEditExam" class="btn btn-warning d-none" type="button">แก้ไขการสอบ</button>
                    <button class="btn btn-secondary" type="button" data-dismiss="modal">ยกเลิก</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder2" runat="Server">
    <script src="js/MakeSchedule.js"></script>
</asp:Content>

