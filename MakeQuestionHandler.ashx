<%@ WebHandler Language="VB" Class="MakeQuestionHandler" %>

Imports System.Web
Imports System.Web.Services
Imports System.Data
Imports System.Data.SqlClient
Imports System.Configuration
Imports System.Web.Script.Serialization
Imports System.Web.Helpers

Public Class MakeQuestionHandler : Implements IHttpHandler

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        Dim obj As Question = New JavaScriptSerializer().Deserialize(context.Request("obj"), GetType(Question))
        If Convert.ToInt32(HttpContext.Current.Request("mod")) = 1 Then
            insertQuestion(obj, context)
        ElseIf Convert.ToInt32(HttpContext.Current.Request("mod")) = 2 Then
            editQuestion(obj, context)
        End If
    End Sub
    Public Sub insertQuestion(ByVal q As Question, ByVal context As HttpContext)
        Dim cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
        Dim con As New SqlConnection(cs)
        con.Close()
        Dim qid As String = DateTime.Now.ToString("ddMMyyyyhhmmss")
        Dim file As HttpPostedFile = context.Request.Files("quest_img")
        Dim cmd As New SqlCommand("spAddQuestion", con)
        cmd.CommandType = CommandType.StoredProcedure
        cmd.Parameters.AddWithValue("@sid", q.subject_id)
        cmd.Parameters.AddWithValue("@tid", q.topic_id)
        cmd.Parameters.AddWithValue("@qt", q.question_text)
        If file IsNot Nothing Then
            Dim quest_path As String = context.Server.MapPath("~/css/Images/quest_img/")
            Dim fileExt As String = file.FileName.Split(".").Last().ToLower()
            Dim fileName As String = Crypto.SHA1(qid) + "." + fileExt
            file.SaveAs(quest_path + fileName)
            cmd.Parameters.AddWithValue("@qi", fileName)
        Else
            'cmd.Parameters.Add("@qi", SqlDbType.VarBinary)
            cmd.Parameters.AddWithValue("@qi", DBNull.Value)
        End If
        cmd.Parameters.AddWithValue("@at", q.ans_type)
        If q.ans_type = 0 Then
            Dim ans_img1 As HttpPostedFile = context.Request.Files("ans_img1")
            Dim ans_img2 As HttpPostedFile = context.Request.Files("ans_img2")
            Dim ans_img3 As HttpPostedFile = context.Request.Files("ans_img3")
            Dim ans_img4 As HttpPostedFile = context.Request.Files("ans_img4")
            Dim ans_img5 As HttpPostedFile = context.Request.Files("ans_img5")
            If IsNothing(ans_img1) And IsNothing(ans_img2) And IsNothing(ans_img3) And IsNothing(ans_img4) And IsNothing(ans_img5) Then
                cmd.Parameters.AddWithValue("@c1", q.choice1)
                cmd.Parameters.AddWithValue("@c2", q.choice2)
                cmd.Parameters.AddWithValue("@c3", q.choice3)
                cmd.Parameters.AddWithValue("@c4", q.choice4)
                cmd.Parameters.AddWithValue("@c5", q.choice5)
            Else
                Dim ans_path As String = context.Server.MapPath("~/css/Images/ans_img/")

                Dim img As String = qid + "1" + "." + (ans_img1.FileName.Split(".").Last().ToLower())
                ans_img1.SaveAs(ans_path + img)
                cmd.Parameters.AddWithValue("@c1", img)

                img = qid + "2" + "." + (ans_img2.FileName.Split(".").Last().ToLower())
                ans_img2.SaveAs(ans_path + img)
                cmd.Parameters.AddWithValue("@c2", img)

                img = qid + "3" + "." + (ans_img3.FileName.Split(".").Last().ToLower())
                ans_img3.SaveAs(ans_path + img)
                cmd.Parameters.AddWithValue("@c3", img)

                img = qid + "4" + "." + (ans_img4.FileName.Split(".").Last().ToLower())
                ans_img4.SaveAs(ans_path + img)
                cmd.Parameters.AddWithValue("@c4", img)

                img = qid + "5" + "." + (ans_img5.FileName.Split(".").Last().ToLower())
                ans_img5.SaveAs(ans_path + img)
                cmd.Parameters.AddWithValue("@c5", img)
            End If
            cmd.Parameters.AddWithValue("@ac", q.ans_choice)
        Else
            cmd.Parameters.AddWithValue("@c1", DBNull.Value)
            cmd.Parameters.AddWithValue("@c2", DBNull.Value)
            cmd.Parameters.AddWithValue("@c3", DBNull.Value)
            cmd.Parameters.AddWithValue("@c4", DBNull.Value)
            cmd.Parameters.AddWithValue("@c5", DBNull.Value)
            cmd.Parameters.AddWithValue("@ac", DBNull.Value)
        End If
        cmd.Parameters.AddWithValue("@b", q.bloom)
        cmd.Parameters.AddWithValue("@sc", q.score)
        con.Open()
        cmd.ExecuteNonQuery()
        con.Close()
    End Sub

    Public Sub editQuestion(ByVal q As Question, ByVal context As HttpContext)
        Dim cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
        Dim con As New SqlConnection(cs)
        con.Close()
        Dim file As HttpPostedFile = context.Request.Files("quest_img")
        Dim cmd As New SqlCommand("spEditQuestion", con)
        cmd.CommandType = CommandType.StoredProcedure
        cmd.Parameters.AddWithValue("@qid", q.question_id)
        cmd.Parameters.AddWithValue("@sid", q.subject_id)
        cmd.Parameters.AddWithValue("@tid", q.topic_id)
        cmd.Parameters.AddWithValue("@qt", q.question_text)

        Dim qid As String = DateTime.Now.ToString("ddMMyyyyhhmmss")
        If Not IsNothing(file) Then
            Dim quest_path As String = context.Server.MapPath("~/css/Images/quest_img/")
            Dim fileExt As String = file.FileName.Split(".").Last().ToLower()
            Dim fileName As String = Crypto.SHA1(qid) + "." + fileExt
            file.SaveAs(quest_path + fileName)
            cmd.Parameters.AddWithValue("@qi", fileName)
        Else
            cmd.Parameters.AddWithValue("@qi", DBNull.Value)
        End If
        cmd.Parameters.AddWithValue("@at", q.ans_type)
        If q.ans_type = 0 Then
            Dim ans_img1 As HttpPostedFile = context.Request.Files("ans_img1")
            Dim ans_img2 As HttpPostedFile = context.Request.Files("ans_img2")
            Dim ans_img3 As HttpPostedFile = context.Request.Files("ans_img3")
            Dim ans_img4 As HttpPostedFile = context.Request.Files("ans_img4")
            Dim ans_img5 As HttpPostedFile = context.Request.Files("ans_img5")
            If IsNothing(ans_img1) And IsNothing(ans_img2) And IsNothing(ans_img3) And IsNothing(ans_img4) And IsNothing(ans_img5) Then
                cmd.Parameters.AddWithValue("@c1", q.choice1)
                cmd.Parameters.AddWithValue("@c2", q.choice2)
                cmd.Parameters.AddWithValue("@c3", q.choice3)
                cmd.Parameters.AddWithValue("@c4", q.choice4)
                cmd.Parameters.AddWithValue("@c5", q.choice5)
            Else
                Dim ans_path As String = context.Server.MapPath("~/css/Images/ans_img/")
                Dim img As String = ""
                If Not IsNothing(ans_img1) Then
                    img = qid + "1" + "." + (ans_img1.FileName.Split(".").Last().ToLower())
                    ans_img1.SaveAs(ans_path + img)
                    cmd.Parameters.AddWithValue("@c1", img)
                Else
                    cmd.Parameters.AddWithValue("@c1", q.choice1)
                End If
                If Not IsNothing(ans_img2) Then
                    img = qid + "2" + "." + (ans_img2.FileName.Split(".").Last().ToLower())
                    ans_img2.SaveAs(ans_path + img)
                    cmd.Parameters.AddWithValue("@c2", img)
                Else
                    cmd.Parameters.AddWithValue("@c2", q.choice2)
                End If
                If Not IsNothing(ans_img3) Then
                    img = qid + "3" + "." + (ans_img3.FileName.Split(".").Last().ToLower())
                    ans_img3.SaveAs(ans_path + img)
                    cmd.Parameters.AddWithValue("@c3", img)
                Else
                    cmd.Parameters.AddWithValue("@c3", q.choice3)
                End If
                If Not IsNothing(ans_img4) Then
                    img = qid + "4" + "." + (ans_img4.FileName.Split(".").Last().ToLower())
                    ans_img4.SaveAs(ans_path + img)
                    cmd.Parameters.AddWithValue("@c4", img)
                Else
                    cmd.Parameters.AddWithValue("@c4", q.choice4)
                End If
                If Not IsNothing(ans_img5) Then
                    img = qid + "5" + "." + (ans_img5.FileName.Split(".").Last().ToLower())
                    ans_img5.SaveAs(ans_path + img)
                    cmd.Parameters.AddWithValue("@c5", img)
                Else
                    cmd.Parameters.AddWithValue("@c5", q.choice5)
                End If
            End If
            cmd.Parameters.AddWithValue("@ac", q.ans_choice)
        Else
            cmd.Parameters.AddWithValue("@c1", DBNull.Value)
            cmd.Parameters.AddWithValue("@c2", DBNull.Value)
            cmd.Parameters.AddWithValue("@c3", DBNull.Value)
            cmd.Parameters.AddWithValue("@c4", DBNull.Value)
            cmd.Parameters.AddWithValue("@c5", DBNull.Value)
            cmd.Parameters.AddWithValue("@ac", DBNull.Value)
        End If
        cmd.Parameters.AddWithValue("@b", q.bloom)
        cmd.Parameters.AddWithValue("@sc", q.score)
        con.Open()
        cmd.ExecuteNonQuery()
        con.Close()
    End Sub

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class