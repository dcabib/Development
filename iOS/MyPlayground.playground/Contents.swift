struct Student
{
    var firstName: String
    var lastName: String
    var grade: Double
}

struct Classroom
{
    var className: String
    var students: [Student]
    
    func highestGrade () -> Double
    {
        var highGrade: Double = 0
        
        for student in self.students
        {
            if student.grade > highGrade
            {
                highGrade = student.grade
                print ("Passei")
            }
        }
        return highGrade
    }
}

let st1 = Student (firstName: "Daniel", lastName: "Abib", grade: 40)
let st2 = Student (firstName: "Amanda", lastName: "Moraes", grade: 80)

let classR = Classroom (className: "Matematica", students: [st1, st2])
print (classR.highestGrade())

