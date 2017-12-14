Imports System.Web
Imports System.Web.Services
Imports System.Data
Imports System.Data.SqlClient
Imports System.Configuration

Partial Class MakeExam
    Inherits System.Web.UI.Page

    <WebMethod> Public Shared Function getExam(ByVal ex_id As Integer) As Exam2
        Dim cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
        Dim con As New SqlConnection(cs)
        con.Close()
        Dim exam As New Exam2
        Dim cmd As New SqlCommand("select exam.*,[subject].subject_name from exam inner join subject on subject.subject_id = exam.subject_id where exam_id = @ex_id", con)
        cmd.Parameters.AddWithValue("@ex_id", ex_id)
        con.Open()
        Dim rd As SqlDataReader = cmd.ExecuteReader()
        While rd.Read()
            exam.exam_id = Convert.ToInt32(rd(0))
            exam.year = rd(1).ToString()
            exam.term = Convert.ToInt32(rd(2))
            exam.subject_id = Convert.ToInt32(rd(3))
            exam.exam_start_time = Convert.ToDateTime(rd(4))
            exam.exam_end_time = Convert.ToDateTime(rd(5))
            If IsDBNull(rd(6)) Then
                exam.kr_value = 0
            Else
                exam.kr_value = Convert.ToSingle(rd(6))
            End If
            exam.exam_gain = Convert.ToInt16(rd(7))
            exam.subject_name = rd(8).ToString()
        End While
        con.Close()
        Return exam
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
            Dim t As New TopicNC
            t.topic_id = Convert.ToInt32(rd(0))
            t.topic_name = rd(1).ToString()
            t.subject_id = Convert.ToInt32(rd(2))
            ListOfTopic.Add(t)
        End While
        con.Close()
        Return ListOfTopic
    End Function

    <WebMethod> Public Shared Function getExaminee(ByVal ex_id As Integer) As List(Of Student)
        Dim cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
        Dim con As New SqlConnection(cs)
        Dim ListOfStudent As New List(Of Student)
        con.Close()
        Dim cmd As New SqlCommand("spGetExaminee", con)
        cmd.CommandType = CommandType.StoredProcedure
        cmd.Parameters.AddWithValue("@ex_id", ex_id)
        con.Open()
        Dim rd As SqlDataReader = cmd.ExecuteReader()
        While rd.Read()
            Dim s As New Student
            s.student_id = Convert.ToInt32(rd(0))
            s.student_fname = rd(1).ToString()
            s.student_lname = rd(2).ToString()
            s.student_type = Convert.ToInt32(rd(3))
            s.student_intake = Convert.ToInt32(rd(4))
            s.student_gender = Convert.ToInt32(rd(5))
            s.examinee_passwd = rd(6).ToString()
            s.examinee_check = Convert.ToInt32(rd(7))
            ListOfStudent.Add(s)
        End While
        con.Close()
        Return ListOfStudent
    End Function

    <WebMethod> Public Shared Function addExaminee(ByVal ex_id As Integer, ByVal s_type As Integer, ByVal intake As Integer) As Boolean
        Dim cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
        Dim con As New SqlConnection(cs)
        con.Close()
        Dim ck As Boolean = 1
        Dim cmd As New SqlCommand("select COUNT(student_id) from student where student_type = @s_type and student_intake = @intake", con)
        cmd.Parameters.AddWithValue("@s_type", s_type)
        cmd.Parameters.AddWithValue("@intake", intake)
        con.Open()
        If cmd.ExecuteScalar() = 0 Then
            con.Close()
            ck = 0
        Else
            con.Close()
            cmd.CommandText = "spAddExaminee"
            cmd.CommandType = CommandType.StoredProcedure
            cmd.Parameters.AddWithValue("@ex_id", ex_id)
            con.Open()
            cmd.ExecuteNonQuery()
            con.Close()
        End If
        Return ck
    End Function

    <WebMethod> Public Shared Function addExamineeById(ByVal ex_id As Integer, ByVal s_type As Integer, ByVal intake As Integer) As Boolean
        Dim cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
        Dim con As New SqlConnection(cs)
        con.Close()
        Dim ck As Boolean = 1
        Dim cmd As New SqlCommand("select COUNT(student_id) from student where student_type = @s_type and student_id = @stu_id", con)
        cmd.Parameters.AddWithValue("@s_type", s_type)
        cmd.Parameters.AddWithValue("@stu_id", intake)
        con.Open()
        If cmd.ExecuteScalar() = 0 Then
            con.Close()
            ck = 0
        Else
            con.Close()
            cmd.CommandText = "spAddExamineeById"
            cmd.CommandType = CommandType.StoredProcedure
            cmd.Parameters.AddWithValue("@ex_id", ex_id)
            con.Open()
            cmd.ExecuteNonQuery()
            con.Close()
        End If
        Return ck
    End Function

    <WebMethod> Public Shared Sub delAllExaminee(ByVal ex_id As Integer)
        Dim cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
        Dim con As New SqlConnection(cs)
        con.Close()
        Dim cmd As New SqlCommand("delete from examinee where exam_id = @ex_id", con)
        cmd.Parameters.AddWithValue("@ex_id", ex_id)
        con.Open()
        cmd.ExecuteNonQuery()
        con.Close()
    End Sub

    <WebMethod> Public Shared Sub delExaminee(ByVal stu_id As Integer, ByVal ex_id As Integer)
        Dim cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
        Dim con As New SqlConnection(cs)
        con.Close()
        Dim cmd As New SqlCommand("delete from examinee where student_id = @stu_id and exam_id = @ex_id", con)
        cmd.Parameters.AddWithValue("@stu_id", stu_id)
        cmd.Parameters.AddWithValue("@ex_id", ex_id)
        con.Open()
        cmd.ExecuteNonQuery()
        con.Close()
    End Sub

    <WebMethod> Public Shared Function getQuestion(ByVal ex_id As Integer, ByVal ex_copy As Integer, ByVal tid As Integer, ByVal at As Integer) As List(Of Question)
        Dim cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
        Dim con As New SqlConnection(cs)
        con.Close()
        Dim ListOfQuestion As New List(Of Question)
        Dim cmd As New SqlCommand("spGetQuestion", con)
        cmd.CommandType = CommandType.StoredProcedure
        cmd.Parameters.AddWithValue("@ex_id", ex_id)
        cmd.Parameters.AddWithValue("@ex_copy", ex_copy)
        cmd.Parameters.AddWithValue("@tid", tid)
        cmd.Parameters.AddWithValue("@at", at)
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

    <WebMethod> Public Shared Sub addQuestion(ByVal ex_id As Integer, ByVal ex_copy As Integer, ByVal qid As Integer)
        Dim cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
        Dim con As New SqlConnection(cs)
        con.Close()
        Dim cmd As New SqlCommand("insert into exam_detail values(@ex_id,@ex_copy,@qid)", con)
        cmd.Parameters.AddWithValue("@ex_id", ex_id)
        cmd.Parameters.AddWithValue("@ex_copy", ex_copy)
        cmd.Parameters.AddWithValue("@qid", qid)
        con.Open()
        cmd.ExecuteNonQuery()
        con.Close()
    End Sub

    <WebMethod> Public Shared Function getQuestionInExam(ByVal ex_id As Integer, ByVal ex_copy As Integer, ByVal tid As Integer, ByVal at As Integer) As List(Of Question)
        Dim cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
        Dim con As New SqlConnection(cs)
        con.Close()
        Dim ListOfQuestion As New List(Of Question)
        Dim cmd As New SqlCommand("spGetQuestInExam", con)
        cmd.CommandType = CommandType.StoredProcedure
        cmd.Parameters.AddWithValue("@ex_id", ex_id)
        cmd.Parameters.AddWithValue("@ex_copy", ex_copy)
        cmd.Parameters.AddWithValue("@tid", tid)
        cmd.Parameters.AddWithValue("@at", at)
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
            If Not IsDBNull(rd(13)) And Not IsDBNull(rd(14)) Then
                q.p_value = Convert.ToSingle(rd(13))
                q.r_value = Convert.ToSingle(rd(14))
            End If
            q.exam_detail_id = Convert.ToInt32(rd(15))
            ListOfQuestion.Add(q)
        End While
        con.Close()
        Return ListOfQuestion
    End Function

    <WebMethod> Public Shared Sub delQuestionInExam(ByVal ex_d_id As Integer)
        Dim cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
        Dim con As New SqlConnection(cs)
        con.Close()
        Dim cmd As New SqlCommand("delete from exam_detail where exam_detail_id = @ex_d_id", con)
        cmd.Parameters.AddWithValue("@ex_d_id", ex_d_id)
        con.Open()
        cmd.ExecuteNonQuery()
    End Sub

    <WebMethod> Public Shared Sub delCopy(ByVal ex_id As Integer, ByVal ex_copy As Integer)
        Dim cs As String = ConfigurationManager.ConnectionStrings("con").ConnectionString
        Dim con As New SqlConnection(cs)
        con.Close()
        Dim cmd As New SqlCommand("delete from exam_detail where exam_id = @ex_id and exam_copy = @ex_copy", con)
        cmd.Parameters.AddWithValue("@ex_id", ex_id)
        cmd.Parameters.AddWithValue("@ex_copy", ex_copy)
        con.Open()
        cmd.ExecuteNonQuery()
    End Sub
End Class
