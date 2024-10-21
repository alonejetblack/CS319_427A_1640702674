// 1. Student Class Implementation
class Student {
    private static studentCount: number = 0;
    protected grades: number[] = [];

    constructor(
        public name: string,
        public age: number
    ) {
        Student.studentCount++;
    }

    addGrade(grade: number): void {
        if (grade < 0 || grade > 100) {
            throw new Error("Grade must be between 0 and 100");
        }
        this.grades.push(grade);
    }

    getAverageGrade(): number {
        if (this.grades.length === 0) return 0;
        return this.grades.reduce((sum, grade) => sum + grade, 0) / this.grades.length;
    }

    static getStudentCount(): number {
        return Student.studentCount;
    }

    getGrades(): number[] {
        return [...this.grades];
    }
}

// 2. GraduateStudent Class
class GraduateStudent extends Student {
    constructor(
        name: string,
        age: number,
        public thesisTopic: string
    ) {
        super(name, age);
    }

    override getAverageGrade(): number {
        const baseAverage = super.getAverageGrade();
        return this.thesisTopic.toLowerCase().includes('artificial intelligence') 
            ? Math.min(baseAverage + 5, 100)
            : baseAverage;
    }
}

// 3. Teacher Interface
interface Teacher {
    name: string;
    subject: string;
    students: Student[];
}

function getTeacherInfo(teacher: Teacher): string {
    return `
    Teacher Information:
    Name: ${teacher.name}
    Subject: ${teacher.subject}
    Number of Students: ${teacher.students.length}
    `;
}

// 4. Database Implementation
class Database<T> {
    private entries: T[] = [];

    addEntry(entry: T): void {
        this.entries.push(entry);
    }

    getEntries(): T[] {
        return [...this.entries];
    }
}

// 5. Grade Multiplier
function createGradeMultiplier(multiplier: number): (grade: number) => number {
    return (grade: number) => Math.min(grade * multiplier, 100);
}

const doubleGrade = createGradeMultiplier(2);

// 6. Async Data Fetching
interface StudentData {
    name: string;
    grades: number[];
}

async function fetchStudentData(): Promise<StudentData> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                name: "John Doe",
                grades: [85, 92, 78]
            });
        }, 1000);
    });
}

// 7. Student Analytics
function analyzeStudents(students: Student[]) {
    const highPerformers = students.filter(student => 
        student.getAverageGrade() > 70
    );

    const studentNames = students.map(student => student.name);
    const totalGrades = students.reduce((total, student) => 
        total + student.getGrades().length, 0
    );

    return { highPerformers, studentNames, totalGrades };
}

// 8. Data Parsing
function parseStudentData(jsonData: string): Student | string {
    try {
        const data = JSON.parse(jsonData) as {name: string; age: number};
        return new Student(data.name, data.age);
    } catch (error) {
        if (error instanceof Error) {
            return `Error parsing student data: ${error.message}`;
        }
        return "Unknown error occurred";
    }
}

// 9. Example Usage and Testing
async function runEducationSystem() {
    console.log("=== Educational System Demo ===\n");

    // Create Students
    console.log("1. Creating Students:");
    const student1 = new Student("Alice Smith", 20);
    student1.addGrade(85);
    student1.addGrade(92);
    student1.addGrade(78);

    const student2 = new Student("Bob Johnson", 21);
    student2.addGrade(75);
    student2.addGrade(88);

    const gradStudent = new GraduateStudent(
        "Carol Williams", 
        25, 
        "Artificial Intelligence in Education"
    );
    gradStudent.addGrade(90);
    gradStudent.addGrade(95);

    console.log(`Student 1: ${student1.name}, Average Grade: ${student1.getAverageGrade()}`);
    console.log(`Student 2: ${student2.name}, Average Grade: ${student2.getAverageGrade()}`);
    console.log(`Grad Student: ${gradStudent.name}, Average Grade: ${gradStudent.getAverageGrade()} (with AI bonus)\n`);

    // Database Operations
    console.log("2. Database Operations:");
    const studentDB = new Database<Student>();
    studentDB.addEntry(student1);
    studentDB.addEntry(student2);
    studentDB.addEntry(gradStudent);
    console.log(`Total students in database: ${studentDB.getEntries().length}\n`);

    // Teacher Information
    console.log("3. Teacher Information:");
    const teacher: Teacher = {
        name: "Dr. Sarah Parker",
        subject: "Computer Science",
        students: studentDB.getEntries()
    };
    console.log(getTeacherInfo(teacher));

    // Grade Manipulation
    console.log("4. Grade Manipulation:");
    const originalGrade = 45;
    console.log(`Original Grade: ${originalGrade}`);
    console.log(`Doubled Grade: ${doubleGrade(originalGrade)}\n`);

    // Student Analytics
    console.log("5. Student Analytics:");
    const analytics = analyzeStudents(studentDB.getEntries());
    console.log(`High Performers: ${analytics.studentNames.join(", ")}`);
    console.log(`Total Number of Grades: ${analytics.totalGrades}\n`);

    // Data Parsing
    console.log("6. Data Parsing:");
    const jsonStr = '{"name": "David Wilson", "age": 22}';
    const parsedStudent = parseStudentData(jsonStr);
    console.log("Parsed Student Data:", parsedStudent instanceof Student ? 
        `Name: ${parsedStudent.name}, Age: ${parsedStudent.age}` : 
        parsedStudent);

    // Async Data Fetching
    console.log("\n7. Async Data Fetching:");
    const fetchedData = await fetchStudentData();
    console.log("Fetched Student Data:", fetchedData);

    // Static Student Count
    console.log("\n8. Total Student Count:");
    console.log(`Total number of students created: ${Student.getStudentCount()}`);
}

// Run the system
console.log("Starting Educational System...\n");
runEducationSystem().then(() => {
    console.log("\nEducational System Demo Completed!");
}).catch(error => {
    console.error("Error running educational system:", error);
});
