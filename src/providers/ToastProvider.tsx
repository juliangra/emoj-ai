import { Toaster } from "sonner";

interface ToastProviderProps {
  children?: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}
      <Toaster
        richColors
        expand
        closeButton
        toastOptions={{
          style: {
            paddingLeft: "1rem",
          },
        }}
      />
    </>
  );
}
