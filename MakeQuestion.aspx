<%@ Page Title="" Language="VB" MasterPageFile="~/MasterPage.master" AutoEventWireup="false" CodeFile="MakeQuestion.aspx.vb" Inherits="MakeQuestion" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div class="bg-light px-1">
        <div class="row py-2">
            <div class="col-4">
                <div class="input-group">
                    <span class="input-group-addon">วิชา</span>
                    <select id="select_subject" class="custom-select w-100">
                    </select>
                </div>
            </div>
            <div class="col-4">
                <div>
                    <div class="input-group">
                        <span class="input-group-addon">หัวข้อเรื่อง</span>
                        <select id="select_topic" class="custom-select w-100">
                        </select>
                    </div>
                </div>
            </div>
            <div class="col">
                <button id="btn_addTopic" type="button" class="btn btn-success"><i class="fa fa-plus"></i></button>
                <button id="btn_editTopic" type="button" class="btn btn-warning"><i class="fa fa-pencil"></i></button>
                <%--<button id="btn_delTopic" type="button" class="btn btn-danger"><i class="fa fa-trash"></i></button>--%>
            </div>
        </div>
        <div class="row py-2">
            <div class="col-1">
                <label>ชนิดคำตอบ&nbsp;:</label>
            </div>
            <div class="col-1">
                <input name="ans_type" class="custom-radio align-middle" value="0" type="radio" checked="checked" />
                <label>&nbsp;ปรนัย</label>
            </div>
            <div class="col-1">
                <input name="ans_type" class="custom-radio align-middle" value="1" type="radio" />
                <label>&nbsp;อัตนัย</label>
            </div>
        </div>
    </div>
    <div class="row py-3">
        <div class="col">
            <table id="show_quest" class="table w-100" cellspacing="0">
                <thead class="table-inverse">
                    <tr>
                        <th class="text-center w-75">โจทย์</th>
                        <th class="text-center">P</th>
                        <th class="text-center">R</th>
                        <th class="text-center">แก้ไข</th>
                        <th class="text-center">ลบ</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="3"></td>
                        <td class="text-center">
                            <button class="btn btn-success" data-toggle="modal" data-target="#quest_detail" onclick="mod=1;"><i class="fa fa-plus"></i></button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>

    <%--Modal Fill Question Detail--%>
    <div class="modal fade" id="quest_detail" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5>ข้อมูล: โจทย์</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        <div class="row mb-3">
                            <div class="col-7">
                                <div class="input-group">
                                    <span class="input-group-addon">หัวข้อเรื่อง</span>
                                    <select id="select_new_topic" class="custom-select w-100">
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <label>โจทย์</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <textarea id="txt_question" class="form-control is-valid is-invalid" name="txt_question" cols="20" rows="6"></textarea>
                            </div>
                        </div>
                        <div class="row py-3">
                            <div class="col-12">
                                <div class="upload-btn-wrapper float-right">
                                    <button class="btn btn-outline-secondary"><i class="fa fa-cloud-upload"></i></button>
                                    <form>
                                        <input name="quest_img" type="file" />
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="row py-2">
                            <div class="col-12 text-center">
                                <img id="pre_quest_img" class="d-none img-thumbnail" src="css/Images/no_image_duplie_default.jpg" />
                                <button id="clear_quest_img" class="btn btn-outline-danger d-none" type="button"><i class="fa fa-close"></i></button>
                            </div>
                        </div>
                        <form>
                            <div class="row py-1 pnl_c">
                                <div class="col-2">
                                    <label>ตัวเลือก</label>
                                </div>
                                <div class="col-7">
                                    <div class="input-group mt-1 div-txt-choice">
                                        <span class="input-group-addon">1.</span>
                                        <input class="form-control is-valid is-invalid" name="choice" type="text" />
                                    </div>
                                    <div class="input-group my-1 div-img-choice">
                                        <span class="input-group-addon">1.</span>
                                        <img class="img-thumbnail pre_ans_img" src="css/Images/no_image_duplie_default.jpg" />
                                    </div>                                  
                                </div>
                                <div class="col-1">
                                    <div class="upload-btn-wrapper">
                                        <button class="btn btn-outline-secondary"><i class="fa fa-cloud-upload"></i></button>
                                        <input name="ans_img" type="file" />
                                    </div>
                                </div>
                            </div>
                            <div class="row py-1 pnl_c">
                                <div class="col-2">
                                </div>
                                <div class="col-7">
                                    <div class="input-group div-txt-choice">
                                        <span class="input-group-addon">2.</span>
                                        <input class="form-control is-valid is-invalid" name="choice" type="text" />
                                    </div>
                                    <div class="input-group my-1 div-img-choice">
                                        <span class="input-group-addon">2.</span>
                                        <img class="img-thumbnail pre_ans_img" src="css/Images/no_image_duplie_default.jpg" />
                                    </div>
                                </div>
                                <div class="col-1">
                                    <div class="upload-btn-wrapper">
                                        <button class="btn btn-outline-secondary"><i class="fa fa-cloud-upload"></i></button>
                                        <input name="ans_img" type="file" />
                                    </div>
                                </div>
                            </div>
                            <div class="row py-1 pnl_c">
                                <div class="col-2">
                                </div>
                                <div class="col-7">
                                    <div class="input-group div-txt-choice">
                                        <span class="input-group-addon">3.</span>
                                        <input class="form-control is-valid is-invalid" name="choice" type="text" />
                                    </div>
                                    <div class="input-group my-1 div-img-choice">
                                        <span class="input-group-addon">3.</span>
                                        <img class="img-thumbnail pre_ans_img" src="css/Images/no_image_duplie_default.jpg" />
                                    </div>
                                </div>
                                <div class="col-1">
                                    <div class="upload-btn-wrapper">
                                        <button class="btn btn-outline-secondary"><i class="fa fa-cloud-upload"></i></button>
                                        <input name="ans_img" type="file" />
                                    </div>
                                </div>
                            </div>
                            <div class="row py-1 pnl_c">
                                <div class="col-2">
                                </div>
                                <div class="col-7">
                                    <div class="input-group div-txt-choice">
                                        <span class="input-group-addon">4.</span>
                                        <input class="form-control is-valid is-invalid" name="choice" type="text" />
                                    </div>
                                    <div class="input-group my-1 div-img-choice">
                                        <span class="input-group-addon">4.</span>
                                        <img class="img-thumbnail pre_ans_img" src="css/Images/no_image_duplie_default.jpg" />
                                    </div>
                                </div>
                                <div class="col-1">
                                    <div class="upload-btn-wrapper">
                                        <button class="btn btn-outline-secondary"><i class="fa fa-cloud-upload"></i></button>
                                        <input name="ans_img" type="file" />
                                    </div>
                                </div>
                            </div>
                            <div class="row py-1 pnl_c">
                                <div class="col-2">
                                </div>
                                <div class="col-7">
                                    <div class="input-group div-txt-choice">
                                        <span class="input-group-addon">5.</span>
                                        <input class="form-control is-valid is-invalid" name="choice" type="text" />
                                    </div>
                                    <div class="input-group my-1 div-img-choice">
                                        <span class="input-group-addon">5.</span>
                                        <img class="img-thumbnail pre_ans_img" src="css/Images/no_image_duplie_default.jpg" />
                                    </div>
                                </div>
                                <div class="col-1">
                                    <div class="upload-btn-wrapper">
                                        <button class="btn btn-outline-secondary"><i class="fa fa-cloud-upload"></i></button>
                                        <input name="ans_img" type="file" />
                                    </div>
                                </div>
                                <div class="col-1">
                                    <button name="clear_img" class="btn btn-outline-danger float-right d-none" type="button"><i class="fa fa-close"></i></button>
                                </div>
                            </div>
                            <%--<div class="row py-1 pnl_c">
                                <div class="col-10">
                                    <button name="clear_img" class="btn btn-outline-danger float-right d-none" type="button"><i class="fa fa-close"></i></button>
                                </div>
                            </div>--%>
                        </form>
                        <div class="row py-2 pnl_c">
                            <div class="col-2">
                                <label>คำตอบ</label>
                            </div>
                            <div class="col-7 rd_c alert-danger">
                                <div class="form-check form-check-inline">
                                    <label class="form-check-label">
                                        <input name="ans_choice" type="radio" value="1" />
                                        1.
                                    </label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <label class="form-check-label">
                                        <input name="ans_choice" type="radio" value="2" />
                                        2.
                                    </label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <label class="form-check-label">
                                        <input name="ans_choice" type="radio" value="3" />
                                        3.
                                    </label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <label class="form-check-label">
                                        <input name="ans_choice" type="radio" value="4" />
                                        4.
                                    </label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <label class="form-check-label">
                                        <input name="ans_choice" type="radio" value="5" />
                                        5.
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="row py-3">
                            <div class="col-2">
                                <label>Bloom taxonomy</label>
                            </div>
                            <div class="col-5">
                                <select id="select_bloom" class="custom-select">
                                    <option value="1">ความรู้ที่เกิดจากความจำ</option>
                                    <option value="2">ความเข้าใจ</option>
                                    <option value="3">การประยุกต์</option>
                                    <option value="4">การวิเคราะห์</option>
                                    <option value="5">การสังเคราะห์</option>
                                    <option value="6">การประเมินค่า</option>
                                </select>
                            </div>
                        </div>
                        <div class="row py-3">
                            <div class="col-2">
                                <label>คะแนน</label>
                            </div>
                            <div class="col-2">
                                <input id="num_score" class="form-control" type="number" min="0" value="1" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="btn_addSubmit" class="btn btn-success">เพิ่ม</button>
                    <button id="btn_editSubmit" class="btn btn-warning">แก้ไข</button>
                    <button class="btn btn-secondary" data-dismiss="modal">ยกเลิก</button>
                </div>
            </div>
        </div>
    </div>

    <%--Modal Manage Topic--%>
    <div class="modal fade" id="modal_man_topic" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">หัวข้อเรื่อง</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body container">
                    <div class="row">
                        <div class="col">
                            <div class="input-group">
                                <span class="input-group-addon">หัวข้อเรื่อง</span>
                                <input id="txt_new_topic" class="form-control is-valid is-invalid" type="text" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="btn_submitAddTopic" class="btn btn-success d-none disabled" disabled="disabled">ยืนยัน</button>
                    <button id="btn_submitEditTopic" class="btn btn-warning d-none disabled" disabled="disabled">ยืนยัน</button>
                    <button class="btn btn-secondary" data-dismiss="modal">ยกเลิก</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder2" runat="Server">
    <script src="js/MakeQuestion.js"></script>
</asp:Content>

