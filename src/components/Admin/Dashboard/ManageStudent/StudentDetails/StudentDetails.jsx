'use client'
import styles from "./StudentDetails.module.css";
import userImage from "/public/DefaultUserImage.png";
import  useFetchUserData  from "@/components/Api/fetchUserData";

export default function StudentDetailsComponent({userId}) {

  const { userData } = useFetchUserData(`user/getbyId${userId}`, "GET");
  const roomTypeMap = {
    "1": "Deluxe Room",
    "2": "Two Sharing Room",
    "3": "Three Sharing Room",
    "4": "Four Sharing Room",
    "5": "Five Sharing Room",
    "6": "Six Sharing Room",
  };

  return (
    <main>
      <section className={styles.studentDetails}>
        <h1>{`<`} back</h1>
        <section className={styles.personalDetails}>
          <h2>Personal Details</h2>
          <div className={styles.personalDetailsContent}>
            <div className={styles.userDetails}>
              <p>
                Name: <span>{userData?.customers[0].user_name}</span>
              </p>
              <p>
                Dob (Date of birth): <span>{userData?.customers[0].dob}</span>
              </p>
              <div className={styles.dataFlex}>
                <p>
                  Mobile No.<span> {userData?.customers[0].mobile}</span>
                </p>
                <p>
                  Emergency No.<span> {userData?.customers[0].emergency_no}</span>
                </p>
                <p>
                  Email ID:<span> {userData?.customers[0].email_id}</span>
                </p>
              </div>
              <div className={styles.dataFlex}>
                <p>
                  Aadhar No.<span> {userData?.customers[0].adhaar}</span>
                </p>

                <p>
                  Pan No.<span> {userData?.customers[0].pan}</span>
                </p>
              </div>
              <p>
                Address<span> {userData?.customers[0].address}</span>
              </p>
              <p>
                Work Address<span> {userData?.customers[0].work_address}</span>
              </p>

              <div className={styles.dataFlex}>
                <p>
                  Start Date<span> {userData?.customers[0].start_date}</span>
                </p>
                <p>
                  End Date<span> {userData?.customers[0].end_date}</span>
                </p>
              </div>
              <div className={styles.dataFlex}>
                <p>
                  Notice Period<span> {userData?.customers[0].notice_ind}</span>
                </p>

                <p>
                  Active<span> {userData?.customers[0].active}</span>
                </p>
              </div>

              <div className={styles.dataFlex}>
                <p>
                  Room No.<span> {userData?.customers[0].room_no}</span>
                </p>
                <p>
                  Room Type<span> {roomTypeMap[userData?.customers[0].room_type]}</span>
                </p>
                <p>
                  Bed No.<span> {userData?.customers[0].bed_no}</span>
                </p>
              </div>

              <p>
                Rent<span> {userData?.customers[0].rent}</span>
              </p>
            </div>
            <div className={styles.userPhoto}>
              <img src={userImage.src} alt="user-image" />
            </div>
            
          </div>

          <h2>Payment Details</h2>
          <div className={styles.personalDetailsContent}>
          <table className={styles.table}>
          <thead className={styles.tableHeading}>
            <tr>
              <th>S. No.</th>
              <th>Month</th>
              <th>Year</th>
              <th>Payment method</th>
              <th>Paid/Unpaid</th>

            </tr>
          </thead>
          <tbody>
            
            {
            /*
            {currentData.map((item) => (
                <td>{item.user_id}</td>
                <tr key={item.user_id}>
                <td>{item.user_name}</td>
                <td>{item.mobile}</td>
                <td>{roomTypeMap[item.room_type]}</td>
                <td>{item.adhaar}</td>
                <td>{item.active}</td>
                <td>{item.room_no}</td>
                <td>{item.bed_no}</td>
                <td>Update</td>
                <td>Remove</td>
                </tr>
            ))}
            */
            }

                <tr >
                <td>1</td>
                <td>April</td>
                <td>2024</td>
                <td>Online</td>
                <td>Paid</td>

              </tr>
          </tbody>
        </table>
          </div>
        </section>
      </section>
    </main>
  );
}
