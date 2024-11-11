import StudentDetailsComponent from "@/components/Admin/Dashboard/ViewStudent/StudentDetails/StudentDetails";

export default async function StudentDetailsPage({params}) {
  const { studentId } = await params;

  

  return <StudentDetailsComponent userId={studentId}/>;
}
