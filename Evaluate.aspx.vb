Imports System.Web
Imports System.Web.Services
Imports System.Data
Imports System.Data.SqlClient
Imports System.Configuration
Imports Newtonsoft.Json
Partial Class Evaluate
    Inherits System.Web.UI.Page

    <WebMethod> Public Shared Function getSubject(ByVal y As Integer, ByVal t As Byte) As String
        Dim cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
        Dim con As New SqlConnection(cs)
        Dim dt As New DataTable
        Dim cmd As New SqlCommand("spGetSubjectEval", con)
        cmd.CommandType = CommandType.StoredProcedure
        cmd.Parameters.AddWithValue("@y", y)
        cmd.Parameters.AddWithValue("@t", t)
        con.Open()
        Dim sda As New SqlDataAdapter(cmd)
        sda.Fill(dt)
        con.Close()
        Return JsonConvert.SerializeObject(dt)
    End Function

    <WebMethod> Public Shared Function getExam(ByVal y As Integer, ByVal t As Byte, ByVal sid As Integer) As String
        Dim cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
        Dim con As New SqlConnection(cs)
        Dim dt As New DataTable
        Dim cmd As New SqlCommand("spGetExamEval", con)
        cmd.CommandType = CommandType.StoredProcedure
        cmd.Parameters.AddWithValue("@y", y)
        cmd.Parameters.AddWithValue("@t", t)
        cmd.Parameters.AddWithValue("@sid", sid)
        con.Open()
        Dim sda As New SqlDataAdapter(cmd)
        sda.Fill(dt)
        con.Close()
        Return JsonConvert.SerializeObject(dt)
    End Function

    <WebMethod> Public Shared Function getNumQuest(ByVal ex_id As Integer, ByVal ex_copy As Byte) As String
        Dim cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
        Dim con As New SqlConnection(cs)
        Dim dt As New DataTable
        Dim cmd As New SqlCommand("select count(*) numQuest from exam_detail where exam_id = @ex_id and exam_copy = @ex_copy", con)
        cmd.Parameters.AddWithValue("@ex_id", ex_id)
        cmd.Parameters.AddWithValue("@ex_copy", ex_copy)
        con.Open()
        Dim sda As New SqlDataAdapter(cmd)
        sda.Fill(dt)
        con.Close()
        Return JsonConvert.SerializeObject(dt)
    End Function
End Class
