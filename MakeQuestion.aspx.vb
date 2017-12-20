Imports System.Web
Imports System.Web.Services
Imports System.Data
Imports System.Data.SqlClient
Imports System.Configuration
Imports System.IO
Partial Class MakeQuestion
    Inherits System.Web.UI.Page

    <WebMethod> Public Shared Function getSubjectByDept() As List(Of SubjectNC)
        Dim cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
        Dim con As New SqlConnection(cs)
        con.Close()
        Dim ListOfSubject As New List(Of SubjectNC)
        Dim cmd As New SqlCommand("select * from subject where dept_id = @did", con)
        cmd.Parameters.AddWithValue("@did", Convert.ToInt32(HttpContext.Current.Request.Cookies("myCookies")("dept_id")))
        con.Open()
        Dim rd As SqlDataReader = cmd.ExecuteReader()
        While rd.Read()
            Dim s As New SubjectNC
            s.subject_id = Convert.ToInt32(rd(0))
            s.subject_no = rd(1).ToString()
            s.subject_name = rd(2).ToString()
            s.dept_id = Convert.ToInt32(rd(3))
            s.course_id = Convert.ToInt32(rd(4))
            ListOfSubject.Add(s)
        End While
        con.Close()
        Return ListOfSubject
    End Function

    <WebMethod> Public Shared Function getTopicBySubject(ByVal sid As Integer) As List(Of TopicNC)
        Dim cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
        Dim con As New SqlConnection(cs)
        con.Close()
        Dim ListOfTopic As New List(Of TopicNC)
        Dim cmd As New SqlCommand("select * from topic where subject_id = @sid", con)
        cmd.Parameters.AddWithValue("@sid", sid)
        con.Open()
        Dim rd As SqlDataReader = cmd.ExecuteReader()
        While rd.Read()
            Dim t As New TopicNC()
            t.topic_id = Convert.ToInt32(rd(0))
            t.topic_name = rd(1).ToString()
            t.subject_id = Convert.ToInt32(rd(2))
            ListOfTopic.Add(t)
        End While
        con.Close()
        Return ListOfTopic
    End Function

    <WebMethod> Public Shared Sub addTopic(ByVal tname As String, ByVal sid As Integer)
        Dim cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
        Dim con As New SqlConnection(cs)
        con.Close()
        Dim cmd As New SqlCommand("insert into topic(topic_name,subject_id) values(@tname,@sid)", con)
        cmd.Parameters.AddWithValue("@tname", tname)
        cmd.Parameters.AddWithValue("@sid", sid)
        con.Open()
        cmd.ExecuteNonQuery()
        con.Close()
    End Sub

    <WebMethod> Public Shared Sub editTopic(ByVal tid As Integer, ByVal tname As String)
        Dim cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
        Dim con As New SqlConnection(cs)
        Dim cmd As New SqlCommand("update topic set topic_name = @tname where topic_id = @tid", con)
        cmd.Parameters.AddWithValue("@tid", tid)
        cmd.Parameters.AddWithValue("@tname", tname)
        con.Open()
        cmd.ExecuteNonQuery()
        con.Close()
    End Sub

    <WebMethod> Public Shared Sub delTopic(ByVal tid As Integer)
        Dim cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
        Dim con As New SqlConnection(cs)
        Dim cmd As New SqlCommand("delete from topic where topic_id = @tid", con)
        cmd.Parameters.AddWithValue("@tid", tid)
        con.Open()
        cmd.ExecuteNonQuery()
        con.Close()
    End Sub



    <WebMethod> Public Shared Sub delQuestion(ByVal q As Question)
        Dim cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
        Dim con As New SqlConnection(cs)
        con.Close()
        Dim cmd As New SqlCommand("delete from question where question_id = @qid", con)
        cmd.Parameters.AddWithValue("@qid", q.question_id)
        con.Open()
        cmd.ExecuteNonQuery()
        con.Close()
        Dim quest_img_file As New FileInfo(HttpContext.Current.Server.MapPath(q.question_img))
        If quest_img_file.Exists Then
            quest_img_file.Delete()
        End If
        Dim c1_file As New FileInfo(HttpContext.Current.Server.MapPath(q.choice1))
        Dim c2_file As New FileInfo(HttpContext.Current.Server.MapPath(q.choice2))
        Dim c3_file As New FileInfo(HttpContext.Current.Server.MapPath(q.choice3))
        Dim c4_file As New FileInfo(HttpContext.Current.Server.MapPath(q.choice4))
        Dim c5_file As New FileInfo(HttpContext.Current.Server.MapPath(q.choice5))
        If c1_file.Exists And c2_file.Exists And c3_file.Exists And c4_file.Exists And c5_file.Exists Then
            c1_file.Delete()
            c2_file.Delete()
            c3_file.Delete()
            c4_file.Delete()
            c5_file.Delete()
        End If
    End Sub

    <WebMethod> Public Shared Function getQuestion(ByVal sid As Integer, ByVal tid As Integer, ByVal at As Integer) As List(Of Question)
        Dim cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
        Dim con As New SqlConnection(cs)
        con.Close()
        Dim ListOfQuestion As New List(Of Question)
        Dim cmd As New SqlCommand("select question_id,subject_id,topic_id,question_text,question_img,ans_type,choice1,choice2,choice3,choice4,choice5,ans_choice,score,STR(p_value,10,3) p_value,STR(r_value,10,3) r_value,bloom from question where subject_id = @sid and topic_id = @tid and ans_type = @at", con)
        cmd.Parameters.AddWithValue("@sid", sid)
        cmd.Parameters.AddWithValue("@tid", tid)
        cmd.Parameters.AddWithValue("@at", at)
        con.Open()
        Dim rd As SqlDataReader = cmd.ExecuteReader()
        While rd.Read()
            Dim q As New Question()
            q.question_id = Convert.ToInt32(rd(0))
            q.subject_id = Convert.ToInt32(rd(1))
            q.topic_id = Convert.ToInt32(rd(2))
            q.question_text = rd(3).ToString()
            If Not IsDBNull(rd(4)) Then
                q.question_img = "css/Images/quest_img/" + rd(4).ToString()
            Else
                q.question_img = vbNullString
            End If
            q.ans_type = Convert.ToInt16(rd(5))
            If q.ans_type = 0 Then
                Dim tmp As String = rd(6).ToString().Split(".").Last()
                If tmp.Equals("jpg") Or tmp.Equals("jpeg") Or tmp.Equals("png") Or tmp.Equals("gif") Then
                    Dim ans_path As String = "css/Images/ans_img/"
                    q.choice1 = ans_path + rd(6).ToString()
                    q.choice2 = ans_path + rd(7).ToString()
                    q.choice3 = ans_path + rd(8).ToString()
                    q.choice4 = ans_path + rd(9).ToString()
                    q.choice5 = ans_path + rd(10).ToString()
                Else
                    q.choice1 = rd(6).ToString()
                    q.choice2 = rd(7).ToString()
                    q.choice3 = rd(8).ToString()
                    q.choice4 = rd(9).ToString()
                    q.choice5 = rd(10).ToString()

                End If
                q.ans_choice = Convert.ToInt32(rd(11))
            Else
                q.choice1 = vbNullString
                q.choice2 = vbNullString
                q.choice3 = vbNullString
                q.choice4 = vbNullString
                q.choice5 = vbNullString
                q.ans_choice = vbNull
            End If
            q.score = Convert.ToInt32(rd(12))
            If Not IsDBNull(rd(13)) And Not IsDBNull(rd(14)) Then
                q.p_value = Convert.ToSingle(rd(13))
                q.r_value = Convert.ToSingle(rd(14))
            Else
                If IsDBNull(rd(13)) Then
                    q.p_value = -1
                End If

                If IsDBNull(rd(14)) Then
                    q.r_value = -1
                End If
            End If
            q.bloom = Convert.ToByte(rd(15))
            ListOfQuestion.Add(q)
        End While
        Return ListOfQuestion
    End Function
End Class
