Imports System.Web
Imports System.Web.Services
Imports System.Data
Imports System.Data.SqlClient
Imports System.Configuration
Partial Class MakeSchedule
    Inherits System.Web.UI.Page

    'Protected Shared cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
    'Protected Shared con As New SqlConnection(cs)
    <WebMethod> Public Shared Function getSchedule() As List(Of Schedule)
        Dim cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
        Dim con As New SqlConnection(cs)
        con.Close()
        Dim ListOfSchedule As New List(Of Schedule)
        Dim cmd As New SqlCommand("spGetSchedule", con)
        cmd.CommandType = CommandType.StoredProcedure
        con.Open()
        Dim rd As SqlDataReader = cmd.ExecuteReader()
        While rd.Read()
            Dim s As New Schedule
            s.exam_id = Convert.ToInt32(rd(0))
            s.dept_id = Convert.ToInt32(rd(1))
            s.subject_name = rd(2).ToString()
            s.exam_start_time = Convert.ToDateTime(rd(3))
            s.exam_end_time = Convert.ToDateTime(rd(4))
            s.year = Convert.ToInt32(rd(5))
            s.term = Convert.ToByte(rd(6))
            s.subject_id = Convert.ToInt32(rd(7))
            s.exam_gain = Convert.ToByte(rd(8))
            ListOfSchedule.Add(s)
        End While
        con.Close()
        Return ListOfSchedule
    End Function

    <WebMethod> Public Shared Function getExamById(ByVal ex_id As Integer) As Exam
        Dim cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
        Dim con As New SqlConnection(cs)
        Dim ex As New Exam
        con.Close()
        Dim cmd As New SqlCommand("select * from exam where exam_id = @ex_id", con)
        cmd.Parameters.AddWithValue("@ex_id", ex_id)
        con.Open()
        Dim rd As SqlDataReader = cmd.ExecuteReader()
        While rd.Read()
            ex.exam_id = Convert.ToInt32(rd(0))
            ex.year = Convert.ToInt32(rd(1))
            ex.term = Convert.ToInt32(rd(2))
            ex.subject_id = Convert.ToInt32(rd(3))
            ex.exam_start_time = Convert.ToDateTime(rd(4))
            ex.exam_end_time = Convert.ToDateTime(rd(5))
            ex.kr_value = If(IsDBNull(rd(6)), 0, Convert.ToSingle(rd(6)))
            ex.exam_gain = If(IsDBNull(rd(7)), 50, Convert.ToInt32(rd(7)))
        End While
        con.Close()
        Return ex
    End Function

    <WebMethod> Public Shared Sub addExam(ByVal ex As Exam)
        Dim cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
        Dim con As New SqlConnection(cs)
        con.Close()
        Dim cmd As New SqlCommand("insert into exam values(@y,@t,@sid,@est,@eet,null,@ex_g)", con)
        cmd.Parameters.AddWithValue("@y", ex.year)
        cmd.Parameters.AddWithValue("@t", ex.term)
        cmd.Parameters.AddWithValue("@sid", ex.subject_id)
        cmd.Parameters.AddWithValue("@est", ex.exam_start_time)
        cmd.Parameters.AddWithValue("@eet", ex.exam_end_time)
        cmd.Parameters.AddWithValue("@ex_g", ex.exam_gain)
        con.Open()
        cmd.ExecuteNonQuery()
        con.Close()
    End Sub

    <WebMethod> Public Shared Sub editExam(ByVal ex As Exam)
        Dim cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
        Dim con As New SqlConnection(cs)
        con.Close()
        Dim cmd As New SqlCommand("update exam set year = @y,term = @t,subject_id = @sid,exam_gain = @ex_g where exam_id = @ex_id", con)
        cmd.Parameters.AddWithValue("@ex_id", ex.exam_id)
        cmd.Parameters.AddWithValue("@y", ex.year)
        cmd.Parameters.AddWithValue("@t", ex.term)
        cmd.Parameters.AddWithValue("@sid", ex.subject_id)
        cmd.Parameters.AddWithValue("@ex_g", ex.exam_gain)
        con.Open()
        cmd.ExecuteNonQuery()
        con.Close()
    End Sub

    <WebMethod> Public Shared Sub editTimeExam(ByVal ex_id As Integer, ByVal est As Date, ByVal eet As Date)
        Dim cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
        Dim con As New SqlConnection(cs)
        con.Close()
        Dim cmd As New SqlCommand("spEditTimeExam", con)
        cmd.CommandType = CommandType.StoredProcedure
        cmd.Parameters.AddWithValue("@ex_id", ex_id)
        cmd.Parameters.AddWithValue("@est", est)
        cmd.Parameters.AddWithValue("@eet", eet)
        con.Open()
        cmd.ExecuteNonQuery()
        con.Close()
    End Sub

    <WebMethod> Public Shared Sub delExam(ByVal ex_id As Integer)
        Dim cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
        Dim con As New SqlConnection(cs)
        con.Close()
        Dim cmd As New SqlCommand("spDelExam", con)
        cmd.CommandType = CommandType.StoredProcedure
        cmd.Parameters.AddWithValue("@ex_id", ex_id)
        con.Open()
        cmd.ExecuteNonQuery()
        con.Close()
    End Sub

    <WebMethod> Public Shared Function getSubjectByDept() As List(Of SubjectNC)
        Dim cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
        Dim con As New SqlConnection(cs)
        con.Close()
        Dim ListOfSubject As New List(Of SubjectNC)
        Dim cmd As New SqlCommand("select * from subject where dept_id = @did", con)
        cmd.Parameters.AddWithValue("@did", Convert.ToInt16(HttpContext.Current.Request.Cookies("myCookies")("dept_id")))
        con.Open()
        Dim rd As SqlDataReader = cmd.ExecuteReader()
        While rd.Read()
            Dim subNC As New SubjectNC()
            subNC.subject_id = Convert.ToInt32(rd(0))
            subNC.subject_no = rd(1).ToString()
            subNC.subject_name = rd(2).ToString()
            subNC.dept_id = Convert.ToInt32(rd(3))
            subNC.course_id = Convert.ToInt32(rd(4))
            ListOfSubject.Add(subNC)
        End While
        con.Close()
        Return ListOfSubject
    End Function
End Class
