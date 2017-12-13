Imports System.Web
Imports System.Web.Services
Imports System.Data
Imports System.Data.SqlClient
Imports System.Configuration

Partial Class StudentLogin
    Inherits System.Web.UI.Page

    <WebMethod> Public Shared Function Validation(ByVal stu_id As Integer, ByVal pass As String) As StudentLoginDetail
        Dim cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
        Dim con As New SqlConnection(cs)
        con.Close()
        Dim loginDetail As New StudentLoginDetail
        Dim cmd As New SqlCommand("spStudentLogin", con)
        cmd.CommandType = CommandType.StoredProcedure
        cmd.Parameters.AddWithValue("@stu_id", stu_id)
        cmd.Parameters.AddWithValue("@pwd", pass)
        cmd.Parameters.AddWithValue("@dn", DateTime.Now)
        con.Open()
        Dim rd As SqlDataReader = cmd.ExecuteReader()
        While rd.Read()
            loginDetail.exam_id = Convert.ToInt32(rd(0))
            loginDetail.year = Convert.ToInt16(rd(1))
            loginDetail.term = Convert.ToInt16(rd(2))
            loginDetail.subject_id = Convert.ToInt32(rd(3))
            loginDetail.subject_name = rd(4).ToString()
            loginDetail.exam_start_time = Convert.ToDateTime(rd(5))
            loginDetail.exam_end_time = Convert.ToDateTime(rd(6))
            loginDetail.student_id = Convert.ToInt32(rd(7))
            loginDetail.student_fname = rd(8).ToString()
            loginDetail.student_lname = rd(9).ToString()
            loginDetail.student_type = Convert.ToByte(rd(10))
            loginDetail.student_gender = Convert.ToByte(rd(11))
        End While
        con.Close()
        If loginDetail.exam_id <> 0 Then
            studentCheck(loginDetail)
        End If
        Return loginDetail
    End Function

    <WebMethod> Public Shared Sub studentCheck(ByVal detail As StudentLoginDetail)
        Dim cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
        Dim con As New SqlConnection(cs)
        Dim cmd As New SqlCommand("update examinee set examinee_check = 1 where student_id = @stu_id and exam_id = @ex_id", con)
        cmd.Parameters.AddWithValue("@ex_id", detail.exam_id)
        cmd.Parameters.AddWithValue("@stu_id", detail.student_id)
        con.Open()
        cmd.ExecuteNonQuery()
        con.Close()
    End Sub
End Class
