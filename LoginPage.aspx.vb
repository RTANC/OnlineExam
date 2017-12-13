Imports System.Web
Imports System.Web.Services
Imports System.Data
Imports System.Data.SqlClient
Imports System.Configuration
Imports System.Web.Helpers

Partial Class LoginPage
    Inherits System.Web.UI.Page

    <WebMethod> Public Shared Function Validation(ByVal uname As String, ByVal pass As String) As Integer
        Dim cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
        Dim con As New SqlConnection(cs)
        con.Close()
        Dim teacher As New Teacher
        Dim buff(19) As Byte
        Dim sha1 As String = Crypto.SHA1(pass)
        Dim cv As New ConV()
        cv.HexStrToByteArr(sha1, buff)
        Dim ck As Integer = 0

        Dim cmd As New SqlCommand("spLogin", con)
        cmd.CommandType = CommandType.StoredProcedure
        cmd.Parameters.AddWithValue("@un", uname)
        cmd.Parameters.AddWithValue("@p", buff)
        con.Open()
        Dim rd As SqlDataReader = cmd.ExecuteReader()

        While rd.Read()
            teacher.teacher_id = Convert.ToInt32(rd(0))
            teacher.rank_id = Convert.ToInt32(rd(1))
            teacher.teacher_fname = rd(2).ToString()
            teacher.teacher_lname = rd(3).ToString()
            teacher.username = rd(4).ToString()
            teacher.passwd = DirectCast(rd(5), Byte())
            teacher.dept_id = Convert.ToInt32(rd(6))
            teacher.gender = Convert.ToBoolean(rd(7))
            teacher.flag = Convert.ToBoolean(rd(8))

            If teacher.username.Trim().Equals(uname) And teacher.passwd.SequenceEqual(buff) Then
                HttpContext.Current.Session("dept_id") = teacher.dept_id
                Dim myCookie As HttpCookie = New HttpCookie("myCookies")
                myCookie("tid") = teacher.teacher_id
                myCookie("dept_id") = teacher.dept_id
                'Dim dt As DateTime = Now.AddDays(1)
                'myCookie.Expires = New DateTime(dt.Year, dt.Month, dt.Day, 0, 0, 0)
                'myCookie.Expires = Now.AddDays(1)
                HttpContext.Current.Response.Cookies.Add(myCookie)
                If teacher.flag Then
                    'เคยเปลี่ยน Password มาแล้ว
                    ck = 1
                Else
                    'เข้าสู่ระบบครั้งแรก
                    ck = 2
                    'HttpContext.Current.Response.Redirect("ChangePasswd.aspx")
                End If
            End If
            Exit While
        End While
        con.Close()
        Return ck
    End Function

End Class
