# CS319_427A_1640702674
สำหรับส่งอาจารย์

เทคนิคและวิธีการแก้ปัญหาในการพัฒนาระบบการศึกษา
1. การออกแบบคลาสและการสืบทอด (Classes and Inheritance)
เทคนิคที่ใช้:

Encapsulation (การห่อหุ้ม)
```yaml
class Student {
    private static studentCount: number = 0;
    protected grades: number[] = [];
    // ...
}
```
ใช้ private สำหรับข้อมูลที่ต้องการปกปิดภายในคลาส
ใช้ protected สำหรับข้อมูลที่ต้องการให้คลาสลูกเข้าถึงได้
ใช้ getter/setter เพื่อควบคุมการเข้าถึงข้อมูล


Inheritance (การสืบทอด)
```yaml
class GraduateStudent extends Student {
    override getAverageGrade(): number {
        const baseAverage = super.getAverageGrade();
        return this.thesisTopic.toLowerCase().includes('artificial intelligence') 
            ? Math.min(baseAverage + 5, 100)
            : baseAverage;
    }
}
```
ใช้ extends เพื่อสืบทอดคุณสมบัติจากคลาสแม่
ใช้ override เพื่อเขียนทับเมธอดจากคลาสแม่
ใช้ super เพื่อเรียกใช้เมธอดของคลาสแม่

2. การจัดการข้อมูล (Data Management)
เทคนิคที่ใช้:

1.Generic Types
```yaml
class Database<T> {
    private entries: T[] = [];
    addEntry(entry: T): void {
        this.entries.push(entry);
    }
}
```
ใช้ Generic <T> เพื่อให้คลาสสามารถทำงานกับข้อมูลได้หลายประเภท
รักษา Type Safety ในการจัดการข้อมูล


2.Interface Design
```yaml
interface Teacher {
    name: string;
    subject: string;
    students: Student[];
}
```
สร้าง Interface เพื่อกำหนดโครงสร้างข้อมูล
ใช้ Type Checking เพื่อป้องกันข้อผิดพลาด

3. การจัดการ Asynchronous Operations
เทคนิคที่ใช้:
```yaml
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
```
```yaml

```
```yaml

```
