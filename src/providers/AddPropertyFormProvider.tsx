
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { del, get, set } from "idb-keyval";

import {
  addPropertyFormSchema,
  type IProperty,
} from "@/src/schemas/properties/propertySchema";

export const LAST_STEP = 4;

const DRAFT_KEY = "add-property:draft";
const IMAGES_KEY = "add-property:images";

type HouseId = number | string | null;

type Draft = {
  values: Omit<IProperty, "images">;
  step: number;
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
  step: number;
  progress: number;
  hydrated: boolean;
  isEdit: boolean;
  editId: string | null;
  existingPhotos: string[];
  setExistingPhotos: (photos: string[]) => void;
  goToStep: (index: number) => void;
  completeStep: (index: number) => void;
  getHouseId: () => HouseId;
  setHouseId: (id: HouseId) => void;
  loadForEdit: (values: IProperty, photos: string[]) => void;
  clearDraft: () => Promise<void>;
};

const AddPropertyContext =
  createContext<AddPropertyContextValue | null>(null);

export const useAddProperty = () => {
  const context = useContext(AddPropertyContext);

  if (!context) {
    throw new Error("useAddProperty must be used inside the provider");
  }

  return context;
};

export default function AddPropertyFormProvider({
  children,
  editId = null,
}: {
  children: React.ReactNode;
  editId?: string | null;
}) {
  const isEdit = !!editId;

  const methods = useForm<IProperty>({
    resolver: zodResolver(addPropertyFormSchema),
    mode: "onTouched",
    defaultValues: getDefaultValues(),
  });

  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const [existingPhotos, setExistingPhotos] = useState<string[]>([]);
  const [houseId, setHouseIdState] = useState<HouseId>(null);

  const saveDraft = useCallback(() => {
    if (isEdit) return;

    const { images, ...values } = methods.getValues();

    const draft: Draft = {
      values,
      step,
      progress,
      houseId,
    };

    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  }, [methods, step, progress, houseId, isEdit]);

  useEffect(() => {
    if (isEdit) {
      setHydrated(true);
      return;
    }

    const restoreDraft = async () => {
      try {
        const raw = localStorage.getItem(DRAFT_KEY);

        if (raw) {
          const draft = JSON.parse(raw) as Draft;
          const images = (await get<File[]>(IMAGES_KEY)) ?? [];

          methods.reset({
            ...getDefaultValues(),
            ...draft.values,
            images,
          });

          setStep(draft.step ?? 0);
          setProgress(draft.progress ?? 0);
          setHouseIdState(draft.houseId ?? null);
        }
      } catch {
        methods.reset(getDefaultValues());
      } finally {
        setHydrated(true);
      }
    };

    restoreDraft();
  }, [isEdit, methods]);

  useEffect(() => {
    if (!hydrated || isEdit) return;

    const subscription = methods.watch((values) => {
      const images = (values.images ?? []) as File[];

      set(IMAGES_KEY, images).catch(() => {});
      saveDraft();
    });

    return () => subscription.unsubscribe();
  }, [hydrated, isEdit, methods, saveDraft]);

  const goToStep = useCallback(
    (index: number) => {
      setStep(Math.max(0, Math.min(index, progress, LAST_STEP)));
    },
    [progress]
  );

  const completeStep = useCallback((index: number) => {
    const next = Math.min(index + 1, LAST_STEP);

    setProgress((previous) => Math.max(previous, next));
    setStep(next);
  }, []);

  const getHouseId = useCallback(() => houseId, [houseId]);

  const setHouseId = useCallback((id: HouseId) => {
    setHouseIdState(id);
  }, []);

  const loadForEdit = useCallback(
    (values: IProperty, photos: string[]) => {
      methods.reset({
        ...getDefaultValues(),
        ...values,
        images: [],
      });

      setExistingPhotos(photos);
      setProgress(LAST_STEP);
      setStep(0);
    },
    [methods]
  );

  const clearDraft = useCallback(async () => {
    localStorage.removeItem(DRAFT_KEY);
    await del(IMAGES_KEY);

    methods.reset(getDefaultValues());

    setStep(0);
    setProgress(0);
    setHouseIdState(null);
    setExistingPhotos([]);
  }, [methods]);

  const value = useMemo(
    () => ({
      step,
      progress,
      hydrated,
      isEdit,
      editId,
      existingPhotos,
      setExistingPhotos,
      goToStep,
      completeStep,
      getHouseId,
      setHouseId,
      loadForEdit,
      clearDraft,
    }),
    [
      step,
      progress,
      hydrated,
      isEdit,
      editId,
      existingPhotos,
      goToStep,
      completeStep,
      getHouseId,
      setHouseId,
      loadForEdit,
      clearDraft,
    ]
  );

  return (
    <AddPropertyContext.Provider value={value}>
      <FormProvider {...methods}>{children}</FormProvider>
    </AddPropertyContext.Provider>
  );
}
