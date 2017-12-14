Imports System.Web
Imports System.Web.Services
Imports System.Data
Imports System.Data.SqlClient
Imports System.Configuration
Imports Newtonsoft.Json
Partial Class Check
    Inherits System.Web.UI.Page

    <WebMethod> Public Shared Function getExamCopy(ByVal ex_id As Integer) As List(Of Integer)
        Dim cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
        Dim con As New SqlConnection(cs)
        Dim ListOfCopy As New List(Of Integer)
        con.Close()
        Dim cmd As New SqlCommand("select distinct exam_detail.exam_copy from exam_detail where exam_id = @ex_id", con)
        cmd.Parameters.AddWithValue("@ex_id", ex_id)
        con.Open()
        Dim rd As SqlDataReader = cmd.ExecuteReader()
        While rd.Read()
            ListOfCopy.Add(Convert.ToInt32(rd(0)))
        End While
        con.Close()
        Return ListOfCopy
    End Function

    <WebMethod> Public Shared Function getFullScore(ByVal ex_id As Integer) As List(Of FullScore)
        Dim cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
        Dim con As New SqlConnection(cs)
        con.Close()
        Dim ListOfFullScore As New List(Of FullScore)
        Dim cmd As New SqlCommand("spGetFullScore", con)
        cmd.CommandType = CommandType.StoredProcedure
        cmd.Parameters.AddWithValue("@ex_id", ex_id)
        con.Open()
        Dim rd As SqlDataReader = cmd.ExecuteReader
        While rd.Read()
            Dim fs As New FullScore
            fs.topic_name = rd(0).ToString()
            fs.fullScore = Convert.ToInt32(rd(1))
            ListOfFullScore.Add(fs)
        End While
        con.Close()
        Return ListOfFullScore
    End Function

    '<WebMethod> Public Shared Function getTotalQuest(ByVal ex_id As Integer) As Integer
    '    Dim cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
    '    Dim con As New SqlConnection(cs)
    '    con.Close()
    '    Dim cmd As New SqlCommand("select COUNT(question.question_id) from question inner join exam_detail on exam_detail.question_id = question.question_id and exam_detail.exam_id = @ex_id", con)
    '    cmd.Parameters.AddWithValue("@ex_id", ex_id)
    '    con.Open()
    '    Dim totalQuest = cmd.ExecuteScalar()
    '    con.Close()
    '    Return totalQuest
    'End Function

    '<WebMethod> Public Shared Function getStudentPoint(ByVal ex_id As Integer) As List(Of StudentPoint)
    '    Dim cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
    '    Dim con As New SqlConnection(cs)
    '    con.Close()
    '    Dim ListOfStudentPoint As New List(Of StudentPoint)
    '    Dim cmd As New SqlCommand("spGetPoint", con)
    '    cmd.CommandType = CommandType.StoredProcedure
    '    cmd.Parameters.AddWithValue("@ex_id", ex_id)
    '    con.Open()
    '    Dim rd As SqlDataReader = cmd.ExecuteReader()
    '    While rd.Read()
    '        Dim s As New StudentPoint
    '        s.student_id = Convert.ToInt32(rd(0))
    '        s.student_fname = rd(1).ToString()
    '        s.student_lname = rd(2).ToString()
    '        s.student_type = Convert.ToInt32(rd(3))
    '        s.student_intake = Convert.ToInt32(rd(4))
    '        s.student_gender = Convert.ToInt32(rd(5))
    '        s.point = Convert.ToInt32(rd(6))
    '        s.checked = Convert.ToInt32(rd(7))
    '        ListOfStudentPoint.Add(s)
    '    End While
    '    con.Close()
    '    Return ListOfStudentPoint
    'End Function

    <WebMethod> Public Shared Function getFullReport(ByVal ex_id As Integer) As String
        Dim dt As New DataTable
        Dim cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
        Dim con As New SqlConnection(cs)
        Dim cmd As New SqlCommand("spGetFullReport", con)
        cmd.CommandType = CommandType.StoredProcedure
        cmd.Parameters.AddWithValue("@ex_id", ex_id)
        con.Open()
        Dim sda As New SqlDataAdapter(cmd)
        sda.Fill(dt)
        con.Close()
        Return JsonConvert.SerializeObject(dt)
    End Function

    <WebMethod> Public Shared Function getAnsExplain(ByVal ex_id As Integer, ByVal stu_id As Integer) As List(Of AnsExplain)
        Dim cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
        Dim con As New SqlConnection(cs)
        Dim ListOfAns As New List(Of AnsExplain)
        Dim cmd As New SqlCommand("spGetAnsExplain", con)
        cmd.CommandType = CommandType.StoredProcedure
        cmd.Parameters.AddWithValue("@ex_id", ex_id)
        cmd.Parameters.AddWithValue("@stu_id", stu_id)
        con.Open()
        Dim rd As SqlDataReader = cmd.ExecuteReader()
        While rd.Read()
            Dim a As New AnsExplain
            a.answersheet_id = Convert.ToInt32(rd(0))
            a.question_text = rd(1).ToString()
            a.question_img = If(Not IsDBNull(rd(2)), "css/Images/quest_img/" + rd(2).ToString(), "")
            a.ans_explain = If(Not IsDBNull(rd(3)), rd(3).ToString(), "")
            a.score = Convert.ToInt32(rd(4))
            ListOfAns.Add(a)
        End While
        con.Close()
        Return ListOfAns
    End Function

    <WebMethod> Public Shared Sub updateExplainPoint(ByVal ans_id As Integer, ByVal p As Integer)
        Dim cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
        Dim con As New SqlConnection(cs)
        Dim cmd As New SqlCommand("update answersheet set point = @p where answersheet_id = @ans_id", con)
        cmd.Parameters.AddWithValue("@ans_id", ans_id)
        cmd.Parameters.AddWithValue("@p", p)
        con.Open()
        cmd.ExecuteNonQuery()
        con.Close()
    End Sub

    <WebMethod> Public Shared Sub calExamAnalysis(ByVal ex_id As Integer, ByVal ex_copy As Integer)
        Dim cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
        Dim con As New SqlConnection(cs)
        Dim cmd As New SqlCommand("spCalExamAnalysis", con)
        cmd.CommandType = CommandType.StoredProcedure
        cmd.Parameters.AddWithValue("@ex_id", ex_id)
        cmd.Parameters.AddWithValue("@ex_copy", ex_copy)
        con.Open()
        cmd.ExecuteNonQuery()
        con.Close()
    End Sub

    <WebMethod> Public Shared Function getExamAnalysis(ByVal ex_id As Integer, ByVal ex_copy As Integer) As List(Of ExamAnalysis)
        Dim cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
        Dim con As New SqlConnection(cs)
        Dim cmd As New SqlCommand("spGetExamAnalysis", con)
        Dim ListOfExamAnalysis As New List(Of ExamAnalysis)
        cmd.CommandType = CommandType.StoredProcedure
        cmd.Parameters.AddWithValue("@ex_id", ex_id)
        cmd.Parameters.AddWithValue("@ex_copy", ex_copy)
        con.Open()
        Dim rd As SqlDataReader = cmd.ExecuteReader()
        While rd.Read()
            Dim ea As New ExamAnalysis
            ea.question_id = Convert.ToInt32(rd(0))
            ea.choice = Convert.ToByte(rd(1))
            ea.h = Convert.ToByte(rd(2))
            ea.l = Convert.ToByte(rd(3))
            ea.ph = Convert.ToSingle(rd(4))
            ea.pl = Convert.ToSingle(rd(5))
            ea.p = Convert.ToSingle(rd(6))
            ea.r = Convert.ToSingle(rd(7))
            ea.key_choice = Convert.ToByte(rd(8))
            ListOfExamAnalysis.Add(ea)
        End While
        con.Close()
        Return ListOfExamAnalysis
    End Function

    <WebMethod> Public Shared Function getQuestionById(ByVal qid As Integer) As List(Of Question)
        Dim cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
        Dim con As New SqlConnection(cs)
        con.Close()
        Dim ListOfQuestion As New List(Of Question)
        Dim cmd As New SqlCommand("select * from question where question_id = @qid", con)
        cmd.Parameters.AddWithValue("@qid", qid)
        con.Open()
        Dim rd As SqlDataReader = cmd.ExecuteReader()
        While rd.Read()
            Dim q As New Question
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
            End If
            q.bloom = Convert.ToByte(rd(15))
            ListOfQuestion.Add(q)
        End While
        con.Close()
        Return ListOfQuestion
    End Function
End Class
