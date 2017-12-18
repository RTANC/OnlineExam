Imports System.Web
Imports System.Web.Services
Imports System.Data
Imports System.Data.SqlClient
Imports System.Configuration
Imports System.String

Partial Class Test
    Inherits System.Web.UI.Page

    <WebMethod> Public Shared Function getNumCopy(ByVal ex_id As Integer) As Integer
        Dim cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
        Dim con As New SqlConnection(cs)
        con.Close()
        Dim cmd As New SqlCommand("select MAX(exam_copy) from exam_detail where exam_id = @ex_id", con)
        cmd.Parameters.AddWithValue("@ex_id", ex_id)
        con.Open()
        Dim numCopy As Integer = cmd.ExecuteScalar()
        con.Close()
        Return numCopy
    End Function

    <WebMethod> Public Shared Function getQuestionToTest(ByVal ex_id As Integer, ByVal ex_copy As Integer) As List(Of Question)
        Dim cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
        Dim con As New SqlConnection(cs)
        con.Close()
        Dim ListOfQuestion As New List(Of Question)
        Dim cmd As New SqlCommand("spGetQuestionToTest", con)
        cmd.CommandType = CommandType.StoredProcedure
        cmd.Parameters.AddWithValue("@ex_id", ex_id)
        cmd.Parameters.AddWithValue("@ex_copy", ex_copy)
        con.Open()
        Dim rd As SqlDataReader = cmd.ExecuteReader()
        While rd.Read()
            Dim q As New Question
            q.question_id = Convert.ToInt32(rd(0))
            q.subject_id = Convert.ToInt32(rd(1))
            q.topic_id = Convert.ToInt32(rd(2))
            q.question_text = rd(3).ToString()
            q.question_img = If(IsDBNull(rd(4)), "", "css/Images/quest_img/" + rd(4).ToString())
            q.ans_type = Convert.ToInt32(rd(5))
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
            q.exam_detail_id = Convert.ToInt32(rd(16))
            ListOfQuestion.Add(q)
        End While
        con.Close()
        Return ListOfQuestion
    End Function

    <WebMethod> Public Shared Sub addPointOfAnsChoice(ByVal stu_id As Integer, exd_id As Integer, ByVal ac As Integer)
        Dim cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
        Dim con As New SqlConnection(cs)
        con.Close()
        Dim cmd As New SqlCommand("spAddPointOfAnsChoice", con)
        cmd.CommandType = CommandType.StoredProcedure
        cmd.Parameters.AddWithValue("@stu_id", stu_id)
        cmd.Parameters.AddWithValue("@exd_id", exd_id)
        cmd.Parameters.AddWithValue("@ac", ac)
        con.Open()
        cmd.ExecuteNonQuery()
        con.Close()
    End Sub

    <WebMethod> Public Shared Sub addZeroPoint(ByVal stu_id As Integer, exd_id As Integer)
        Dim cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
        Dim con As New SqlConnection(cs)
        con.Close()
        Dim cmd As New SqlCommand("insert into answersheet(student_id,exam_detail_id,ans_choice,point) values(@stu_id,@exd_id,0,0)", con)
        cmd.Parameters.AddWithValue("@stu_id", stu_id)
        cmd.Parameters.AddWithValue("@exd_id", exd_id)
        con.Open()
        cmd.ExecuteNonQuery()
        con.Close()
    End Sub

    <WebMethod> Public Shared Sub addAnsExplain(ByVal stu_id As Integer, exd_id As Integer, ByVal ax As String)
        Dim cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
        Dim con As New SqlConnection(cs)
        con.Close()
        Dim cmd As New SqlCommand("insert into answersheet(student_id,exam_detail_id,ans_explain) values(@stu_id,@exd_id,@ax)", con)
        cmd.Parameters.AddWithValue("@stu_id", stu_id)
        cmd.Parameters.AddWithValue("@exd_id", exd_id)
        If Not IsNullOrEmpty(ax) Then
            cmd.Parameters.AddWithValue("@ax", ax)
        End If
        con.Open()
        cmd.ExecuteNonQuery()
        con.Close()
    End Sub

    <WebMethod> Public Shared Function getReportScore(ByVal ex_id As Integer, ByVal stu_id As Integer) As List(Of ReportScore)
        Dim cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
        Dim con As New SqlConnection(cs)
        con.Close()
        Dim ListOfReport As New List(Of ReportScore)
        Dim cmd As New SqlCommand("spReportScore", con)
        cmd.CommandType = CommandType.StoredProcedure
        cmd.Parameters.AddWithValue("@ex_id", ex_id)
        cmd.Parameters.AddWithValue("@stu_id", stu_id)
        con.Open()
        Dim rd As SqlDataReader = cmd.ExecuteReader()
        While rd.Read()
            Dim r As New ReportScore
            r.topic_name = rd(0).ToString()
            r.sumScore = Convert.ToInt32(rd(1))
            r.maxScore = Convert.ToInt32(rd(2))
            ListOfReport.Add(r)
        End While
        con.Close()
        Return ListOfReport
    End Function
End Class
