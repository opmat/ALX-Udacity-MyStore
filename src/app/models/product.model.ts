export interface Product {
    id: number;
    product_name:string;
    price:number;
    category?:string;
    image:string;
    description:string;

    // constructor() {
    //     //initialize class attributes
    //     this.id = 0;
    //     this.product_name = "";
    //     this.price = 0;
    //     this.category = "";
    //     this.image = "";
    //     this.description = "";
    // }
}