<%@ Page Title="" Language="VB" MasterPageFile="~/MasterPage.master" AutoEventWireup="false" CodeFile="Evaluate.aspx.vb" Inherits="Evaluate" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <style>
        .scrollable-menu {
            height: auto;
            max-height: 200px;
            overflow-x: hidden;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div class="row bg-light px-3 py-2">
        <div class="col-2">
            <div class="input-group">
                <span class="input-group-addon">ปีการศึกษา</span>
                <input id="txt_year" class="form-control" type="number" min="2559" max="9999" />
            </div>
        </div>
        <div class="col-4">
            <div class="form-check form-check-inline my-1">
                <label class="form-check-label">
                    <input type="radio" name="term" class="form-check-input" value="1" checked="checked" />&nbsp;ภาคการศึกษาที่&nbsp;1</label>
            </div>
            <div class="form-check form-check-inline my-1">
                <label class="form-check-label">
                    <input type="radio" name="term" class="form-check-input" value="2" />&nbsp;ภาคการศึกษาที่&nbsp;2</label>
            </div>
            <div class="form-check form-check-inline my-1">
                <label class="form-check-label">
                    <input type="radio" name="term" class="form-check-input" value="3" />&nbsp;ภาคฤดูร้อน</label>
            </div>
        </div>
        <div class="col-3">
            <div class="dropdown">
                <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown">
                    เลือกรายวิชา
                </button>
                <div class="dropdown-menu scrollable-menu">
                </div>
            </div>
        </div>
    </div>
    <div class="row py-3">
        <table id="show_exam" class="table table-striped table-bordered" cellspacing="0">
            <thead>
                <tr>
                    <th>ครั้งที่</th>
                    <th>รหัสวิชา</th>
                    <th class="text-center w-75">ชื่อวิชา</th>
                    <th>รายละเอียด</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
    <div class="modal fade" id="modal_Examinfo">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">สรุปผล</h5>
                    <input type="hidden"/>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        <div class="row mb-2">
                            <div class="col-3">
                                <div class="input-group">
                                    <span class="input-group-addon">ชุดข้อสอบ</span>
                                    <select id="select_exam_copy" class="form-control"></select>
                                </div>
                            </div>
                            <div class="col-3 float-right">
                                <label>จำนวนข้อ :&nbsp;</label><label id="numQuest">N/A</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <table id="show_sumation" class="table table-striped table-bordered" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th>Type.</th>
                                            <th>Mean</th>
                                            <th>Min</th>
                                            <th>Max</th>
                                            <th>Stddev</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder2" runat="Server">
    <script src="js/Evaluate.js"></script>
</asp:Content>

