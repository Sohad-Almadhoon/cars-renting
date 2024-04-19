import { Loader } from "lucide-react";
import React, { useState, useEffect, forwardRef } from "react";

interface CarInfo {
  driverName: string;
  carNumber: string;
  carColor: string;
  establishedDateCar: string;
  carType: string;
}

const getCarInfo = async (id: string) => {
  try {
    const res = await fetch(`/api/cars/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch car...");
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

interface PrintComponentProps {
  id: string;
}

const PrintComponent = forwardRef<HTMLDivElement, PrintComponentProps>(
  ({ id }, ref) => {
    const [data, setData] = useState<CarInfo | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchCarInfo = async () => {
        const {car} = await getCarInfo(id);
        setData(car);
        setLoading(false);
      };

      fetchCarInfo();
    }, [id]);

    if (loading) {
      return <Loader />;
    }

    if (!data) {
      return <p>Failed to load car information</p>;
    }

    return (
      <div
        ref={ref}
        className="print:block hidden bg-white p-4 rounded-md shadow-lg">
        <div className="text-lg font-bold text-gray-800 mb-2">
          اسم السائق: {data.driverName}
        </div>
        <div className="text-lg text-gray-800 mb-2">
          رقم السيارة: {data.carNumber}
        </div>
        <div className="text-lg text-gray-800 mb-2">
          لون السيارة: {data.carColor}
        </div>
        <div className="text-lg text-gray-800 mb-2">
          سنة صنع السيارة: {data.establishedDateCar}
        </div>
        <div className="text-lg text-gray-800">نوع السيارة: {data.carType}</div>
      </div>
    );
  }
);

PrintComponent.displayName = "PrintComponent";

export default PrintComponent;
