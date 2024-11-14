import StudentDetailsComponent from "@/components/Admin/Dashboard/ManageStudent/StudentDetails/StudentDetails";

export default async function StudentDetailsPage({params}) {
  const { studentId } = await params;

  

  return <StudentDetailsComponent userId={studentId}/>;
}
