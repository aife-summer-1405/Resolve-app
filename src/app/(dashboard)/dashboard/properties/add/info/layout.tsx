import AddPropertyFormProvider from "@/src/providers/AddPropertyFormProvider";

export default function AddPropertyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AddPropertyFormProvider>{children}</AddPropertyFormProvider>;
}