function calculateMedianGrade(grades: number[]): number {
  if (grades.length === 0) return 0;
  const sortedGrades = [...grades].sort((a, b) => a - b);
  const middle = Math.floor(sortedGrades.length / 2);
  return sortedGrades.length % 2 === 0
      ? (sortedGrades[middle - 1] + sortedGrades[middle]) / 2
      : sortedGrades[middle];
}

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

  getMedianGrade(): number {
      return calculateMedianGrade(this.grades);
  }

  static getStudentCount(): number {
      return Student.studentCount;
  }

  getGrades(): number[] {
      return [...this.grades];
  }
}

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

class Database<T> {
  private entries: T[] = [];

  addEntry(entry: T): void {
      this.entries.push(entry);
  }

  getEntries(): T[] {
      return [...this.entries];
  }
}

function createGradeMultiplier(multiplier: number): (grade: number) => number {
  return (grade: number) => Math.min(grade * multiplier, 100);
}

const doubleGrade = createGradeMultiplier(2);

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

async function runEducationSystem() {
  console.log("=== Educational System Demo ===\n");

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

  console.log("2. Median Grade Calculation:");
  console.log(`Student 1 Median Grade: ${student1.getMedianGrade()}`);
  console.log(`Student 2 Median Grade: ${student2.getMedianGrade()}\n`);

  console.log("3. Database Operations:");
  const studentDB = new Database<Student>();
  studentDB.addEntry(student1);
  studentDB.addEntry(student2);
  studentDB.addEntry(gradStudent);
  console.log(`Total students in database: ${studentDB.getEntries().length}\n`);

  console.log("4. Teacher Information:");
  const teacher: Teacher = {
      name: "Dr. Sarah Parker",
      subject: "Computer Science",
      students: studentDB.getEntries()
  };
  console.log(getTeacherInfo(teacher));

  console.log("5. Grade Manipulation:");
  const originalGrade = 45;
  console.log(`Original Grade: ${originalGrade}`);
  console.log(`Doubled Grade: ${doubleGrade(originalGrade)}\n`);

  console.log("6. Student Analytics:");
  const analytics = analyzeStudents(studentDB.getEntries());
  console.log(`High Performers: ${analytics.studentNames.join(", ")}`);
  console.log(`Total Number of Grades: ${analytics.totalGrades}\n`);

  console.log("7. Data Parsing:");
  const jsonStr = '{"name": "David Wilson", "age": 22}';
  const parsedStudent = parseStudentData(jsonStr);
  console.log("Parsed Student Data:", parsedStudent instanceof Student ? 
      `Name: ${parsedStudent.name}, Age: ${parsedStudent.age}` : 
      parsedStudent);

  console.log("\n8. Async Data Fetching:");
  const fetchedData = await fetchStudentData();
  console.log("Fetched Student Data:", fetchedData);

  console.log("\n9. Total Student Count:");
  console.log(`Total number of students created: ${Student.getStudentCount()}`);
}

console.log("Starting Educational System...\n");
runEducationSystem().then(() => {
  console.log("\nEducational System Demo Completed!");
}).catch(error => {
  console.error("Error running educational system:", error);
});