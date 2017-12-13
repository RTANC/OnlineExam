Imports System.Globalization
Imports Microsoft.VisualBasic

Public Class ConV
    Public Sub HexStrToByteArr(ByVal hexStr As String, ByRef buff() As Byte)
        Dim i As Integer = 0
        For counter As Integer = 0 To hexStr.Length - 1 Step 2
            buff(i) = Byte.Parse(hexStr.Substring(counter, 2), NumberStyles.HexNumber)
            i += 1
        Next
    End Sub
End Class
