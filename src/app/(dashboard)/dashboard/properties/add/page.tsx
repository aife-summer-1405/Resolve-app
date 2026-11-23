import { Suspense } from "react";
import AddPropertyFormProvider from "@/src/providers/AddPropertyFormProvider";
import AddPropertyWizard from "@/src/components/organisms/DashboardSeller/properties/add/AddPropertyWizard";

interface IPageProps {
  searchParams: Promise<{ edit?: string }>;
}

export default function AddPropertyPage({ searchParams }: IPageProps) {
  return (
    <Suspense fallback={<div className="mt-5">در حال بارگذاری فرم...</div>}>
      <AddPropertyContent searchParams={searchParams} />
    </Suspense>
  );
}

async function AddPropertyContent({ searchParams }: IPageProps) {
  const { edit } = await searchParams;

  return (
    <AddPropertyFormProvider key={edit ?? "new"} editId={edit ?? null}>
      <AddPropertyWizard />
    </AddPropertyFormProvider>
  );
}