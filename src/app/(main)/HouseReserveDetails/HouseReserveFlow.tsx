"use client";

import { useEffect, useState } from "react";
import Header from "./Header/Header";
import ReservationBox from "./Reservationbox";
import TabInfoBox from "./TabInfoBox";
import AboutHouse from "./Tabs/AboutHouse";
import HouseFacilities from "./Tabs/HouseFacilities";
import UserReviews from "./Tabs/Reviews/UserReviews";
import { IHouseDetails } from "@/src/types/HousereservesType/HouseDetailType";
import BookingPage from "./BookingPage";
import type { IBookingData } from "@/src/types/HousereservesType/BookingType";

interface IPageProps {
    result: IHouseDetails;
}

export interface IReservation extends IBookingData {
    guests: number;
    nights: number;
    total: number;
    checkIn: string;
    checkOut: string;
}

const clearStorage = () => {
    sessionStorage.removeItem("reservation");
    sessionStorage.removeItem("reservationHouseId");
    sessionStorage.removeItem("bookingId");
};

export const HouseReserveFlow = ({ result }: IPageProps) => {
    const [showBooking, setShowBooking] = useState(false);
    const [reservation, setReservation] = useState<IReservation | null>(null);
    const [isRestored, setIsRestored] = useState(false);
    const [paid, setPaid] = useState(false);

    useEffect(() => {
        const savedReservation = sessionStorage.getItem("reservation");
        const savedHouseId = sessionStorage.getItem("reservationHouseId");

        if (savedReservation && savedHouseId === String(result.id)) {
            try {
                setReservation(JSON.parse(savedReservation));
                setShowBooking(true);
            } catch {
                clearStorage();
            }
        }

        setIsRestored(true);
    }, [result.id]);

    useEffect(() => {
        if (!isRestored || !reservation || paid) return;

        sessionStorage.setItem("reservation", JSON.stringify(reservation));
        sessionStorage.setItem("reservationHouseId", String(result.id));
    }, [reservation, result.id, isRestored, paid]);

    if (!isRestored) return null;

    if (showBooking && reservation) {
        return (
            <BookingPage
                result={result}
                reservationDetail={reservation}
                setReservation={setReservation}
                onBack={() => {
                    setShowBooking(false);
                    setReservation(null);
                    clearStorage();
                }}
                onPaymentSuccess={() => {
                    setPaid(true);
                    clearStorage();
                }}
            />
        );
    }

    return (
        <div className="flex flex-col gap-14" dir="lrt">
            <Header result={result} />

            <div className="flex flex-col gap-10 md:flex-row">
              

                <TabInfoBox
                    about={<AboutHouse result={result} />}
                    facilities={<HouseFacilities result={result} />}
                    reviews={<UserReviews houseId={result.id} />}
                />
                  <div className="md:w-1/5">
                    <ReservationBox
                        result={result}
                        onReserve={(data) => {
                            setPaid(false);
                            setReservation(data);
                            setShowBooking(true);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};