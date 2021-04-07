import {Pipe, PipeTransform} from '@angular/core';
import {City} from "../../interfaces/city";

@Pipe({
    name: 'cityFilter'
})
export class CityFilterPipe implements PipeTransform {
    transform(cities: City[], search: string): City[] {
        if (!search.trim()) {
            return cities
        } else {
            return cities.filter(city => {
                return city.name.toLowerCase().includes(search.toLowerCase().trim())
            })
        }
    }
}
