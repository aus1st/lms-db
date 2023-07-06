import { center } from "./center";

export interface city {
    cityId?: number,
    cityName: string,
    campuses?: center[]
}