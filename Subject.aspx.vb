Imports System.Web
Imports System.Web.Services
Imports System.Data
Imports System.Data.SqlClient
Imports System.Configuration

Partial Class Subject
    Inherits System.Web.UI.Page

    'Protected Shared cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
    'Protected Shared con As New SqlConnection(cs)

    <WebMethod> Public Shared Function getAllCourse() As List(Of Course)
        Dim cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
        Dim con As New SqlConnection(cs)
        Dim ListOfCourse As New List(Of Course)
        Dim cmd As New SqlCommand("select * from course", con)
        con.Open()
        Dim rd As SqlDataReader = cmd.ExecuteReader()
        While rd.Read()
            Dim course As New Course()
            course.course_id = Convert.ToInt32(rd(0))
            course.course_name = rd(1).ToString()
            ListOfCourse.Add(course)
        End While
        con.Close()
        Return ListOfCourse
    End Function

    <WebMethod(EnableSession:=True)> Public Shared Function getSubjectByCourse(ByVal cid As Integer) As List(Of SubjectNC)
        Dim cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
        Dim con As New SqlConnection(cs)
        con.Close()
        Dim ListOfSubject As New List(Of SubjectNC)
        Dim cmd As New SqlCommand("select * from subject where dept_id = @did and course_id = @cid", con)
        cmd.Parameters.AddWithValue("@did", Convert.ToInt32(HttpContext.Current.Request.Cookies("myCookies")("dept_id")))
        cmd.Parameters.AddWithValue("@cid", cid)
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

    <WebMethod(EnableSession:=True)> Public Shared Sub addSubject(ByVal sno As String, ByVal sname As String, ByVal cid As Integer)
        Dim cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
        Dim con As New SqlConnection(cs)
        Dim dep_id As Integer = Convert.ToInt32(HttpContext.Current.Request.Cookies("myCookies")("dept_id"))
        Dim cmd As New SqlCommand("insert into subject(subject_no,subject_name,dept_id,course_id) values(@sno,@sname,@did,@cid)", con)
        cmd.Parameters.AddWithValue("@sno", sno)
        cmd.Parameters.AddWithValue("@sname", sname)
        cmd.Parameters.AddWithValue("@did", dep_id)
        cmd.Parameters.AddWithValue("@cid", cid)
        con.Open()
        cmd.ExecuteNonQuery()
        con.Close()
    End Sub

    <WebMethod> Public Shared Sub editSubject(ByVal sid As Integer, ByVal sno As String, ByVal sname As String, ByVal cid As Integer)
        Dim cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
        Dim con As New SqlConnection(cs)
        Dim cmd As New SqlCommand("update subject set subject_no = @sno,subject_name=@sname,course_id=@cid where subject_id=@sid", con)
        cmd.Parameters.AddWithValue("@sid", sid)
        cmd.Parameters.AddWithValue("@sno", sno)
        cmd.Parameters.AddWithValue("@sname", sname)
        cmd.Parameters.AddWithValue("@cid", cid)
        con.Open()
        cmd.ExecuteNonQuery()
        con.Close()
    End Sub

    <WebMethod> Public Shared Sub delSubject(ByVal sid As Integer)
        Dim cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
        Dim con As New SqlConnection(cs)
        con.Close()
        Dim cmd As New SqlCommand("delete from subject where subject_id = @sid", con)
        cmd.Parameters.AddWithValue("@sid", sid)
        con.Open()
        cmd.ExecuteNonQuery()
        con.Close()
    End Sub

End Class
