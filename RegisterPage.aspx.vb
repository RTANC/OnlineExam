Imports System.Web
Imports System.Web.Services
Imports System.Data
Imports System.Data.SqlClient
Imports System.Configuration
Imports System.Web.Helpers

Partial Class RegisterPage
    Inherits System.Web.UI.Page

    Protected Shared cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
    Protected Shared con As New SqlConnection(cs)

    <WebMethod> Public Shared Function getAllDept() As List(Of Dept)
        Dim ListOfDept As New List(Of Dept)
        Dim cmd As New SqlCommand("select * from dept", con)
        con.Open()
        Dim rd As SqlDataReader = cmd.ExecuteReader()
        While rd.Read()
            Dim dept As New Dept()
            dept.dept_id = Convert.ToInt32(rd(0))
            dept.dept_name = rd(1).ToString()
            ListOfDept.Add(dept)
        End While
        con.Close()
        Return ListOfDept
    End Function

    <WebMethod> Public Shared Function getAllRank() As List(Of Rank)
        Dim ListOfRank As New List(Of Rank)
        Dim cmd As New SqlCommand("select * from rank", con)
        con.Open()
        Dim rd As SqlDataReader = cmd.ExecuteReader()
        While rd.Read()
            Dim rank As New Rank()
            rank.rank_id = Convert.ToInt32(rd(0))
            rank.rank_name = rd(1).ToString()
            ListOfRank.Add(rank)
        End While
        con.Close()
        Return ListOfRank
    End Function

    <WebMethod> Public Shared Sub Register(ByVal uname As String, ByVal passwd As String, ByVal rank As Integer, ByVal fname As String, ByVal lname As String, ByVal gender As Integer, ByVal dept As Integer)
        'Dim sha1 As String = Crypto.SHA1(passwd)
        'Dim buff(19) As Byte
        'Dim cv As New ConV()
        'cv.HexStrToByteArr(sha1, buff)
        'Dim cmd As New SqlCommand("spRegister", con)
        'cmd.CommandType = CommandType.StoredProcedure
        'With cmd.Parameters
        '    .AddWithValue("@rid", rank)
        '    .AddWithValue("@fn", fname)
        '    .AddWithValue("@ln", lname)
        '    .AddWithValue("@un", uname)
        '    .AddWithValue("@p", buff)
        '    .AddWithValue("@did", dept)
        '    .AddWithValue("@g", gender)
        'End With
        'con.Open()
        'cmd.ExecuteNonQuery()
        'con.Close()
    End Sub

    <WebMethod> Public Shared Function ValidateUname(ByVal uname As String) As Boolean
        Dim ck As Boolean = False
        Dim cmd As New SqlCommand("spValidateUname", con)
        cmd.CommandType = CommandType.StoredProcedure
        cmd.Parameters.AddWithValue("@un", uname)
        con.Open()
        ck = Convert.ToBoolean(cmd.ExecuteScalar())
        con.Close()
        Return ck
    End Function
End Class
