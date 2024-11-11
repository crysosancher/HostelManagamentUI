"use client";
import { usePathname } from "next/navigation";
import { IoHomeOutline, IoHomeSharp } from "react-icons/io5";
import { BiFoodMenu, BiSolidFoodMenu } from "react-icons/bi";
import { MdOutlineBedroomChild, MdBedroomChild } from "react-icons/md";
import { FaRegUserCircle, FaUserCircle } from "react-icons/fa";
import profileimage from "/public/test/images.jpeg"
import styles from "./Header.module.css";
import Link from "next/link";

export default function Header() {
  const pathname = usePathname();
  const isFoodMenuActive = pathname === "/admin/food-menu";
  const isRoomMenuActive = pathname === "/admin/manage-room";
  const isProfileMenuActive = pathname === "/admin/profile"
  const isAdminDashboardActive = pathname.startsWith("/admin/dashboard");

  return (
    <header className={styles.headerContainer}>
      <div  className={styles.header}>
        <div className={styles.profile}>
          <div className={styles.profilePhoto}>
            <img src={profileimage.src} alt="user-image" />
          </div>
          <p>Welcome Admin</p>
        </div>
      </div>
      
      <nav className={styles.sideBar}>
        <h1>Hostel</h1>
        <div className={styles.navigation}>
          <div>
            <Link href="/admin/dashboard/overview">
              <div
                className={`${styles.menuOption} ${
                  isAdminDashboardActive
                    ? `${styles.active} ${styles.home}`
                    : ""
                }`}
              >
                {isAdminDashboardActive ? <IoHomeSharp /> : <IoHomeOutline />}{" "}
                Home
              </div>
            </Link>

            {isAdminDashboardActive && (
              <ul className={styles.dropdown}>
                <li>
                  <Link
                    href="/admin/dashboard/overview"
                    className={`block ${
                      pathname === "/admin/dashboard/overview"
                        ? styles.active
                        : styles.dropdownOption
                    }`}
                  >
                    Overview
                  </Link>
                </li>

                <li>
                  <Link
                    href="/admin/dashboard/view-student"
                    
                    className={`block ${
                      pathname === "/admin/dashboard/view-student"
                        ? styles.active
                        : styles.dropdownOption
                    }`}
                  >
                    View Student
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/dashboard/manage-student"
                    
                    className={`block ${
                      pathname === "/admin/dashboard/manage-student"
                        ? styles.active
                        : styles.dropdownOption
                    }`}
                  >
                    Manage Student
                  </Link>
                </li>
              </ul>
            )}
          </div>

          <Link
            href="/admin/food-menu"
            className={`${styles.menuOption} ${
              isFoodMenuActive ? `${styles.active} ${styles.food}` : ""
            }`}
          >
            {isFoodMenuActive ? <BiSolidFoodMenu /> : <BiFoodMenu />} Food Menu
          </Link>

          <Link href="/admin/manage-room"
          className={`${styles.menuOption} ${isRoomMenuActive ? `${styles.active} ${styles.food}` : ""
          }`}
          >
            {isRoomMenuActive ?   <MdBedroomChild/> : <MdOutlineBedroomChild/>} Rooms
          </Link>

          <Link href="/admin/profile"
          className={`${styles.menuOption} ${isProfileMenuActive ? `${styles.active}` : ""
          }`}
          >
            {isProfileMenuActive ? <FaUserCircle/> : <FaRegUserCircle/>} Profile
          </Link>
        </div>
      </nav>
    </header>
  );
}
