import mongoose, { Document, Model } from 'mongoose';

interface ICar {
    driverName: string;
    carNumber: string;
    carColor: string;
    establishedDateCar?: string;
    carType: string;
    createdAt: Date;
}

export interface ICarDocument extends ICar, Document { }

export interface ICarModel extends Model<ICarDocument> {
    generateStatistics(): Promise<{ [key: string]: number }>;
}

const CarSchema = new mongoose.Schema<ICarDocument, ICarModel>({
    driverName: {
        type: String,
        required: true
    },
    carNumber: {
        type: String,
        required: true,
        unique: true,
    },
    carColor: {
        type: String,
        required: true
    },
    establishedDateCar: String,
    carType: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

CarSchema.virtual('daysLeft').get(function () {
    const createdAt = this.createdAt;
    const now = new Date();
    const millisecondsInADay = 24 * 60 * 60 * 1000;
    const daysElapsed = Math.floor((now.getTime() - createdAt.getTime()) / millisecondsInADay);
    const daysLeft = 90 - daysElapsed;

    return daysLeft;
});

CarSchema.set('toObject', { virtuals: true });
CarSchema.set('toJSON', { virtuals: true });
CarSchema.statics.generateStatistics = async function () {
    try {
        const carsInLast24Hours = await this.countDocuments({
            createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
        });

        const carsInLastMonth = await this.countDocuments({
            createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        });

        const carsWithDayLeftZero = await this.countDocuments({ daysLeft: 0 });

        const totalCars = await this.countDocuments();

        return {
            carsInLast24Hours,
            carsInLastMonth,
            carsWithDayLeftZero,
            totalCars
        };
    } catch (error) {
        console.error('Error generating statistics:', error);
        throw error;
    }
};

const CarModel = mongoose.models.Car as ICarModel || mongoose.model<ICarDocument, ICarModel>('Car', CarSchema);

export default CarModel;
