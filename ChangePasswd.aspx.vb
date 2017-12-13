Imports System.Web
Imports System.Web.Services
Imports System.Data
Imports System.Data.SqlClient
Imports System.Configuration

Partial Class ChangePasswd
    Inherits System.Web.UI.Page

    Protected Shared cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
    Protected Shared con As New SqlConnection(cs)

    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load
        'If (Request.Cookies("myCookies") Is Nothing) Then
        '    Response.Redirect("LoginPage.aspx")
        'End If
    End Sub

    <WebMethod> Public Shared Function Change(ByVal pass As String) As Boolean
        con.Close()
        Dim ck As Boolean = False
        Dim cmd As New SqlCommand("spChangePasswd", con)
        cmd.CommandType = CommandType.StoredProcedure
        cmd.Parameters.AddWithValue("@id", Convert.ToInt16(HttpContext.Current.Request.Cookies("myCookies")("tid")))
        cmd.Parameters.AddWithValue("@pass", pass)
        con.Open()
        cmd.ExecuteNonQuery()
        ck = True
        con.Close()
        Return ck
    End Function

End Class
