import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {
  transform(products: any[], searchTerm: any): any[] {
    console.log(searchTerm);
    
    if (!products) return [];
    if (!searchTerm || !searchTerm.name) return products;

    const searchValue = searchTerm.name.toLowerCase();

    return products.filter(product =>
      product.name.toLowerCase().includes(searchValue)
    );
  }
}
