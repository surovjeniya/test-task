import Head from "next/head";
import { LayoutProps } from "./Layout.props";
import styles from "./Layout.module.scss";
import { Header } from "./header/Header";

export const Layout = ({ children, title }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main className={styles.main}>
        <Header />
        {children}
      </main>
    </>
  );
};
