"use client";
import { usePathname } from "next/navigation";
import { IoHomeOutline, IoHomeSharp } from "react-icons/io5";
import { BiFoodMenu, BiSolidFoodMenu } from "react-icons/bi";
import styles from "./Header.module.css";
import Link from "next/link";

export default function Header() {
    const pathname = usePathname();
    const isFoodMenuActive = pathname === "/admin/food-menu";
    const isAdminDashboardActive = pathname.startsWith("/admin/dashboard");

    return (
        <header className={styles.header}>
            <nav className={styles.sideBar}>
                <h1>Hostel</h1>
                <div className={styles.navigation}>
                    <div>
                        <Link href="/admin/dashboard/overview">
                            <div
                                className={`${styles.menuOption} ${isAdminDashboardActive ? `${styles.active} ${styles.home}` : ""}`}
                            >
                                {isAdminDashboardActive ? <IoHomeSharp /> : <IoHomeOutline />} Home
                            </div>
                        </Link>

                        {isAdminDashboardActive && (
                            <ul className={styles.dropdown}>
                                <Link href="/admin/dashboard/overview" passHref>
                                    <li className={pathname === "/admin/dashboard/overview" ? styles.active : styles.dropdownOption}>
                                        Overview
                                    </li>
                                </Link>
                                <Link href="/admin/dashboard/add-student" passHref>
                                    <li className={pathname === "/admin/dashboard/add-student" ? styles.active : styles.dropdownOption}>
                                        Add Student
                                    </li>
                                </Link>
                                <Link href="/admin/dashboard/view-student" passHref>
                                    <li className={pathname === "/admin/dashboard/view-student" ? styles.active : styles.dropdownOption}>
                                        View Student
                                    </li>
                                </Link>
                                <Link href="/admin/dashboard/manage-student" passHref>
                                    <li className={pathname === "/admin/dashboard/manage-student" ? styles.active : styles.dropdownOption}>
                                        Update/Remove Student
                                    </li>
                                </Link>
                            </ul>
                        )}
                    </div>

                    <Link href="/admin/food-menu">
                        <div className={`${styles.menuOption} ${isFoodMenuActive ? `${styles.active} ${styles.food}` : ""}`}>
                            {isFoodMenuActive ? <BiSolidFoodMenu /> : <BiFoodMenu />} Food Menu
                        </div>
                    </Link>
                </div>
            </nav>
        </header>
    );
}
