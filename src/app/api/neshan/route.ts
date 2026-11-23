
import { NextRequest, NextResponse } from "next/server";

const NESHAN_API_URL = "https://api.neshan.org";

interface IGeocodingItem {
  location: {
    latitude: number;
    longitude: number;
  };
  province?: string;
  city?: string;
  neighbourhood?: string;
  address?: string;
  title?: string;
  unMatchedTerm?: string;
}

interface INeshanGeocodingResponse {
  items?: IGeocodingItem[];
  status?: string;
  code?: number;
  message?: string;
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const type = searchParams.get("type");
  const term = searchParams.get("term");
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const apiKey = process.env.NESHAN_SERVICE_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { message: "Neshan service key is missing" },
      { status: 500 }
    );
  }

  if (type !== "search" && type !== "reverse") {
    return NextResponse.json(
      { message: "Invalid request type" },
      { status: 400 }
    );
  }

  const endpoint = new URL(
    type === "search"
      ? `${NESHAN_API_URL}/geocoding/v1`
      : `${NESHAN_API_URL}/v1/reverse`
  );

  if (type === "search") {
    if (!term?.trim() || term.trim().length < 3) {
      return NextResponse.json(
        { message: "Address must contain at least 3 characters" },
        { status: 400 }
      );
    }

    const requestData: {
      address: string;
      location?: {
        latitude: number;
        longitude: number;
      };
    } = {
      address: term.trim(),
    };

    if (lat !== null && lng !== null) {
      const latitude = Number(lat);
      const longitude = Number(lng);

      if (
        !Number.isFinite(latitude) ||
        !Number.isFinite(longitude) ||
        Math.abs(latitude) > 90 ||
        Math.abs(longitude) > 180
      ) {
        return NextResponse.json(
          { message: "Invalid coordinates" },
          { status: 400 }
        );
      }

      requestData.location = {
        latitude,
        longitude,
      };
    }

    endpoint.searchParams.set("json", JSON.stringify(requestData));
  }

  if (type === "reverse") {
    const latitude = Number(lat);
    const longitude = Number(lng);

    if (
      lat === null ||
      lng === null ||
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude) ||
      Math.abs(latitude) > 90 ||
      Math.abs(longitude) > 180
    ) {
      return NextResponse.json(
        { message: "Invalid coordinates" },
        { status: 400 }
      );
    }

    endpoint.searchParams.set("lat", String(latitude));
    endpoint.searchParams.set("lng", String(longitude));
  }

  const referer = request.headers.get("referer");

  let origin = request.nextUrl.origin;

  if (referer) {
    try {
      origin = new URL(referer).origin;
    } catch {
      origin = request.nextUrl.origin;
    }
  }

  try {
    const response = await fetch(endpoint.toString(), {
      method: "GET",
      headers: {
        "Api-Key": apiKey,
        Referer: `${origin}/`,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    const responseText = await response.text();

    let data: INeshanGeocodingResponse;

    try {
      data = JSON.parse(responseText);
    } catch {
      return NextResponse.json(
        {
          message: "Invalid response from Neshan",
          status: response.status,
          details: responseText,
        },
        { status: 502 }
      );
    }

    if (!response.ok) {
      return NextResponse.json(data, {
        status: response.status,
      });
    }

    if (type === "reverse") {
      return NextResponse.json(data);
    }

    const items = (data.items ?? [])
      .filter(
        (item) =>
          Number.isFinite(item.location?.latitude) &&
          Number.isFinite(item.location?.longitude)
      )
      .map((item) => {
        const address = [
          item.province,
          item.city,
          item.neighbourhood,
          item.address,
        ]
          .filter(Boolean)
          .filter(
            (value, index, array) => array.indexOf(value) === index
          )
          .join("، ");

        return {
          title:
            item.title ||
            item.neighbourhood ||
            item.city ||
            item.province ||
            term,
          address: address || term,
          location: {
            x: item.location.longitude,
            y: item.location.latitude,
          },
          unMatchedTerm: item.unMatchedTerm,
        };
      });

    return NextResponse.json({ items });
  } catch (error) {
    console.error("Neshan API Error:", error);

    return NextResponse.json(
      { message: "Neshan API request failed" },
      { status: 500 }
    );
  }
}
