// Part 1: Class and Object-Oriented Programming
class Student {
  private static numberOfStudents: number = 0;
  public grades: number[] = []; // Changed to public for demonstration

  constructor(public name: string, public age: number) {
      Student.numberOfStudents++;
  }

  addGrade(grade: number): void {
      if (grade >= 0 && grade <= 100) {
          this.grades.push(grade);
      } else {
          throw new Error("Grade must be between 0 and 100");
      }
  }

  getAverageGrade(): number {
      if (this.grades.length === 0) return 0;
      return this.grades.reduce((sum, grade) => sum + grade, 0) / this.grades.length;
  }

  static totalStudents(): number {
      return Student.numberOfStudents;
  }
}

// Part 2: Inheritance and Polymorphism
class GraduateStudent extends Student {
  constructor(name: string, age: number, public thesisTopic: string) {
      super(name, age);
  }

  override getAverageGrade(): number {
      const baseAverage = super.getAverageGrade();
      return this.thesisTopic.toLowerCase() === "artificial intelligence" 
          ? baseAverage + 5 
          : baseAverage;
  }
}

// Part 3: Type Annotations and Interfaces
interface Teacher {
  name: string;
  subject: string;
  students: Student[];
}

function getTeacherInfo(teacher: Teacher): string {
  return `${teacher.name} teaches ${teacher.subject} to ${teacher.students.length} students`;
}

// Part 4: Generics
class Database<T> {
  private entries: T[] = [];

  addEntry(entry: T): void {
      this.entries.push(entry);
  }

  getEntries(): T[] {
      return [...this.entries];
  }
}

// Part 5: Functions and Higher-Order Functions
function createGradeMultiplier(multiplier: number) {
  return (grade: number) => grade * multiplier;
}

const doubleGrade = createGradeMultiplier(2);

// Part 6: Asynchronous Programming
async function fetchStudentData(id: string): Promise<Student> {
  try {
      // Simulate API call
      const response = await new Promise<{name: string, age: number}>((resolve) => {
          setTimeout(() => {
              resolve({ name: "John Doe", age: 20 });
          }, 1000);
      });

      const student = new Student(response.name, response.age);
      console.log("Student data fetched successfully");
      return student;
  } catch (error) {
      console.error("Error fetching student data:", error);
      throw error;
  }
}

// Part 7: Array Methods
function getHighPerformingStudents(students: Student[]): Student[] {
  return students.filter(student => student.getAverageGrade() > 70);
}

function getStudentNames(students: Student[]): string[] {
  return students.map(student => student.name);
}

function getTotalGrades(students: Student[]): number {
  return students.reduce((total, student) => total + student.grades.length, 0);
}

// Part 8: Error Handling
function parseStudentData(jsonData: string): Student {
  try {
      const data = JSON.parse(jsonData);
      if (!data.name || !data.age) {
          throw new Error("Invalid student data format");
      }
      return new Student(data.name, data.age);
  } catch (error) {
      if (error instanceof SyntaxError) {
          throw new Error("Invalid JSON format: Please check the data structure");
      }
      throw error;
  }
}

// Part 9: Modules and Exports
export function calculateMedianGrade(grades: number[]): number {
  if (grades.length === 0) return 0;
  
  const sortedGrades = [...grades].sort((a, b) => a - b);
  const mid = Math.floor(sortedGrades.length / 2);
  
  if (sortedGrades.length % 2 === 0) {
      return (sortedGrades[mid - 1] + sortedGrades[mid]) / 2;
  }
  return sortedGrades[mid];
}

// Usage examples to remove all warnings
async function main() {
  // Create students
  const student1 = new Student("Alice", 20);
  student1.addGrade(85);
  student1.addGrade(90);

  const student2 = new Student("Bob", 21);
  student2.addGrade(75);
  student2.addGrade(80);

  // Create graduate student
  const gradStudent = new GraduateStudent("Carol", 25, "Artificial Intelligence");
  gradStudent.addGrade(88);
  gradStudent.addGrade(92);

  // Create teacher
  const teacher: Teacher = {
      name: "Dr. Smith",
      subject: "Computer Science",
      students: [student1, student2, gradStudent]
  };

  // Use teacher info
  console.log(getTeacherInfo(teacher));

  // Use database
  const studentDB = new Database<Student>();
  studentDB.addEntry(student1);
  studentDB.addEntry(student2);
  console.log(studentDB.getEntries());

  // Use grade multiplier
  console.log(doubleGrade(85));

  // Use async function
  const fetchedStudent = await fetchStudentData("123");
  console.log(fetchedStudent);

  // Use array methods
  const allStudents = [student1, student2, gradStudent];
  console.log(getHighPerformingStudents(allStudents));
  console.log(getStudentNames(allStudents));
  console.log(getTotalGrades(allStudents));

  // Use parse function
  const jsonData = '{"name": "Eve", "age": 22}';
  const parsedStudent = parseStudentData(jsonData);
  console.log(parsedStudent);

  // Use median calculation
  console.log(calculateMedianGrade([85, 90, 75, 80, 88, 92]));
}

// Run the main function
main().catch(console.error);