import { PropsWithChildren } from "react";
import AppBar from "../AppBar";

interface LayoutProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  hideHeader?: boolean;
}

const Layout: React.FC<PropsWithChildren<LayoutProps>> = ({
  children,
  header,
  footer,
  hideHeader,
}) => {
  return (
    <div className="h-screen w-screen bg-background flex flex-col pt-16">
      {header ? header : hideHeader ? <></> : <AppBar />}
      <div className="px-4">{children}</div>
      <div className="fixed bottom-0 left-0 w-screen">{footer}</div>
    </div>
  );
};

export default Layout;
