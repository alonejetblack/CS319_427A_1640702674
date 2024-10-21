# CS319_427A_1640702674
สำหรับส่งอาจารย์

```yaml
```
index.ts
ไฟล์นี้เป็นจุดเริ่มต้นหลักของโปรแกรม โดยจะทำการ import ฟังก์ชันจาก studentUtils.ts และทำการประมวลผลข้อมูลหรือตัวจัดการ flow ของโปรแกรม

จุดสำคัญ:

นำเข้า utilities จาก studentUtils.ts: ฟังก์ชันหลักที่ใช้ในการจัดการข้อมูลนักเรียน
จัดการ input/output: ไฟล์นี้ทำหน้าที่ในการรับข้อมูลนักเรียนหรือข้อมูลอื่น ๆ และส่งต่อไปยังฟังก์ชันใน studentUtils.ts เพื่อทำการประมวลผล
```yaml
import { getStudentInfo, calculateAverage } from './studentUtils';

// ตัวอย่างการใช้ฟังก์ชันที่นำเข้ามา
const student = getStudentInfo(1); // ดึงข้อมูลนักเรียนที่มี ID เท่ากับ 1
const average = calculateAverage([85, 90, 78]); // คำนวณค่าเฉลี่ยคะแนน

```
studentUtils.ts
ไฟล์นี้ประกอบด้วยฟังก์ชันช่วยเหลือต่าง ๆ ที่ออกแบบมาเพื่อจัดการข้อมูลนักเรียน เช่น การดึงข้อมูลนักเรียน และการคำนวณค่าเฉลี่ย

จุดสำคัญ:

getStudentInfo(studentId: number): คืนค่าข้อมูลรายละเอียดของนักเรียนตาม ID ที่ระบุ
calculateAverage(scores: number[]): คำนวณค่าเฉลี่ยคะแนนจากข้อมูลที่เป็นอาร์เรย์ของคะแนน
```yaml
export function getStudentInfo(studentId: number): Student {
    // ตรรกะในการดึงข้อมูลนักเรียน
}

export function calculateAverage(scores: number[]): number {
    // ตรรกะในการคำนวณค่าเฉลี่ยจากคะแนน
}

```
ตัวอย่างฟังก์ชัน:
getStudentInfo(studentId: number):

รับ studentId เป็น input และคืนค่าข้อมูลนักเรียนในรูปแบบของวัตถุ (เช่น ชื่อ, อายุ, คะแนน)
calculateAverage(scores: number[]):

รับอาร์เรย์ของคะแนนเป็น input และคืนค่าค่าเฉลี่ยของคะแนนเหล่านั้น
วิธีการใช้งาน
ปรับแต่งไฟล์ index.ts เพื่อระบุ student ID หรือคะแนนที่ต้องการประมวลผล
รันโปรแกรมเพื่อดูผลลัพธ์จากการใช้ฟังก์ชันที่อยู่ใน studentUtils.ts
