import styles from "./Notdfound.module.css";
import Link from "next/link";

export default function NotFoundComponent() {
  return (
    <main>
      <section>
      <div className={styles.container}>
      <div className={styles.gif}>
        <img src="https://i.postimg.cc/2yrFyxKv/giphy.gif" alt="gif_ing" />
      </div>
      <div className={styles.content}>
        <h1 className={styles.mainHeading}>This page is gone.</h1>
        <p className={styles.paragraph}>
          ...maybe the page you're looking for is not found or never existed.
        </p>
        
        <Link href="/admin/dashboard/overview">
          <button className={styles.button}>Back to home <i className="far fa-hand-point-right"></i></button>
        </Link>
      </div>
    </div>
      </section>

    </main>
  );
}
