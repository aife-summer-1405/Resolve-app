import AddPropertyFormProvider from "@/src/providers/AddPropertyFormProvider";
import AddPropertyWizard from "@/src/components/organisms/DashboardSeller/properties/add/AddPropertyWizard";

export default async function AddPropertyPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const { edit } = await searchParams;

  return (
    <AddPropertyFormProvider key={edit ?? "new"} editId={edit ?? null}>
      <AddPropertyWizard />
    </AddPropertyFormProvider>
  );
}