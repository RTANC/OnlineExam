<%@ Page Title="" Language="VB" MasterPageFile="~/MasterPage.master" AutoEventWireup="false" CodeFile="Subject.aspx.vb" Inherits="Subject" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div class="row my-3">
        <div class="col-2">
        </div>
        <div class="col-1">
            <h5>หลักสูตร</h5>
        </div>
        <div class="col-5">
            <select id="select_course" name="select_course" class="custom-select">
            </select>
        </div>
    </div>
    <div class="row my-3">
        <div class="col-1">
        </div>
        <div class="col-10">
            <table id="show_subject" class="table table-responsive table-bordered w-100" cellspacing="0">
                <thead class="table-inverse">
                    <tr>
                        <th class="text-center">รหัสวิชา</th>
                        <th class="text-center w-75">ชื่อวิชา</th>
                        <th class="text-center">แก้ไข</th>
                        <th class="text-center">ลบ</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
                <tfoot>
                    <tr>
                        <td>
                            <input id="txt_sub_no" class="form-control is-valid is-invalid" placeholder="ex.วทศท 107" type="text" />
                        </td>
                        <td>
                            <input id="txt_sub_name" class="form-control is-valid is-invalid" placeholder="ex.เทคโนโลยีสารสนเทศ" type="text" />
                        </td>
                        <td>
                            <button id="btn_add" class="btn btn-success disabled" disabled="disabled"><i class="fa fa-plus"></i></button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
    <div class="modal fade" id="modal_editSubject">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">แก้ไขรายวิชา</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span>&times;</span>
                    </button>
                </div>
                <div class="modal-body container-fluid">
                    <div class="row">
                        <input id="txt_edit_sub_id" type="hidden" />
                        <div class="col-4">
                            <input id="txt_edit_sub_no" class="form-control is-valid is-invalid" type="text" />
                        </div>
                        <div class="col-8">
                            <input id="txt_edit_sub_name" class="form-control is-valid is-invalid" type="text" />
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="btn_editSubmit" type="button" class="btn btn-primary disabled" disabled="disabled">ยืนยัน</button>
                </div>
            </div>
        </div>
    </div>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder2" runat="Server">
    <script src="js/Subject.js"></script>
</asp:Content>

