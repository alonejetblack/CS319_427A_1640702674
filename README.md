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

Generic Types
```yaml

```
