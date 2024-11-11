"use client";
import { useState } from "react";
import { FormPopUp } from "@/components/Elements/FormPopUp/FormPopUp";
import styles from "./Overview.module.css";
import Link from "next/link";

export default function OverviewComponent() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [roomType, setRoomType] = useState("");

  const handleOpenModal = (type) => {
    setRoomType(type);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setRoomType("");
  };

  return (
    <main>
      <section className={styles.overviewContainer}>
        {[
          "Delux Room",
          "Two Sharing Room",
          "Three Sharing Room",
          "Four Sharing Room",
          "Five Sharing Room",
          "Six Sharing Room",
        ].map((type) => (
          <div key={type} className={styles.roomsInfomationContainer}>
            <h2>{type}</h2>
            <div className={styles.roomInformation}>
              <div className={styles.availabeRooms}>
                <p>
                  Available Rooms: <span>555</span>
                </p>
              </div>
              <div className={styles.manageRooms}>
                <button onClick={() => handleOpenModal(type)}>
                  Add Student
                </button>
                <Link href="/admin/dashboard/view-student">
                  <button>View Student</button>
                </Link>
                <Link href="/admin/dashboard/manage-student">
                  <button>Update/Remove Student</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>

      <FormPopUp
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        roomName={roomType}
      />
    </main>
  );
}
