"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { del, get, set } from "idb-keyval";
import { ChevronLeft } from "lucide-react";

import {
  addPropertyFormSchema,
  type IProperty,
} from "@/src/schemas/properties/propertySchema";
import { STEP_SLUGS, stepHref } from "../components/organisms/DashboardSeller/properties/steps";
import Stepper from "../components/organisms/DashboardSeller/properties/Stepper";

const DRAFT_KEY = "add-property:draft";
const IMAGES_KEY = "add-property:images";

type HouseId = number | string | null;

type Draft = {
  values: Omit<IProperty, "images">;
  progress: number;
  houseId: HouseId;
};

const getDefaultValues = (): IProperty => ({
  title: "",
  address: "",
  rate: 0,
  price: 0,
  tags: [],
  last_updated: new Date().toISOString(),
  capacity: 0,
  location: { lat: 0, lng: 0 },
  categories: { name: "" },
  bathrooms: 0,
  parking: 0,
  rooms: 0,
  yard_type: "",
  num_comments: 0,
  transaction_type: "direct_purchase",
  sellerId: 0,
  sellerName: "",
  caption: "",
  images: [],
});

type AddPropertyContextValue = {
  completeStep: (index: number) => void;
  getHouseId: () => HouseId;
  setHouseId: (id: HouseId) => void;
  clearDraft: () => Promise<void>;
};

const AddPropertyContext = createContext<AddPropertyContextValue | null>(null);

export const useAddProperty = () => {
  const ctx = useContext(AddPropertyContext);
  if (!ctx) throw new Error("useAddProperty must be used inside the provider");
  return ctx;
};

export default function AddPropertyFormProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("addProperty");
  const router = useRouter();
  const pathname = usePathname();

  const methods = useForm<IProperty>({
    resolver: zodResolver(addPropertyFormSchema),
    mode: "onTouched",
    defaultValues: getDefaultValues(),
  });

  const [hydrated, setHydrated] = useState(false);
  const [progress, setProgress] = useState(0);

  const progressRef = useRef(0);
  const houseIdRef = useRef<HouseId>(null);
  const clearingRef = useRef(false);
  const lastImagesRef = useRef<File[]>([]);

  const lastSegment = pathname?.split("/").filter(Boolean).pop() ?? "";
  const currentStep = Math.max(0, STEP_SLUGS.indexOf(lastSegment));

  const saveDraft = useCallback(() => {
    if (clearingRef.current) return;
    try {
      const { images: _images, ...values } = methods.getValues();
      const draft: Draft = {
        values,
        progress: progressRef.current,
        houseId: houseIdRef.current,
      };
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    } catch {
    }
  }, [methods]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      let draft: Draft | null = null;
      try {
        const raw = localStorage.getItem(DRAFT_KEY);
        draft = raw ? (JSON.parse(raw) as Draft) : null;
      } catch {
        draft = null;
      }

      let images: File[] = [];
      if (draft) {
        try {
          images = (await get<File[]>(IMAGES_KEY)) ?? [];
        } catch {
          images = [];
        }
      }

      if (cancelled) return;

      if (draft) {
        methods.reset({ ...getDefaultValues(), ...draft.values, images });
        progressRef.current = draft.progress ?? 0;
        houseIdRef.current = draft.houseId ?? null;
        setProgress(progressRef.current);
        lastImagesRef.current = images;
      }

      setHydrated(true);
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    let timer: ReturnType<typeof setTimeout>;

    const subscription = methods.watch(() => {
      if (clearingRef.current) return;

      const images = (methods.getValues("images") ?? []) as File[];
      const last = lastImagesRef.current;
      const changed =
        images.length !== last.length || images.some((f, i) => f !== last[i]);

      if (changed) {
        lastImagesRef.current = images;
        set(IMAGES_KEY, images).catch(() => {});
      }

      clearTimeout(timer);
      timer = setTimeout(saveDraft, 250);
    });

    const flush = () => saveDraft();
    window.addEventListener("pagehide", flush);

    return () => {
      clearTimeout(timer);
      subscription.unsubscribe();
      window.removeEventListener("pagehide", flush);
      saveDraft();
    };
  }, [hydrated, methods, saveDraft]);

  useEffect(() => {
    if (!hydrated || clearingRef.current) return;
    if (currentStep > progress) router.replace(stepHref(progress));
  }, [hydrated, currentStep, progress, router]);

  const completeStep = useCallback(
    (index: number) => {
      const next = Math.max(progressRef.current, index + 1);
      progressRef.current = next;
      setProgress(next);
      saveDraft();
    },
    [saveDraft]
  );

  const getHouseId = useCallback(() => houseIdRef.current, []);

  const setHouseId = useCallback(
    (id: HouseId) => {
      houseIdRef.current = id;
      saveDraft();
    },
    [saveDraft]
  );

  const clearDraft = useCallback(async () => {
    clearingRef.current = true;
    try {
      localStorage.removeItem(DRAFT_KEY);
      await del(IMAGES_KEY);
    } catch {
    }
    progressRef.current = 0;
    houseIdRef.current = null;
    lastImagesRef.current = [];
    setProgress(0);
    methods.reset(getDefaultValues());
  }, [methods]);

  const contextValue = useMemo(
    () => ({ completeStep, getHouseId, setHouseId, clearDraft }),
    [completeStep, getHouseId, setHouseId, clearDraft]
  );

  const canShow = hydrated && currentStep <= progress;

  return (
    <AddPropertyContext.Provider value={contextValue}>
      <FormProvider {...methods}>
        <section
          dir="rtl"
          className="w-full rounded-2xl bg-surface p-3 text-foreground sm:p-5"
        >
          <div className="flex flex-col gap-3 border-b border-dashed border-border pb-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-sm font-semibold">{t("title")}</h2>

            <Link
              href="/dashboard/properties"
              className="flex items-center gap-2 text-[11px] text-blue-500 transition hover:opacity-70"
            >
              {t("backToProperties")}
              <ChevronLeft size={14} />
            </Link>
          </div>

          <Stepper currentStep={currentStep} />

          {canShow ? children : null}
        </section>
      </FormProvider>
    </AddPropertyContext.Provider>
  );
}