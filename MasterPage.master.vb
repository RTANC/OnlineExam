

Partial Class MasterPage
    Inherits System.Web.UI.MasterPage

    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load
        If (Request.Cookies("myCookies") Is Nothing Or HttpContext.Current.Session("dept_id") Is Nothing) Then
            Response.Redirect("LoginPage.aspx")
        End If
    End Sub
End Class

